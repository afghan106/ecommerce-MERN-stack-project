import asynchandler from 'express-async-handler';
import Product from '../model/Product.js';
import Review from '../model/Review.js'
// create new review
//POST /api/v1/reviews
// access :private/Admin

export const createReviewCtrl=asynchandler(async(req,res)=>{
    const {productID}=req.params;
    const{product,message,rating}=req.body;

    // find the product you want to review-on
const productFound=await Product.findById(productID).populate('reviews');

if (!productFound) {
    throw new Error("product is not exists in the database");
}
// check if user already reviewed this product 

const hasReviewd=productFound?.reviews?.find((review)=>{
    console.log(review);
    return review?.user?.toString()===req?.userAuthId?.toString();
})
if (hasReviewd) {
    throw new Error('you have already reviewed this product')
}
//create review

const review=await Review.create({
    message,
    rating,
    product:productFound?._id,
    user:req.userAuthId,
});
//push review into product found
productFound.reviews.push(review?._id);
//resave 
await productFound.save();
res.status(201).json({
    success:true,
    message:"Review created successfully"
})

})