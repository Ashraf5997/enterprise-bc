const withdrawalModel  = require('../models/withdrawal.model');
const chalk   =    require('chalk');
const log     =    console.log;
require("dotenv").config( );
const auth    =     require('../middlewares/auth');
exports.createWithdrawal = async(req ,ress , next )=>{
     const userObj ={
         fullName      : req.body.fullName,
         userId        : req.body.userId,
         contact       : req.body.contact,
         bankName      : req.body.bankName,
         branchName    : req.body.branchName,
         Aviamount     : req.body.Aviamount,
         amount        : req.body.Newamount,
         accountNumber : req.body.accountNumber,
         ifsc          : req.body.ifsc,
         reqDate       : new Date(),
         payDate       : new Date(),
         status        :"pending",
         payBy         :"pending",
         tId           :"pending"
     }
     auth (req , ress).then(res=>{
        if(res !=" " && res != null){
             if(res.accesstype == "Customer" || res.accesstype == "Manager" || res.accesstype == "Admin"){
            withdrawalModel.createWithdrawal(userObj , (err , data)=>{
                if(err){
                       console.log(err)
                        ress.json({status:409 ,message:'SERVER ERROR TRY LATER   ' }) 
                    }else{
                        ress.json({status:200 ,message:' Request sent for verification , please wait while we process  ,   ' ,accountData:data})    
                }  
            })
        }else{
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
            ress.json({status:409 ,message:' Server error try latter  ' }) 
        }else if( data == ""){
            ress.json({status:404,message:'No Withdrawal History  Exist ' }) 
        }else{
            ress.json({status:200 ,message:'Withdrawal history fetched successfully ' ,withdrawalData:data})    
        }
    }) 
} 
//   GET  ALL WITHDRAWAL REQUEST
exports.getWithdrawalAllRequest = async(req , ress , next)=>{
    withdrawalModel.getWithdrawalAllRequest((err, data)=>{
        if(err){
            ress.json({status:409 ,message:' Server error try latter  ' }) 
        }else if( data == ""){
            ress.json({status:404,message:'No Withdrawal Request Exist ' }) 
        }else{
            ress.json({status:200 ,message:'Withdrawal request fetched successfully ' ,withdrawalData:data})    
        }
    }) 
} 
// PAY WITHDRAWAL  REQUEST
exports.payWithdrawal = async(req ,ress , next )=>{
     const userObj ={
         Id            : req.body.Id,
         tId           : req.body.transactionId,
         payBy         : req.body.payBy,
         payDate       : new Date(),
         status        : "paid",
     }
     auth (req , ress).then(res=>{
        if(res !=" " && res != null){
          if(res.accesstype == "Customer" || res.accesstype == "Manager" || res.accesstype == "Admin"){
            withdrawalModel.payWithdrawal(userObj , (err , data)=>{
                if(err){
                        ress.json({status:409 ,message:'SERVER ERROR TRY LATER   ' }) 
                    }else{
                         ress.json({status:200 ,message:' PAID SUCCESSFULLY  ,   ' ,accountData:data})    
                }  
            })
        }else{
             ress.json({status:401 ,message:'Not Authorised '})   ; 
        }
     }
  })
 }
