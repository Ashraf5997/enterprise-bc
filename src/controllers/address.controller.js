const joi         = require('joi')
const addressModel  = require('../models/address.model');
const tokonModel  = require('../models/refreshToken.model');
const JwtService  =   require('../services/JwtService');
const bcrypt  =    require('bcrypt');
const chalk   =    require('chalk');
const log     =    console.log;
const{ json } = require('body-parser');
require("dotenv").config( );
const auth    =     require('../middlewares/auth');
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

// CREATE ADDRESS DETAIL
exports.createAddressDetail = async(req ,ress , next )=>{
     // creating object 
     const userObj ={
        pname        : req.body.pname,
        pincode      : req.body.pincode,
        country      : req.body.country,
        state        : req.body.state,
        district     : req.body.district,
        block        : req.body.block,
        userId       : req.body.userId,
     }
      // calling addressModel 
       //Authentication
       auth (req , ress).then(res=>{
        if(res !=" " && res != null){
          console.log(res.accesstype);
          if(res.accesstype == "Customer" || res.accesstype == "Manager" || res.accesstype == "Admin"){
         addressModel.CreateAddressDetail(userObj , (err , data)=>{
            if(err){
                log(chalk.yellow(" Addresss already created", JSON.stringify(err)));
                ress.json({status:409 ,message:'Address is already created ' })
            }else{
                if(data.affectedRows == 0){
                    log(chalk.white(" UserID not found  ",JSON.stringify(data)));
                    ress.json({status:404 ,message:' technical error try later ' ,UserId:data.insertId })    
            
                }else if(data.affectedRows == 1){
                    log(chalk.blue(" Address  Is Created  Successfully ",JSON.stringify(data)));
                    ress.json({status:201 ,message:' Your address created successfully ' ,UserId:data.insertId })    
                }else{
                    log(chalk.red(" Server Error wile updating bank details",JSON.stringify(data)));
                    ress.json({status: 500,message:' Internal server error try after some time' ,UserId:data.insertId })    
                }
            }  
      })
    }else{
        log(chalk.yellow(" NOT AUTHORISED TO CREATE ADDRESS "));
        ress.json({status:401 ,message:'Not Authorised '})   ; 
    }
  }
})
    
 }

// UPDATE ADDRESS DETAIL
exports.updateAddressDetail = async(req ,ress , next )=>{
    // updating object 
    const userObj ={
        pname        : req.body.pname,
        pincode      : req.body.pincode,
        country      : req.body.country,
        state        : req.body.state,
        district     : req.body.district,
        block        : req.body.block,
        userId       : req.body.userId,
    }
     // calling addressModel 
      //Authentication
      auth (req , ress).then(res=>{
        if(res !=" " && res != null){
          console.log(res.accesstype);
          if(res.accesstype == "Customer" || res.accesstype == "Manager" || res.accesstype == "Admin"){
                    addressModel.UpdateAddressDetail(userObj , (err , data)=>{
                    if(err){
                            log(chalk.yellow(" Server Error Try Later", JSON.stringify(err)));
                            ress.json({status:409 ,message:'Server error try later' })
                    }else{
                        if(data.affectedRows == 0){
                            log(chalk.white(" UserID not found  ",JSON.stringify(data)));
                            ress.json({status:404 ,message:' Address details not found please create first ' ,UserId:data.insertId })    
                    
                        }else if(data.affectedRows == 1){
                            log(chalk.blue(" Address  Is Updated  Successfully ",JSON.stringify(data)));
                            ress.json({status:201 ,message:' Your address detail is  updated successfully ' ,UserId:data.insertId })    

                        }else{
                            log(chalk.red(" Server Error wile updating bank details",JSON.stringify(data)));
                            ress.json({status:500 ,message:' Internal server error try after some time ' ,UserId:data.insertId })    
                        }
                    }  
                })
            }else{
                log(chalk.yellow(" NOT AUTHORISED TO CREATE ADDRESS "));
                ress.json({status:401 ,message:'Not Authorised '})   ; 
            }
          }
        })
}
 
// GET ADDRESS DETAIL
exports.getAddressDetail = async(req ,ress , next )=>{
    // fetching object 
    const userObj ={
        userId       : req.params.userId,
    }
     // calling addressModel 
     addressModel.GetAddressDetail(userObj , (err , data)=>{
         if(err){
                log(chalk.yellow(" Server Error Try Later",err));
                ress.json({status:409 ,message:'Server error try later' })
         }else{
                log(chalk.blue(" Address  Is Fetched Successfully ",data));
                ress.json({status:201 ,message:' Your address detail is  fetched successfully ' ,addressData:data})    

         }  
     })
}
 