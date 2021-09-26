
require("dotenv").config( );
const validationError = require('joi'); 
const DEBUG_MODE = process.env.DEBUG_MODE;
module.exports= errorHandler = (err , req, res, next)=>{

    let statusCode = 500;
    let data       = {
         message :"Internal server error",
        ...(DEBUG_MODE === 'true' && { originalError : err.message })
    }

   // checking instance of validation error
    if(err){
       statusCode = 422;
       data={
           message:err.message
       }
    }

    return res.status(statusCode).json(data);
}

