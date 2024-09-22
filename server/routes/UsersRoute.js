import express from 'express';
import {  getUserProfileCtrl, loginUserCtrl, registerUserCtrl, updateShippingAddressctrl } from '../controllers/usersCtrl.js';
import { isLogedIn } from '../middlewares/isLogedIn.js';


const userRoutes=express.Router();
userRoutes.post('/register',registerUserCtrl)
userRoutes.post('/login',loginUserCtrl)
userRoutes.get('/profile',isLogedIn,getUserProfileCtrl)
userRoutes.put('/update/shipping',isLogedIn,updateShippingAddressctrl)

export default userRoutes;