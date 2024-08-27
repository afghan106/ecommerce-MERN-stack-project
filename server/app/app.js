import express from 'express';
import dotenv from "dotenv";dotenv.config();
import userRoutes from '../routes/UsersRoute.js'

import dbConnect from '../config/dbConnect.js';
import { globalErrHandler,notFound } from '../middlewares/globalErrHandler.js';
//this is the db connection
dbConnect();
const app = express();
//pass incomming data
app.use(express.json());

 //routes
 app.use('/',userRoutes)
 
 
 //this code is from err midelware
 app.use(notFound);
app.use( globalErrHandler);
export default app;