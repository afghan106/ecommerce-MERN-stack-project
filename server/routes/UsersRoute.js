import express from 'express';
import {  getUserProfileCtrl, loginUserCtrl, registerUserCtrl } from '../controllers/usersCtrl.js';
import { isLogedIn } from '../middlewares/isLogedIn.js';


const userRoutes=express.Router();
userRoutes.post('/api/v1/users/register',registerUserCtrl)
userRoutes.post('/api/v1/users/login',loginUserCtrl)
userRoutes.get('/api/v1/users/profile',isLogedIn,getUserProfileCtrl)

export default userRoutes;