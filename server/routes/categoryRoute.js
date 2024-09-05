import express from 'express';
import { createCategoryCtrl } from '../controllers/categoryCtrl.js';
import { isLogedIn } from '../middlewares/isLogedIn.js';

const categoryRouter=express.Router();

categoryRouter.post('/createCategory',isLogedIn,createCategoryCtrl);


export default categoryRouter;
