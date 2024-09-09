import express from 'express';
import { isLogedIn } from '../middlewares/isLogedIn.js';
import { createBrand, deleteBrandCtrl, getAllbrandsCtrl, getBrandCtrl, updateBrandCtrl } from '../controllers/brandCtrl.js';

const BrandRouter=express.Router();

BrandRouter.post('/createBrand',isLogedIn,createBrand);
BrandRouter.get("/getallbrands",getAllbrandsCtrl);
BrandRouter.get("/getbrand/:id",getBrandCtrl);
BrandRouter.put("/updatebrand/:id",isLogedIn,updateBrandCtrl);
BrandRouter.delete("/deletebrand/:id",isLogedIn,deleteBrandCtrl);


export default BrandRouter;c
