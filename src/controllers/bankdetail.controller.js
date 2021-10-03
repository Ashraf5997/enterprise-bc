const joi         = require('joi')
const bankModel  = require('../models/bankdetail.model');
const tokonModel  = require('../models/refreshToken.model');
const JwtService  =   require('../services/JwtService');
const bcrypt  =    require('bcryptjs');
const chalk   =    require('chalk');
const log     =    console.log;
const{ json } = require('body-parser');
require("dotenv").config( );
const auth    =     require('../middlewares/auth');
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

// CREATE BANK DETAIL
exports.createBankDetail = async(req ,ress , next )=>{
     // creating object 
     const userObj ={
        bankName     : req.body.bankName,
        branchName   : req.body.branchName,
        Ifsc         : req.body.IFSC,
        account      : req.body.account,
        userId       : req.body.userId,
     }
      // calling profileModel 
        //Authentication
    auth (req , ress).then(res=>{
            if(res !=" " && res != null){
            console.log(res.accesstype);
            if(res.accesstype == "Customer" || res.accesstype == "Manager" || res.accesstype == "Admin"){    
                bankModel.CreateBankDetail(userObj , (err , data)=>{
                    if(err){
                        log(chalk.yellow(" Bank  is already created", JSON.stringify(err)));
                            ress.json({status:409 ,message:'Bank details is already added' })
                        }else{
                            log(chalk.blue(" New Bank Detail Is Added Successfully ",JSON.stringify(data)));
                        // Jwt  token creating
                            ress.json({status:201 ,message:' Your bank details is added successfully ' ,newUserId:data.insertId })    
                    }  
                })
            }else{
                    log(chalk.yellow(" NOT AUTHORISED TO CREATE ADDRESS "));
                    ress.json({status:401 ,message:'Not Authorised '})   ; 
            }
       }
    })
}

// UPDATE BANK DETAIL
exports.updateBankDetail = async(req ,ress , next )=>{
    // updating object 
    const userObj ={
        bankName     : req.body.bankName,
        branchName   : req.body.branchName,
        Ifsc         : req.body.IFSC,
        account      : req.body.account,
        userId       : req.body.userId,
    }
     // calling profileModel 
       //Authentication
    auth (req , ress).then(res=>{
        if(res !=" " && res != null){
        console.log(res.accesstype);
        if(res.accesstype == "Customer" || res.accesstype == "Manager" || res.accesstype == "Admin"){    
                bankModel.UpdateBankDetail(userObj , (err , data)=>{
                    if(err){
                            log(chalk.yellow(" Server Error Try Later", JSON.stringify(err)));
                            ress.json({status:409 ,message:'Server error try later' })
                    }else{
                        if(data.affectedRows == 0){
                            log(chalk.white(" UserID not found  ",JSON.stringify(data)));
                            ress.json({status:404 ,message:' Bank details not found please create first ' ,UserId:data.insertId })    
                    
                        }else if(data.affectedRows == 1){
                            log(chalk.blue(" Bank  Is Updated  Successfully ",JSON.stringify(data)));
                            ress.json({status:201 ,message:' Your bank detail is  updated successfully ' ,UserId:data.insertId })    
                        }else{
                            log(chalk.red(" Server Error wile updating bank details",JSON.stringify(data)));
                            ress.json({status:201 ,message:' Server error try after some time' ,UserId:data.insertId })    
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
 

// GET BANK DETAIL
exports.getBankDetail = async(req ,ress , next )=>{
    // updating object 
    const userObj ={
        userId        : req.params.userId,
    }
     // calling profileModel 
     bankModel.GetBankDetail(userObj , (err , data)=>{
         if(err){
                log(chalk.yellow(" Server Error Try Later",err));
                ress.json({status:409 ,message:'Server error try later' })
         }else{
                log(chalk.blue(" Bank  Is Fetched  Successfully ",data));
                ress.json({status:201 ,message:' Your bank detail is  fetched  successfully ' ,bankData:data})    
         }  
     })
     
}