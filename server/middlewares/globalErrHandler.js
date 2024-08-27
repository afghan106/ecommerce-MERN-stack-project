
//500 handler as this is the global errhandler so we should use in the global area where all the ther router can be access Like app.js file
export const globalErrHandler=(err,req,res,next)=>{
    // proving stack 
    //message
    //status

    const stack=err?.stack;
    const statusCode=err?.statusCode ? err?.statusCode:500;
    const message=err?.message;


    res.status(statusCode).json({
        atatus:statusCode,
        stack,
        message,

    
    })
}

//404 handler 
export const notFound=(req,res,next)=>{
    const err=new Error(`Route ${req.originalUrl} Not found`);
    next(err);

}