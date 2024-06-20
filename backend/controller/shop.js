const express = require("express");
const path = require("path");
const router = express.Router();
const jwt = require("jsonwebtoken");
const fs = require("fs");
const { isAuthenticated, isSeller } = require("../middileware/auth");
const sendMail = require("../utils/SendMail");
const catchAsyncError = require("../middileware/catchAsyncError");
const sendToken = require("../utils/jwtToken");
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const Shop = require("../model/shop");
const sendShopToken = require("../utils/ShopToken");
// const { findOne } = require("../model/user");

//create shop
router.post("/create-shop", upload.single("file"), async (req, res, next) => {
  console.log(req.body, "req.body", req.file, "req.file");
  try {
    const { email } = req.body;
    console.log(email, "semailllll");
    const sellerEmail = await Shop.findOne({ email });
    console.log(sellerEmail, "sss");
    if (sellerEmail) {
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
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
  const filename = req.file.filename;
  const fileUrl = path.join(filename);

  const seller = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    avatar: fileUrl,
    address: req.body.address,
    zipCode: req.body.zipCode,
    phoneNumber: req.body.phoneNumber,
  };

  const activationToken = createActivationToken(seller);
  const activationUrl = `http://localhost:3000/seller/activation/${activationToken}`;

  try {
    await sendMail({
      email: seller.email,
      subject: "Activate your shop account",
      message: `Hello ${seller.name}, please click on the link to activate your Shop: ${activationUrl}`,
      // Use "text" instead of "message" here
    });
    // console.log("333333333444444");

    res.status(201).json({
      success: true,
      message: `Please check your email:- ${seller.email} to activate your account`,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message), 500);
  }
});

//create activation token
const createActivationToken = (seller) => {
  console.log("qqqq--");
  return jwt.sign(seller, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

// activate user
router.post(
  "/activation",
  catchAsyncError(async (req, res, next) => {
    try {
      const { activation_token } = req.body;

      const newSeller = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );

      if (!newSeller) {
        return next(new ErrorHandler("Invalid token", 400));
      }
      const {
        name,
        email,
        password,
        avatar,
        zipCode,
        address,
        phoneNumber,
      } = newSeller;

      let seller = await Shop.findOne({ email });

      if (seller) {
        return next(new ErrorHandler("Shop already exists", 400));
      }

      seller = await Shop.create({
        name,
        email,
        avatar,
        password,
        zipCode,
        address,
        phoneNumber,
      });

      sendShopToken(seller, 201, res);
    } catch (error) {
      console.error("JWT Verification Error:", error);
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//Login shop

router.post(
  "/login-shop",
  catchAsyncError(async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(
          new ErrorHandler("Please provide all the correct information")
        );
      }
      const shopUser = await Shop.findOne({ email }).select("+password");
      if (!shopUser) {
        return next(new ErrorHandler(" Shop User doesn't exits!, 400"));
      }
      
      const isPasswordValid = await shopUser.comparePassword(password);

      if (!isPasswordValid) {
        return next(new ErrorHandler("Please provide the correct password"));
      }
      sendShopToken(shopUser, 201, res);

    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Load Seller 

router.get("/getSeller",isSeller, catchAsyncError (async(req,res, next)=>{
    console.log(req.seller,'llll');
    try {
        const shopUser= await Shop.findById(req.seller._id)
        if(!shopUser){
            return next(new ErrorHandler("ShopUser doesn't exits!", 400))
        }
        res.status(200).json({
            success:true, 
            shopUser,
          })
        
    }  catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
}))

//Logout from shop

// router.get("/logout",  catchAsyncError(async (req, res, next) => {
//   // console.log('back 111');??
//   try {
//     console.log(req.cookies,'1112222222234567811111111111111111111');
//     console.log(req.cookies.token,'tttttttttt');
//     // Check if the cookie exists before trying to access its properties
//     if (req.cookies && req.cookies.token) {
//       // If the cookie exists, set it to null and expire it
//       res.cookie("seller_token", null, {
//         expires: new Date(Date.now()),
//         httpOnly: false,
//       });

//       res.status(201).json({
//         success: true,   
//         message: 'Logout  shop Successfully'
//       });

//       // console.log('222');
//     } else {
//       // If the cookie doesn't exist, log a message or handle accordingly
//       console.log('Cookie is null or undefined');
//       // You might also want to redirect the user to the login page or perform other actions
//     }
//   } catch (error) {
//     return next(new ErrorHandler(error.message, 500));
//   }
// }));  

// log out from shop
router.get(
  "/logout",
  catchAsyncError(async (req, res, next) => {
    try {
      // console.log(req.cookies,'1112222222234567811111111111111111111');
      //     console.log(req.cookies.token,'tttttttttt');
      //     console.log(req.cookies.seller_token, 'ttttttttttwwwwwww');

      res.cookie("seller_token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      res.status(201).json({
        success: true,
        message: "Log out successful!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

router.get("/get-shop-info/:id", catchAsyncError(async(req,res,next)=>{
  try {
    const shop = await Shop.findById(req.params.id)
    res.status(201).json({
      succes:true, 
      shop,
    })
    console.log(shop ,'yyyyy222222');
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));

  }
}))

module.exports = router;
