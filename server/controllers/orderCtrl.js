import asynchandler from 'express-async-handler';
import Order from '../model/Order.js';
import User from '../model/User.js';
import Product from '../model/Product.js';


export const createOrderCtrl=asynchandler(async(req,res)=>{

    //get the payload.
    const {orderItems,shippingAddress,totalPrice}=req.body;


//     // check ir order is not empty.
      if(orderItems?.length<=0) {
             throw new Error("No order item")
            }



    //find the user.
   const user=await User.findById(req.userAuthId);
  
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

res.json({
   success:true,
   message:"order created",
   order,
   user,
})

});