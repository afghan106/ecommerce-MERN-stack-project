import express from 'express';
import { isLogedIn } from '../middlewares/isLogedIn.js';
import { createColorctrl, deleteColorCtrl, getAllColorsCtrl, getColorCtrl, updateColorCtrl } from '../controllers/colorCtrl.js';

const ColorRouter=express.Router();

ColorRouter.post('/createColor',isLogedIn,createColorctrl);
ColorRouter.get("/getallColors",getAllColorsCtrl);
ColorRouter.get("/getColor/:id",getColorCtrl);
ColorRouter.put("/updateColor/:id",isLogedIn,updateColorCtrl);
ColorRouter.delete("/deleteColor/:id",isLogedIn,deleteColorCtrl);


export default ColorRouter;
