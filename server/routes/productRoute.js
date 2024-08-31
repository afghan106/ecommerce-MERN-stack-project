import express from 'express';
import { getProductsCtrl, productCtrl,getProductCtrl} from '../controllers/productCtrl.js';
import { isLogedIn } from '../middlewares/isLogedIn.js';

const productsRouter=express.Router();

productsRouter.post('/createProduct',isLogedIn,productCtrl);
productsRouter.get('/getProducts',getProductsCtrl);
productsRouter.get("/getproduct/:id",getProductCtrl)
export default productsRouter;


