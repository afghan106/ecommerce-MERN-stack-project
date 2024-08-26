import express from 'express';
import { registerUserCtrl } from '../controllers/usersCtrl.js';


const userRoutes=express.Router();
userRoutes.post('/api/v1/users/register',registerUserCtrl)
userRoutes.get('/api/v1/users/register',(req,res)=>{
    res.send({msg:'this is from the register user page in server its just api working and all the pages will comming soon and will be the audience of the fact'})
})
export default userRoutes;