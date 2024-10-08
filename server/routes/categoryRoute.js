import express from 'express';
import { getAllCategoriesCtrl,createCategory, getCategoryCtrl, updateCategoryCtrl, deleteCategoryCtrl } from '../controllers/categoryCtrl.js';
import { isLogedIn } from '../middlewares/isLogedIn.js';

const categoryRouter=express.Router();

categoryRouter.post('/createCategory',isLogedIn,createCategory);
categoryRouter.get("/getallcategories",getAllCategoriesCtrl);
categoryRouter.get("/getcategory/:id",getCategoryCtrl);
categoryRouter.put("/updatecategory/:id",isLogedIn,updateCategoryCtrl);
categoryRouter.delete("/deletecategory/:id",isLogedIn,deleteCategoryCtrl);


export default categoryRouter;
