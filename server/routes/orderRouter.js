import express from 'express';
import { createOrderCtrl } from '../controllers/orderCtrl.js';
import {isLogedIn} from '../middlewares/isLogedIn.js'
const OrderRouter =express.Router();

OrderRouter.post('/createorder',isLogedIn,createOrderCtrl);


export default OrderRouter;