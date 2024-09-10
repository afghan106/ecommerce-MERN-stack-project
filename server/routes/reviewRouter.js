import express from 'express';
import { createReviewCtrl } from '../controllers/reviewCtrl.js';
import {isLogedIn} from '../middlewares/isLogedIn.js'
const ReviewRouter=express.Router();

ReviewRouter.post('/createreview/:productID',isLogedIn,createReviewCtrl);

export default ReviewRouter;