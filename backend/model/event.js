const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required:[true, "Please enter your event product name!"]
    },
    description: {
        type: String,
        required:[true, "Please enter your event product description!"]
    },
    category: {
        type: String,
        required:[true, "Please enter your event product category!"]
    },
    start_Date:{
         type: Date,
         required:true
    },
    Finish_Date:{
        type: Date,
        required : true,

    },
    status:{
        type:String,
        default: "running",
    },
    
    tags: {
        type: String,
        required:[true, "Please enter your event product tags!"]
    },
    originalPrice: {
        type: Number,
    },
    discountPrice: {
        type: Number,
        required:[true, "Please enter your event product price!"]
    },
    stock: {
        type: Number,
        required:[true, "Please enter your event product Stock!"]
    },
    images:[
        {
            type: String
        }
    ],
    shopId:{
        type: String,
        required: true,
    },
    shop:{
        type:Object,
        required:true
    },
    sold_out:{
        type:Number,
        default:0,
    },
    createdAt:{
        type:Date,
        default: Date.now(),
    }
    
})
module.exports = mongoose.model("Event", eventSchema)