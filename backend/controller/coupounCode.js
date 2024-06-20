const express = require("express");
const router = express.Router();
const catchAsyncError = require("../middileware/catchAsyncError");
const ErrorHandler = require("../utils/ErrorHandler");
const Shop = require("../model/shop");
const { isSeller } = require("../middileware/auth");
const CoupounCode = require("../model/coupounCode");

//create coupoun code

router.post(
  "/create-coupuon-code",
  isSeller,
  catchAsyncError(async (req, res, next) => {
    console.log(req.body);
    try {
      const isCoupounCodeExits = await CoupounCode.find({
        name: req.body.name,
      });

      if (isCoupounCodeExits.length !== 0) {
        return next(new ErrorHandler(" Coupon already exists! ", 400));
      }

      const coupounCode = await CoupounCode.create(req.body);
      res.status(201).json({
        success: true,
        coupounCode,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);
 

// get all coupons of a shop
router.get(
    "/get-coupoun/:id",
    isSeller,
    catchAsyncError(async (req, res, next) => {
      try {
        const couponCodes = await CoupounCode.find({ shopId: req.seller.id });
        res.status(201).json({
          success: true,
          couponCodes,
        });
      } catch (error) {
        return next(new ErrorHandler(error, 400));
      }
    })
  );

  router.delete(
    "/delete-coupoun/:id",
    isSeller,
    catchAsyncError(async (req, res, next) => {
        console.log(req.params.id);
      try {
        const couponCode = await CoupounCode.findByIdAndDelete(req.params.id);
  
        if (!couponCode) {
          return next(new ErrorHandler("Coupon code dosen't exists!", 400));
        }
        res.status(201).json({
          success: true,
          message: "Coupon code deleted successfully!",
        });
      } catch (error) {
        return next(new ErrorHandler(error, 400));
      }
    })
  );

module.exports = router;
