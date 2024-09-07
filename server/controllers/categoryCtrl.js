import Category from "../model/Category.js";
import asynchandler from 'express-async-handler';



// create new category
//route:post  /api/v1/createCategroy
//  access : private/admin

export const createCategory = asynchandler(async (req, res) => {
    const { name } = req.body;

    // Validate the request body
    if (!name) {
        return res.status(400).json({ message: "Category name is required" });
    }

    // Check if the category already exists
    const categoryExists = await Category.findOne({ name });

    if (categoryExists) {
        return res.status(400).json({ message: "This category already exists with this name" });
    } else {
        const category = await Category.create({
            name,
            user: req.userAuthId,
        });

        return res.status(201).json({
            status: "success",
            message: "The category created successfully",
            category,
        });
    }
});

//get all categories
//Router GET/api/categories
// acess:public

export const getAllCategoriesCtrl=asynchandler(async(req,res)=>{
   const categories=await Category.find();

   res.json({
      status:"success",
      message:"Categories fetched successfully",
      categories
   })
})