import asynchandler from 'express-async-handler';
import Color from '../model/Color.js';



// create new Colors
//route:post  /api/v1/Colors
//  access : private/admin

export const createColorctrl= asynchandler(async (req, res) => {
    const { name } = req.body;

    // Validate the request body
    if (!name) {
        return res.status(400).json({ message: "Color name is required" });
    }

    // Check if the Color already exists
    const ColorExists = await Color.findOne({ name });

    if (ColorExists) {
        return res.status(400).json({ message: "This Color already exists with this name" });
    } else {
        const color = await Color.create({
            name:name,
            user: req.userAuthId,
        });

        return res.status(201).json({
            status: "success",
            message: "The Color created successfully",
            color,
        });
    }
});

//get all Color
//Router GET/api/Colors
// acess:public

export const getAllColorsCtrl=asynchandler(async(req,res)=>{
   const Colors=await Color.find();

   res.json({
      status:"success",
      message:"Color fetched successfully",
      Colors
   })
})


//get singel color
// route: GET  /api/v1/getcolor
//access: private/admin


export const getColorCtrl=asynchandler(async(req,res)=>{
   const color=await Color.findById(req.params.id);

   res.json({
      status:"success",
      message:"Colors fetched successfully",
      color
   })
})

export const updateColorCtrl=asynchandler(async(req,res)=>{
//update Color
//PUT  /api/Colors/:id
//access/private/admin

const {name}=req.body;

if (!req.userAuthId) {
    res.json({message:"the user is not loged in please first of all login/singup"})
} else {
    const color=await Color.findByIdAndUpdate(req.params.id,{
        name
    },{
        new:true
    });
    res.json({
        status:"success",
        message:"Color update successfully",
        color
    })
}
})


export const deleteColorCtrl=asynchandler(async(req,res)=>{
   if (!req.userAuthId) {
    throw new Error("You are not login please login/Register")
   } else {
    const Colorexits=await Color.findById(req.params.id);
    if (!Colorexits) {
       throw new Error("the Color you want to delete is not exists in the database ")
    }
    await Color.findByIdAndDelete(req.params.id);
    res.json({
        status:"success",
        message:`Color with this id :( ${req.params.id} )is deleted successfully`,

    })
   }
})