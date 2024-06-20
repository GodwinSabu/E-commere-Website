const express = require("express");
const path = require("path");
const router = express.Router();
const User = require("../model/user");
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/SendMail");
const catchAsyncError = require("../middileware/catchAsyncError");
const sendToken = require("../utils/jwtToken");
const fs = require("fs");
const { isAuthenticated } = require("../middileware/auth");
// const path = require("path");

router.post("/create-user", upload.single("file"), async (req, res, next) => {
  console.log("backendddddddddddd");
  try {
    const { name, email, password } = req.body;
    const userEmail = await User.findOne({ email });
    console.log(userEmail, "sss");
    if (userEmail) {
      const filename = req.file.filename;
      const filePath = `uploads/${filename}`;
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
          res.status(500).json({ message: "Error deleting file" });
        }
      });
      return next(new ErrorHandler("User already exits", 400));
    }

    const filename = req.file.filename;
    const fileUrl = path.join(filename);

    const user = {
      name: name,
      email: email,
      password: password,
      avatar: fileUrl,
    };

    const activationToken = createActivationToken(user);
    const activationUrl = `http://localhost:3000/activation/${activationToken}`;

    try {
      await sendMail({
        email: user.email,
        subject: "Activate your account",
        message: `Hello ${user.name}, please click on the link to activate your account: ${activationUrl}`,
        // Use "text" instead of "message" here
      });
      console.log("333333333444444");

      res.status(201).json({
        success: true,
        message: `Please check your email:- ${user.email} to activate your account`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message), 500);
    }
    console.log("3333333366");
  } catch (error) {
    return next(new ErrorHandler(error.message), 400);
  }
});

//create activation token
const createActivationToken = (user) => {
  console.log("qqqqqqqqqqqqqqqqq--");
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

// activate user
router.post("/activation", async (req, res, next) => {
  console.log("++++++++++++++++++s++++", req.body);

  try {
    const { activation_token } = req.body;
    console.log("Activation Token:", activation_token);

    const newUser = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);
    console.log("New User:", newUser);

    console.log("hihi"); // Check if this line is reached

    if (!newUser) {
      return next(new ErrorHandler("Invalid token", 400));
    }
    const { name, email, password, avatar } = newUser;

    let user = await User.findOne({ email });

    if (user) {
      return next(new ErrorHandler("User already exists", 400));
    }
    user = await User.create({
      name,
      email,
      avatar,
      password,
    });

    sendToken(user, 201, res);
  } catch (error) {
    console.error("JWT Verification Error:", error);
    return next(new ErrorHandler(error.message, 500));
  }
});

//login User
router.post(
  "/login-user",
  catchAsyncError(async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if(!email || !password){
        return next(new ErrorHandler("Please provide all the field", 400))
      }
      const user = await User.findOne({email}).select("+password")
      if(!user){
        return next(new ErrorHandler("User doesn't exits!", 400))
      }
      const isPasswordValid = await user.comparePassword(password)

      if(!isPasswordValid){
        return next(
          new ErrorHandler("Please provide the correct Password", 400)
        )
      }

      sendToken(user, 201, res)
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//load user 

router.get("/getuser",isAuthenticated, catchAsyncError(async(req, res, next)=>{
  try {
    const user = await User.findById(req.user.id) 
    if(!user){
      return next(new ErrorHandler("User doesn't exits!", 400))

    } 
    res.status(200).json({
      success:true, 
      user,
    })
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));

  }
}))

//Logout user

router.get("/logout", isAuthenticated, catchAsyncError(async (req, res, next) => {
  console.log('back 111');
  try {
    // console.log(req.cookies,'11122222222333333334');
    // Check if the cookie exists before trying to access its properties
    if (req.cookies && req.cookies.token) {
      // If the cookie exists, set it to null and expire it
      res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      });

      res.status(201).json({
        success: true,
        message: 'Logout Successfully'
      });

      console.log('222');
    } else {
      // If the cookie doesn't exist, log a message or handle accordingly
      console.log('Cookie is null or undefined');
      // You might also want to redirect the user to the login page or perform other actions
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}));

// update user info
router.put(
  "/update-user-info",
  isAuthenticated,
  catchAsyncError(async (req, res, next) => {
    try {
      const { email, password, phoneNumber, name } = req.body;

      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        return next(new ErrorHandler("User not found", 400));
      }

      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return next(
          new ErrorHandler("Please provide the correct information", 400)
        );
      }

      user.name = name;
      user.email = email;
      user.phoneNumber = phoneNumber;

      await user.save();

      res.status(201).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// updatae user avatar
router.put("/update-avatar", isAuthenticated, upload.single("image"), catchAsyncError(async (req, res, next) => {
  console.log(req.user,'kkkkkwwwwwwwww');
  try {
    const existUser = await User.findById(req.user.id);
    if (!existUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Delete existing avatar file
    const existAvatarPath = `uploads/${existUser.avatar}`;
    if (fs.existsSync(existAvatarPath)) {
      fs.unlinkSync(existAvatarPath);
    }

    // Update user avatar
    const fileUrl = `uploads/${req.file.filename}`;
    const user = await User.findByIdAndUpdate(req.user.id, { avatar: fileUrl }, { new: true });

    res.status(200).json({
      success: true,
       user,
    });
   console.log(user,'ddddddddd userr   d d doijdnbkg,dk');
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
}));

// update user addresses
router.put(
  "/update-user-addresses",
  isAuthenticated,
  catchAsyncError(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);

      const sameTypeAddress = user.addresses.find(
        (address) => address.addressType === req.body.addressType
      );
      if (sameTypeAddress) {
        return next(
          new ErrorHandler(`${req.body.addressType} address already exists`)
        );
      }

      const existsAddress = user.addresses.find(
        (address) => address._id === req.body._id
      );

      if (existsAddress) {
        Object.assign(existsAddress, req.body);
      } else {
        // add the new address to the array
        user.addresses.push(req.body);
      }

      await user.save();

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);


// delete user address
router.delete(
  "/delete-user-address/:id",
  isAuthenticated,
  catchAsyncError(async (req, res, next) => {
    try {
      const userId = req.user._id;
      const addressId = req.params.id;

      await User.updateOne(
        {
          _id: userId,
        },
        { $pull: { addresses: { _id: addressId } } }
      );

      const user = await User.findById(userId);

      res.status(200).json({ success: true, user });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update user password 

// update user password
router.put(
  "/update-user-password",
  isAuthenticated,
  catchAsyncError(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id).select("+password");

      const isPasswordMatched = await user.comparePassword(
        req.body.oldPassword
      );

      if (!isPasswordMatched) {
        return next(new ErrorHandler("Old password is incorrect!", 400));
      }

      if (req.body.newPassword !== req.body.confirmPassword) {
        return next(
          new ErrorHandler("Password doesn't matched with each other!", 400)
        );
      }
      user.password = req.body.newPassword;

      await user.save();

      res.status(200).json({
        success: true,
        message: "Password updated successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);


module.exports = router;  
