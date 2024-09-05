import User from "../model/User.js";
import bcrypt from 'bcrypt';
import asynchandler from 'express-async-handler'
import { genereateToken } from "../utils/generateToken.js";
import { getTokenFromHeader } from "../utils/getTokenFromHeader.js";
import { verifyToken } from "../utils/verifyToken.js";



export const registerUserCtrl=asynchandler(async(req,res)=>{
    const{fullname,email,password}=req.body;

const userExist=await User.findOne({email});

if(userExist){
    res.json({
        msg:'User already exists'
    })
}
//hash password 
const salt= await bcrypt.genSalt(10);
const hashedpassword=await bcrypt.hash(password,salt);

//create user

const user =await User.create({
    fullname,
    email,
    password:hashedpassword,
});
res.status(201).json({
    status:'success',
    msg:"user created successfully",
    data:user
})


});


// desc  login user
//@route   post/api/v1/users/login
//@ access  public 
export const loginUserCtrl=asynchandler(async(req,res)=>{
    const {email,password}=req.body;

    const userFound=await User.findOne({email})

// find the hash of the password with bcrype.compare function
    if (userFound && await bcrypt.compare(password,userFound?.password)) {
        res.json({
            status:"success",
            message:"Login successfully",
            userFound,
            token: genereateToken(userFound?._id)
        })

    }else{
        throw new Error('Invalid Login credential (email or password)')
    }


})

//@desc     get user profile
//@route    get/api/v1/users/profile
//access    private

export const getUserProfileCtrl=asynchandler(async(req,res)=>{
const token=await getTokenFromHeader(req);
//verify token

 if (!verifyToken(token)) {
    throw new Error("this user is not loged in")
 }
 res.json({message:"User Token  :"+ token,});
})