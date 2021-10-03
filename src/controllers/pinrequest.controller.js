const joi           = require('joi')
const pinrequestModel  = require('../models/pinrequest.model');
const tokonModel    = require('../models/refreshToken.model');
const JwtService    =   require('../services/JwtService');
const bcrypt  =  require('bcryptjs');
const chalk   =    require('chalk');
const log     =    console.log;
const{ json } =    require('body-parser');
require("dotenv").config( );
const auth    =     require('../middlewares/auth');
const { exist } = require('joi');
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;


// CREATE  PIN REQUEST
exports.createPinRequest = async(req ,ress , next )=>{
    // var ID = Math.floor(1000 + Math.random() * 9000);
     const userObj ={
         username      : req.body.username,
         userId        : req.body.userId,
         usercontact   : req.body.contact,
         pinqty        : req.body.TP,
         tId           : req.body.TID,
         reqDate       : new Date(),
         actDate       : new Date(),
         status        :"pending",
         activatedBy   :"pending",
     }
       // calling accountModel 
       //Authentication
      auth (req , ress).then(res=>{
        if(res !=" " && res != null){
          console.log(res.accesstype);
          if(res.accesstype == "Customer" || res.accesstype == "Manager" || res.accesstype == "Admin"){
            pinrequestModel.createPinRequest(userObj , (err , data)=>{
                if(err){
                    log(chalk.yellow(" TID is  already exist", JSON.stringify(err)));
                        ress.json({status:409 ,message:'This transaction id is used already  ' }) 
                    }else{
                        log(chalk.blue(" request For Pin Is Created Successfully  Thanks !",JSON.stringify(data)));
                    // Jwt  token creating
                    // access_token= JwtService.sign({id:data.insertId , accesstype :"customerUser", fullname:userObj.fullname})
                    ress.json({status:200 ,message:' Request sent for verification , please wait while we process  ,   ' ,accountData:data})    
                }  
            })
        }else{
                log(chalk.yellow(" NOT AUTHORISED TO CREATE ACCOUNT "));
                ress.json({status:401 ,message:'Not Authorised '})   ; 
        }
     }
  })
 }

 exports.getAllPinRequest =async(req ,ress , next )=>{
      const userObj ={
        usercontact       : req.params.usercontact,
     }
      // calling profileModel 
      pinrequestModel.getAllPinRequest(userObj, (err , data)=>{
          if(err){
                 log(chalk.yellow(" Server Error Try Later", err));
                 ress.json({status:404 ,message:'Server Error Try Later' })
          }else{
                log(chalk.blue(" Pin Request Is Fetched  Successfully ",data));
                ress.json({status:200 ,message:' Pin request is fetched successfully ' ,pinRequestData:data })    
          }  
      })
 }
 

 exports.getAllActPinRequest =async(req ,ress , next )=>{
    const userObj ={
      userId       : req.params.userId,
   }
    // calling profileModel 
    pinrequestModel.getAllActPinRequest(userObj, (err , data)=>{
        if(err){
               log(chalk.yellow(" Server Error Try Later", err));
               ress.json({status:404 ,message:'Server Error Try Later' })
        }else{
              log(chalk.blue(" Pin Request Is Fetched  Successfully ",data));
              ress.json({status:200 ,message:' Pin request is fetched successfully ' ,pinRequestData:data })    
        }  
    })
}
 // FETCHING ALL PIN REQUEST
 exports.getAll =async(req ,ress , next )=>{
    // calling profileModel 
    pinrequestModel.getAll( (err , data)=>{
        if(err){
               log(chalk.yellow(" Server Error Try Later", err));
               ress.json({status:404 ,message:'Server Error Try Later' })
        }else{
              log(chalk.blue("All Pin Request Is Fetched  Successfully ",data));
              ress.json({status:200 ,message:'All pin request is fetched successfully ' ,pinRequestData:data })    
        }  
    })
}

// ACTIVE PIN REQUEST
exports.actPinReq = async(req ,ress , next )=>{
     const userObj = {
         id: req.body.rId,
         activatedBy: req.body.username,
         actDate    : new Date(),
         status     :"active"
     }
       // calling accountModel 
       //Authentication
      auth (req , ress).then(res=>{
        if(res !=" " && res != null){
          console.log(res.accesstype);
          if( res.accesstype == "Manager" || res.accesstype == "Admin"){
            pinrequestModel.actPinReq(userObj , (err , data)=>{
                if(err){
                    log(chalk.yellow(" SERVER ERROR FOR PIN REQUEST UPDATING", JSON.stringify(err)));
                        ress.json({status:409 ,message:'SERVER ERROR FOR PIN REQUEST UPADATING  ' }) 
                    }else{
                        log(chalk.blue(" PIN REQUEST IS UPDATED SUCCESSFULLY !",JSON.stringify(data)));
                        pinrequestModel.genPinReq(req, (err , data)=>{
                            if(err){
                                log(chalk.yellow(" SERVER ERROR FOR PIN REQUEST GENERATING", JSON.stringify(err)));
                                    ress.json({status:409 ,message:'SERVER ERROR FOR PIN REQUEST GENERATING  ' }) 
                                }else{
                                    log(chalk.blue(" PIN REQUEST IS GENERATED SUCCESSFULLY !",JSON.stringify(data)));
                                    ress.json({status:200 ,message:' PIN REQUEST IS GENERATED SUCCESSFULLY !  ' ,pinRequestData:data})  
                                }      
                        })

                }  
            })
        }else{
                log(chalk.yellow(" NOT AUTHORISED TO CREATE ACCOUNT "));
                ress.json({status:401 ,message:'Not Authorised '})   ; 
        }
     }
  })
 }


 // DELETE PIN REQUEST
exports.delPinReq = async(req ,ress , next )=>{
      //Authentication
      let id = req.params.id;
     auth (req , ress).then(res=>{
       if(res !=" " && res != null){
         console.log(res.accesstype);
         if( res.accesstype == "Manager" || res.accesstype == "Admin"){
           pinrequestModel.delPinReq(id , (err , data)=>{
               if(err){
                   log(chalk.yellow(" SERVER ERROR FOR PIN REQUEST DELE", JSON.stringify(err)));
                       ress.json({status:409 ,message:'SERVER ERROR ON PIN REQUEST DELETING  ' }) 
                   }else{
                       log(chalk.blue(" PIN REQUEST IS DELETED  SUCCESSFULLY !",JSON.stringify(data)));
                       ress.json({status:200 ,message:'PIN REQUEST IS DELETED  SUCCESSFULLY ! ' }) 
               }  
           })
       }else{
               log(chalk.yellow(" NOT AUTHORISED TO CREATE ACCOUNT "));
               ress.json({status:401 ,message:'Not Authorised '})   ; 
       }
    }
 })
}
