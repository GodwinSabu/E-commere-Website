const express = require("express");
const router = express.Router();
const Product = require("../model/product");
const { upload } = require("../multer");
const catchAsyncError = require("../middileware/catchAsyncError");
const ErrorHandler = require("../utils/ErrorHandler");
const Shop = require("../model/shop");
const { isSeller} = require("../middileware/auth");
const fs = require("fs")

// create product
router.post(
  "/create-product",
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
        const productData = req.body;
        productData.images = imageUrls;
        productData.shop = shop;

        const product = await Product.create(productData);

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

//  get all products

router.get(
  "/get-all-products-shop/:id",
  catchAsyncError(async (req, res, next) => {
    console.log('gelt all products of shop ',req.params.id);
    try {
      const products = await Product.find({ shopId: req.params.id });
      // console.log(products,'products');
      res.status(201).json({
        succes: true,
        products,
      });
      // console.log(products,'productsssssssdddddddddddddddddddddddddddddddddddddddddddddddddd');
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

//Delete product

router.delete(
  "/delete-shop-product/:id",
  isSeller,
  catchAsyncError(async (req, res, next) => {
    try {
      const productId = req.params.id;
      const productData = await Product.findById(productId)
     
      productData.images.forEach((imageUrl)=>{
        const filename = imageUrl
        const filePath = `uploads/${filename}`

        fs.unlink(filePath, (err)=>{
          if(err){
            console.log(err);
          }
        })
      })


      const product = await Product.findByIdAndDelete(productId);
      if (!product) {
        return next(new ErrorHandler("Produt not found by id !", 500));
      }
      res.status(201).json({
        succes: true,
        message:"product deleted succesfully"
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);
// get all products
router.get(
  "/get-all-products",
  catchAsyncError(async (req, res, next) => {
    // console.log('.....backend.................ccccccbb');
    try {
      const products = await Product.find().sort({ createdAt: -1 });

      res.status(201).json({
        success: true,
        products,
      });
      // console.log(products,'xxxxxxxxxxxxxxxx');
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

module.exports = router;
