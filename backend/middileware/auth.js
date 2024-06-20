const ErrorHandler = require("../utils/ErrorHandler")
const catchAsyncError = require("./catchAsyncError")
const jwt = require("jsonwebtoken")
// const catchAsyncError = require("./catchAsyncError")
const User = require("../model/user")
const Shop = require("../model/shop")

exports.isAuthenticated = catchAsyncError(async(req, res, next)=>{
    const {token} = req.cookies

    if(!token){
        return next(new ErrorHandler("Please login to contine", 401))
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    req.user = await User.findById(decoded.id)
    next() 
})

exports.isSeller = catchAsyncError(async(req, res, next)=>{
    console.log('pppp');
    const {seller_token} = req.cookies

    if(!seller_token){
        return next(new ErrorHandler("Please login to contine", 401))
    }

    const decoded = jwt.verify(seller_token, process.env.JWT_SECRET_KEY)
    req.seller = await Shop.findById(decoded.id)
    console.log(req.seller,'ddddw');
    next() 
})