const express = require("express");
const router = express.Router();
const Event = require("../model/event");
const { upload } = require("../multer");
const catchAsyncError = require("../middileware/catchAsyncError");
const ErrorHandler = require("../utils/ErrorHandler");
const Shop = require("../model/shop");
const { isSeller } = require("../middileware/auth");

// create event 
router.post(
  "/create-event",
  upload.array("images"),
  catchAsyncError(async (req, res, next) => {
    try {
      const shopId = req.body.shopId;
      const shop = await Shop.findById(shopId);
      if (!shop) {
        return next(new ErrorHandler(" Shop id is invalid ", 400));
      } else {
        const files = req.files;
        const imageUrls = files.map((file) => `${file.filename}`);
        const eventData = req.body;
        eventData.images = imageUrls;
        eventData.shop = shop;

        const product = await Event.create(eventData);

        res.status(201).json({
          succes: true,
          product,
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);


//  get all Events

router.get(
  "/get-all-events",
  catchAsyncError(async (req, res, next) => {
    // console.log('ecevetssssssss');
    try {
      const events = await Event.find();
      res.status(201).json({
        succes: true,
        events,
      });
      // console.log(events,'events LLLL');
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);


//  get all Events of shop

router.get(
  "/get-all-events/:id",
  catchAsyncError(async (req, res, next) => {
    // console.log( req.params.id,'sssa' );
    try {
      const events = await Event.find({ shopId: req.params.id });
      res.status(201).json({
        succes: true,
        events,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

//Delete events

router.delete(
  "/delete-shop-event/:id",
  isSeller,
  catchAsyncError(async (req, res, next) => {
    try {
      const productId = req.params.id;
      const eventData = await Event.findById(productId)
  
      eventData.images.forEach((imageUrl)=>{
        const filename = imageUrl
        const filePath = `uploads/${filename}`

        fs.unlink(filePath, (err)=>{
          if(err){
            console.log(err);
          }
        })
      })  
      const event = await Event.findByIdAndDelete(productId);

      if (!event) {
        return next(new ErrorHandler("events not found by id !", 500));
      }

      res.status(201).json({
        succes: true,
        message:"events deleted succesfully"
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

module.exports = router