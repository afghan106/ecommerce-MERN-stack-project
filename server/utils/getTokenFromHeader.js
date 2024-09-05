export const getTokenFromHeader=(req)=>{
    const token=req?.headers?.authorization;
if (token===undefined) {
    return "NO token found in the header"
    
} else {
    return token;
}

}