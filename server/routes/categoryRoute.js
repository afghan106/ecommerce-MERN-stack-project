import express from 'express';
import { getAllCategoriesCtrl,createCategory } from '../controllers/categoryCtrl.js';
import { isLogedIn } from '../middlewares/isLogedIn.js';

const categoryRouter=express.Router();

categoryRouter.post('/createCategory',isLogedIn,createCategory);
categoryRouter.get("/getallcategories",getAllCategoriesCtrl);

export default categoryRouter;
