import asyncHandler from 'express-async-handler';
import Product from '../model/Product.js';
import { query } from 'express';

export const productCtrl = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    brand,
    category,
    sizes,
    colors,
    user,
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
    user: req.userAuthId, 
    price, 
    totalQty,
    totalSold,
  });

  // Respond with the created product
  res.status(201).json({
    status: 'successful',
    msg: 'Product added to stack  successfully',
    product,
  });
});

//get all products
//route
//access public

export const getProductsCtrl=asyncHandler(async(req,res)=>{

//search product with our given option or name 

//query
let productsQuery=Product.find();

//search by name
if (req.query.name) {
  productsQuery=await productsQuery.find({
    name:{$regex:req.query.name,$options:'i'}
  })
}
// filter by category
if (req.query.category) {
  productsQuery=await productsQuery.find({
    name:{$regex:req.query.category,$options:'i'}
  })
}

//filter the product with price range
if(req.query.price){
  const priceRange=req.query.price.split('-');
   const price=productsQuery.find({
    price:{$gte:priceRange[0],$lte:priceRange[1]}
   })
  }




        //pagenition
//page
const page=parseInt(req.query.page)?parseInt(req.query.page):1
// limite
const limit=parseInt(req.query.limit)?parseInt(req.query.limit):10;
//start index
const startIndex=(page-1)*limit;
// end indexedDB
const endIndex=page*limit;
//total
const total=await Product.countDocuments(); 
productsQuery=productsQuery.skip(startIndex).limit(limit);


//pagenation result


const pagination={};
if (endIndex<total) {
pagination.next={
  page:page+1,
  limit,
}
};
if (startIndex>0) {
  pagination.prev={
    page:page-1,
    limit,
  }
  };



const products=await productsQuery;
  res.json({
    status:'success',
    total,
    result:products.length,
    pagination,
    message:"products fetched successfully",
    products,
  });
});

//get single product
//route:GET/api/product/:id
//access :public

export const getProductCtrl=asyncHandler(async(req,res)=>{

const product=await Product.findById(req.params.id)
   if (!product) {
    throw new Error("Product not found with this id");
   }
   res.json({
    status:"success",
    message:"Product fetched successfully",
    product
   })
})


//update product
// Route: PUT /api/products/:id/update
//access: private Admin
export const updateProductCtrl=asyncHandler(async(req,res)=>{
  const {
    name,
    description,
    brand,
    category,
    sizes,
    colors,
    user,
    price,
    totalQty,
    totalSold,
  } = req.body;
  //update
const userAuthId=req.userAuthId;


if (!userAuthId) {
 res.json({message:"Please sign in before you update/please add the autherization with token of the user in the Header section"});
}
const product=await Product.findByIdAndUpdate(req.params.id,{
  name,
    description,
    brand,
    category,
    sizes,
    colors,
    user:req.userAuthId,
    price,
    totalQty,
    totalSold,
},{
  new:true
})
    //  res.json({
    //   status:"success",
    //   message:"Product updated successfully",
    //   product
    //  })
    
    
  });



  export const deleteProductCtro=asyncHandler(async(req,res)=>{

    const product=await Product.findById(req.params.id);
if (!req.userAuthId) {
 throw new Error("the user is not loged in please first login/sign-up")
} else {
  if (!product) {
  throw new Error(`there is no product with this product id :${req.userAuthId}`);
  } else {
    await Product.findByIdAndDelete(req.params.id);
    res.json({
      status:"success",
      message:"the product deleted successfully",
      product
    })
  }
}
  })