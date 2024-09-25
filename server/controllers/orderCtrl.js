import asynchandler from 'express-async-handler';
import Order from '../model/Order.js';
import User from '../model/User.js';
import Product from '../model/Product.js';
import Stripe from 'stripe';
import dotenv from 'dotenv';
dotenv.config();

//creaet order 
//POST /api/v1/orders
//private



// this is how the stripe instance

const stripe=new Stripe(process.env.STRIPE_KEY);


export const createOrderCtrl=asynchandler(async(req,res)=>{

    //get the payload.
    const {orderItems,shippingAddress,totalPrice}=req.body;
// check if user has shipping address
    //find the user.
    const user=await User.findById(req.userAuthId);
  
if (!user?.hasShippingAddress) {
    throw new Error("please provide shipping address")
}


//     // check ir order is not empty.
      if(orderItems?.length<=0) {
             throw new Error("No order item")
            }




  //place /create order - save into db
 const order=await Order.create({
    user:user?._id,
    orderItems,
    shippingAddress,
    totalPrice,
 })


 



// Update the product qty
const products = await Product.find({ _id: { $in: orderItems.map(order => order._id) } });

await Promise.all(orderItems.map(async (order) => {
    const product = products.find((product) => {
        return product._id.toString() === order._id.toString();
    });
    
    if (product) {
        product.totalSold += order.qty;
        await product.save(); // Save the updated product
    }
}));

//  // push order into user
user.orders.push(order?._id);
await user.save();
//MAKE THE PAYMENT WITH STRIPE SERVER
 const session=await stripe.checkout.sessions.create({
    line_items:[{
        price_data:{
        currency:'usd',
        product_data:{
            name:"Hats",
            description:"best hat",
        },
        unit_amount:10*100,
        },
        quantity:4
    }],
    mode:'payment',
    success_url:"http://localhost:3000/success",
    cancel_url:"http://localhost:3000/success",
 })

res.send({url:session.url});




// res.json({
//    success:true,
//    message:"order created",
//    order,
//    user,
// })

});