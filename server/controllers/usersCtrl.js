import User from "../model/User.js";
import bcrypt from 'bcrypt';
export const registerUserCtrl=async(req,res)=>{
    const{fullname,email,password}=req.body;

const userExist=await User.findOne({email});

if(userExist){
    res.json({
        msg:'User already exists'
    })
}
//hash password 
const salt= await bcrypt.genSalt(100);
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



}