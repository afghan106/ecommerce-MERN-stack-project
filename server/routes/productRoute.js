import express from 'express';
import { getProductCtrl, productCtrl } from '../controllers/productCtrl.js';
import { isLogedIn } from '../middlewares/isLogedIn.js';

const productsRouter=express.Router();

productsRouter.post('/createProduct',isLogedIn,productCtrl);
productsRouter.get('/getProduct',getProductCtrl);

export default productsRouter;


