import express from 'express';
import { getProductsCtrl, productCtrl,getProductCtrl, updateProductCtrl, deleteProductCtro} from '../controllers/productCtrl.js';
import { isLogedIn } from '../middlewares/isLogedIn.js';

const productsRouter=express.Router();

productsRouter.post('/createproduct',isLogedIn,productCtrl);
productsRouter.get('/getProducts',getProductsCtrl);
productsRouter.get("/getproduct/:id",getProductCtrl);
productsRouter.put("/updateproduct/:id",isLogedIn,updateProductCtrl);//there is problem with this route where the isLogin function dosenot work properly
productsRouter.delete('/deleteproduct/:id',isLogedIn,deleteProductCtro)

export default productsRouter;


