import mongoose, { Schema } from "mongoose";
const SChema=mongoose.Schema;

const UserSchema=new Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    orders:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"WhishList"
        }
    ],
    isAdmin:{
        type:Boolean,
        default:false
    },
    hasShippingAddress:{
        type:Boolean,
        default:false
    },
    shippingAddress:{
        firsName:{
            type:String
        },
        lastName:{
            type:String
        },
        address:{
            type:String
        },
        city:{
            type:String
        },
        postalCode:{
            typeof:String
        },
        province:{
            type:String
        },
        country:{
            type:String
        },
        phone:{
            type:String
        }
    }
},{
    timestamps:true
})

//compile the schema to the model
const User=mongoose.model("User",UserSchema);

export default User;