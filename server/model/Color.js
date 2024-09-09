//product color schema
import mongoose, { mongo } from "mongoose";

const ColorSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    products:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product",

        },
    ],
})

const Color=mongoose.model('Color',ColorSchema);

export default Color;