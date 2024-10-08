import express from 'express';
import dotenv from "dotenv";dotenv.config();
import userRoutes from '../routes/UsersRoute.js'

import dbConnect from '../config/dbConnect.js';
import { globalErrHandler,notFound } from '../middlewares/globalErrHandler.js';
import productsRouter from '../routes/productRoute.js';
import categoryRouter from '../routes/categoryRoute.js';
import BrandRouter from '../routes/brandRouter.js';
import ColorRouter from '../routes/ColorRoute.js';
import ReviewRouter from '../routes/reviewRouter.js';
import OrderRouter from '../routes/orderRouter.js';


//this is the db connection
dbConnect();
const app = express();
//pass incomming data
app.use(express.json());


 //routes
 app.use('/api/v1/users/',userRoutes);
 app.use('/api/v1/products',productsRouter);
 app.use('/api/v1/category',categoryRouter);
 app.use('/api/v1/brand',BrandRouter);
 app.use('/api/v1/color',ColorRouter);
app.use('/api/v1/review',ReviewRouter);
app.use('/api/v1/order',OrderRouter);

 //this code is from err midelware
app.use(notFound);
app.use( globalErrHandler);
export default app;