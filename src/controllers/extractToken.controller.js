
const joi         = require('joi')
const usersModel  = require('../models/users.model');
const JwtService  = require('../services/JwtService');
const auth    =     require('../middlewares/auth');
const bodyAuth    =     require('../middlewares/bodyAuth');
const bcrypt  = require('bcryptjs');
const chalk   =    require('chalk');
const log     =    console.log;
const tokonModel  = require('../models/refreshToken.model');
const{ json } = require('body-parser');
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

exports.extractToken= async(req , ress)=>{

    auth(req , ress).then(res=>{
             if(res != null && res != ""){
              console.log(res+"jhsdfsjfsef")
                usersModel.extractToken(res.id , (err , data)=>{
                 if(err){
                        log(chalk.yellow(" Internal Server error ",JSON.stringify(err)));
                        ress.json({status:500 ,message:'SERVER ERROR' ,errData:err}) 

                    }else if(data ==""){
                        log(chalk.yellow(" Token expired ",JSON.stringify(err)));
                         ress.json({status:500 ,message:'Token expired ' ,errData:err}) 
                    }else{
                         ress.json({status:200 ,message:'User Data' ,UserData:data}) 
                     }
               })
            }
    })      

}

exports.refreshToken = async(req , res ,next)=>{

    const tokonSchema = joi.object({
        refresh_token   : joi.string().required(),
     })

     // validating data
     const { error} = tokonSchema.validate(req.body);
     if(error){
        return next(error)
     }
     // checking in data base 
     try{
        
          reqObj ={
              token       :  req.body.refresh_token,
           }
            tokonModel.getrefreshTokon ( reqObj,(err , resdata)=>{
         
              if(resdata != "" && resdata != null){
               console.log("ressss"+resdata[0].token)

               //caling authBody
               bodyAuth(req , res).then( result=>{
                        console.log(result+"lalal")
                 tokonModel.createTokon( req,(err , res)=>{
                    if(!err){
                        res.json({status:200 ,message:'Access Verified' ,userData:ress , access_token,refresh_token})    
                    }else{
                        res.json({status:500 ,message:'Internal Server Error' })    
                    }
                  })

               })

           }else{
            res.json({status:401 ,message:'Invalid Refresh Tokon' })    

           }
        })

     }catch(err){
        res.json({status:401 ,message:'Invalid Refresh Tokon' })    
         
     }

}