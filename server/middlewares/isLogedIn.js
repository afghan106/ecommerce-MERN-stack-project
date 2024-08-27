import { getTokenFromHeader } from "../utils/getTokenFromHeader.js";
import { verifyToken } from "../utils/verifyToken.js";

export const isLogedIn=(req,res,next)=>{
    //get token from header
    const token=getTokenFromHeader(req);

    //verify the token
    const decodedUser=verifyToken(token);
    if(!decodedUser){
        throw new Error("invalid/Expired token, please Login again")
    }else{
//save the user into req obj
    req.userAuthId=decodedUser?.id;
    next();
    }
    
}