// this is the category  schema
import mongoose, { mongo } from "mongoose";

const schema=mongoose.Schema;
const CategorySChema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        user:{
             type:mongoose.Schema.Types.ObjectId,
             ref:"User",
             required:true
        },
        image:{
            type:String,
            default:"jan.jpg",
            required:true,
        },
        products:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"product",
            },
        ]
    },
    {
        timestamps:true
    },
);

const Category=mongoose.model("Category",CategorySChema);

export default Category;