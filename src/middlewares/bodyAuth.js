



const { request } = require('express');
const JwtService  =   require('../services/JwtService');

module.exports= BodyAuthenticator = async(req , res , next )=>{
      // console.log(6546476166)
      let authBody = req.body;
    
     if(!authBody){
        res.json({status:402, message:"Token Required"})
     }else{
        //  token = authHeader.split(' ')[1];            
         
            console.log(authBody);
            try{
                const {id , accesstype,fullname } = await JwtService.verify(authBody)
                const user = {
                    id,
                    accesstype,
                    fullname
                }
             return  user;
             console.log(JSON.stringify(user));

            }catch(err){
                res.json({status:401, message:"Token Expired"})
            }
    }

}

