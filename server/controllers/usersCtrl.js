import User from "../model/User.js";

export const registerUserCtrl=async(req,res)=>{
    const{fullname,email,password}=req.body;

const userExist=await User.findOne({email});

if(userExist){
    res.json({
        msg:'User already exists'
    })
}
//hash password 

//create user

const user =await User.create({
    fullname,
    email,
    password,
});
res.status(201).json({
    status:'success',
    msg:"user created successfully",
    data:user
})



}