import asyncHandler from 'express-async-handler';
import Product from '../model/Product.js';

export const productCtrl = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    brand,
    category,
    sizes,
    colors,
    price,
    totalQty,
    totalSold,
  } = req.body;

  // Check if the product already exists
  const productExist = await Product.findOne({ name });
  if (productExist) {
    res.status(400);
    throw new Error('Product already exists');
  }

  // Create product
  const product = await Product.create({
    name,
    description,
    brand,
    category,
    sizes,
    colors,
    user: req.userAuthId, // Ensure this is set correctly
    price, 
    totalQty,
    totalSold,
  });

  // Respond with the created product
  res.status(201).json({
    status: 'successful',
    msg: 'User Loged in  successfully',
    product,
  });
});

//get all products
//route
//access public

export const getProductCtrl=asyncHandler(async(req,res)=>{
  const products=await Product.find();
  res.json({
    status:'success',
    products,
  });
});