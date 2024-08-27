import jwt from 'jsonwebtoken';

export const genereateToken=(id)=>{
return jwt.sign({id},process.env.JWT_KEY,{expiresIn:"3d"});
}
