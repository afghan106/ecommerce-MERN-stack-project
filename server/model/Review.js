// this schema is for Reviews

import mongoose from "mongoose";

const ReviewSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true,"review must belong to a user"],
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:[true,"review must belong to a product"],
    },
    message:{
        type:String,
        required:[true,"please add a message"]
    },
    rating:{
        type:Number,
        required:[true,"please add a rating between 1 tell 5"],
        min:1,
        max:5,
    }
},{
    timestamps:true
})

const Review=mongoose.model("Review",ReviewSchema);

export default Review;