import Category from "../model/Category.js";
import asynchandler from 'express-async-handler';



// create new category
//route:post  /api/v1/createCategroy
//  access : private/admin

export const createCategoryCtrl=asynchandler(async(req,res)=>{
//const {name ,image}=req.body; //this is the real variables that we are going to use then in the website
const {name}=req.body;

const categoryExists=await Category.findOne({name});
//if category exists
if (categoryExists) {
    res.json({messge:"this category already exists in the database"});
}
 const category=await Category.create({
    name,
    user:req.userAuthId
 })

 res.json({
    status:"success",
    message:" the product is create successfully",
    category,
 })


})