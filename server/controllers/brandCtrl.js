import asynchandler from 'express-async-handler';
import Brand from '../model/Brand.js';



// create new brands
//route:post  /api/v1/brands
//  access : private/admin

export const createBrand= asynchandler(async (req, res) => {
    const { name } = req.body;

    // Validate the request body
    if (!name) {
        return res.status(400).json({ message: "Brand name is required" });
    }

    // Check if the brand already exists
    const brandExists = await Brand.findOne({ name });

    if (brandExists) {
        return res.status(400).json({ message: "This brand already exists with this name" });
    } else {
        const brand = await Brand.create({
            name:name,
            user: req.userAuthId,
        });

        return res.status(201).json({
            status: "success",
            message: "The brand created successfully",
            brand,
        });
    }
});

//get all brand
//Router GET/api/brands
// acess:public

export const getAllbrandsCtrl=asynchandler(async(req,res)=>{
   const brands=await Brand.find();

   res.json({
      status:"success",
      message:"brand fetched successfully",
      brands
   })
})


export const getBrandCtrl=asynchandler(async(req,res)=>{
   const brand=await Brand.findById(req.params.id);

   res.json({
      status:"success",
      message:"brands fetched successfully",
      brand
   })
})

export const updateBrandCtrl=asynchandler(async(req,res)=>{
//update Brand
//PUT  /api/brands/:id
//access/private/admin

const {name}=req.body;

if (!req.userAuthId) {
    res.json({message:"the user is not loged in please first of all login/singup"})
} else {
    const brand=await Brand.findByIdAndUpdate(req.params.id,{
        name
    },{
        new:true
    });
    res.json({
        status:"success",
        message:"brand update successfully",
        brand
    })
}
})


export const deleteBrandCtrl=asynchandler(async(req,res)=>{
    await Brand.findByIdAndDelete(req.params.id);
    res.json({
        status:"success",
        message:"brand deleted successfully"
    })
})