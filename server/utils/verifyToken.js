import  jwt from 'jsonwebtoken';

export const verifyToken=(token)=>{
    return jwt.verify(token,process.env.JWT_KEY,(err,decodeduser)=>{
        if(err){
            return "Token expire/invalid"; 
        }else{
            return decodeduser;
        };
    });
};