

const JwtService  =   require('../services/JwtService');

module.exports= authenticator = async(req , res , next )=>{
   
     let authHeader = req.headers.authorisation;
   
     let token;
     if(!authHeader){
        res.json({status:402, message:"Token Reqired"})
     }else{
          token = authHeader.split(' ')[1];            
         
           // console.log(token);
            try{
                const {id , accesstype,fullname } = await JwtService.verify(token)
                const user = {
                    id,
                    accesstype,
                    fullname
                }
                return user;
            }catch(err){
                res.json({status:401, message:"Token Expired , please logout and login again"})
            }
    }

}

