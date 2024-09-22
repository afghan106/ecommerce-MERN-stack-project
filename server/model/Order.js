import mongoose from "mongoose";


//generate random number
const randomText=Math.random().toString(36).substring(7).toLocaleUpperCase();
const randomnumber=Math.floor(1000+Math.random()*90000)
const orderSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    orderItems:[{
    type:Object,
    required:true
    }]
,
shippingAddress:{
    type:Object,
    required:true
},
OrderNumber:{
    type:String,
    required:true,
    default:randomText+randomnumber,
},
//for strip payment

paymentStatus:{
    type:String,
    required:true,
    default:"Not paid"
},
paymentMethod:{
    type:String,
    default:"Not specified"
},
totalprice:{
    type:Number,
    default:0.0
},
currency:{
    type:String,
    default:"Not specified"
},
status:{
    type:String,
    default:"pending",
    enum:['pending','processing','shipped','delevered'],
},
deliverdAt:{
    type:Date
}
},{
    timestamps:true
})

// compile the aboce schema to model
const Order= mongoose.model("Order",orderSchema);

export default Order;