import mongoose from "mongoose";


// mongodb+srv://<username>:<password>@<cluster-name>.mongodb.net/<database-name>?retryWrites=true&w=majority
const dbConnect=async()=>{
    try {

        const connected=await mongoose.connect(process.env.MONGO_URL ||"mongodb://127.0.0.1:27017/ecommerce_api");
        console.log(`mongo db connected${( connected).connection.host} `)
    } catch (error) {
        console.log(`Error :${error.message}`);
        process.exit(1);
    }
}

export default dbConnect;

//afghan2000115    this is the password of the data base user

//this is the url for the mongo db connection

// mongosh "mongodb+srv://ecommerce-api.e76rp.mongodb.net/" --apiVersion 1 --username afghan   