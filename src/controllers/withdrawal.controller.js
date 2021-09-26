const joi              = require('joi')
const withdrawalModel  = require('../models/withdrawal.model');
const tokonModel    = require('../models/refreshToken.model');
const JwtService    =   require('../services/JwtService');
const bcrypt  =    require('bcrypt');
const chalk   =    require('chalk');
const log     =    console.log;
const{ json } =    require('body-parser');
require("dotenv").config( );
const auth    =     require('../middlewares/auth');
const { exist } = require('joi');
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;



// CREATE  WITHDRAWAL REQUEST
exports.createWithdrawal = async(req ,ress , next )=>{
    // var ID = Math.floor(1000 + Math.random() * 9000);
     const userObj ={
         fullName      : req.body.fullName,
         userId        : req.body.userId,
         contact       : req.body.contact,
         bankName      : req.body.bankName,
         branchName    : req.body.branchName,
         amount        : req.body.amount,
         accountNumber : req.body.accountNumber,
         ifsc          : req.body.ifsc,
         reqDate       : new Date(),
         payDate       : new Date(),
         status        :"pending",
         payBy         :"pending",
         tId           :"pending"
     }
       // calling accountModel 
       // Authentication
      auth (req , ress).then(res=>{
        if(res !=" " && res != null){
         // console.log(res.accesstype);
          if(res.accesstype == "Customer" || res.accesstype == "Manager" || res.accesstype == "Admin"){
            withdrawalModel.createWithdrawal(userObj , (err , data)=>{
                if(err){
                    log(chalk.yellow(" ", JSON.stringify(err)));
                        ress.json({status:409 ,message:'SERVER ERROR TRY LATER   ' }) 
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

 
//   GET WITHDRAWAL HISTORY
exports.getWithdrawalHistory = async(req , ress , next)=>{
    let userId = req.params.userId;
    withdrawalModel.getWithdrawalHistory(userId,(err, data)=>{
        if(err){
            log(chalk.yellow(" SERVER ERROR ", JSON.stringify(err)));
            ress.json({status:409 ,message:' Server error try latter  ' }) 
        }else if( data == ""){
            log(chalk.yellow(" No His Exist  ", JSON.stringify(err)));
            ress.json({status:404,message:'No Withdrawal History  Exist ' }) 
        }else{
            log(chalk.blue(" User Account By Active  Users  Fetched Successfully  Thanks !",JSON.stringify(data)));
            ress.json({status:200 ,message:'Withdrawal history fetched successfully ' ,withdrawalData:data})    
        }
    }) 
} 


//   GET  ALL WITHDRAWAL REQUEST
exports.getWithdrawalAllRequest = async(req , ress , next)=>{
    withdrawalModel.getWithdrawalAllRequest((err, data)=>{
        if(err){
            log(chalk.yellow(" SERVER ERROR ", JSON.stringify(err)));
            ress.json({status:409 ,message:' Server error try latter  ' }) 
        }else if( data == ""){
            log(chalk.yellow(" No His Exist  ", JSON.stringify(err)));
            ress.json({status:404,message:'No Withdrawal Request Exist ' }) 
        }else{
            log(chalk.blue(" User Account By Active  Users  Fetched Successfully  Thanks !",JSON.stringify(data)));
            ress.json({status:200 ,message:'Withdrawal request fetched successfully ' ,withdrawalData:data})    
        }
    }) 
} 



// PAY WITHDRAWAL  REQUEST
exports.payWithdrawal = async(req ,ress , next )=>{
    // var ID = Math.floor(1000 + Math.random() * 9000);
     const userObj ={
         Id            : req.body.Id,
         tId           : req.body.transactionId,
         payBy         : req.body.payBy,
         payDate       : new Date(),
         status        : "paid",
     }
       // calling accountModel 
       //Authentication
      auth (req , ress).then(res=>{
        if(res !=" " && res != null){
         // console.log(res.accesstype);
          if(res.accesstype == "Customer" || res.accesstype == "Manager" || res.accesstype == "Admin"){
            withdrawalModel.payWithdrawal(userObj , (err , data)=>{
                if(err){
                    log(chalk.yellow(" ", JSON.stringify(err)));
                        ress.json({status:409 ,message:'SERVER ERROR TRY LATER   ' }) 
                    }else{
                        log(chalk.blue(" request For Pin Is Created Successfully  Thanks !",JSON.stringify(data)));
                    // Jwt  token creating
                    // access_token= JwtService.sign({id:data.insertId , accesstype :"customerUser", fullname:userObj.fullname})
                      ress.json({status:200 ,message:' PAID SUCCESSFULLY  ,   ' ,accountData:data})    
                }  
            })
        }else{
                log(chalk.yellow(" NOT AUTHORISED TO CREATE ACCOUNT "));
                ress.json({status:401 ,message:'Not Authorised '})   ; 
        }
     }
  })
 }
