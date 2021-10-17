const bankModel  = require('../models/bankdetail.model');
const chalk   =    require('chalk');
const log     =    console.log;
require("dotenv").config( );
const auth    =     require('../middlewares/auth');
exports.createBankDetail = async(req ,ress , next )=>{ 
     const userObj ={
        bankName     : req.body.bankName,
        branchName   : req.body.branchName,
        Ifsc         : req.body.IFSC,
        account      : req.body.account,
        userId       : req.body.userId,
     }
     auth (req , ress).then(res=>{
            if(res !=" " && res != null){
            if(res.accesstype == "Customer" || res.accesstype == "Manager" || res.accesstype == "Admin"){    
                bankModel.CreateBankDetail(userObj , (err , data)=>{
                    if(err){
                         ress.json({status:409 ,message:'Bank details is already added' })
                    }else{
                         ress.json({status:201 ,message:' Your bank details is added successfully ' ,newUserId:data.insertId })    
                    }  
                })
            }else{
                ress.json({status:401 ,message:'Not Authorised '})   ; 
            }
       }
    })
}

// UPDATE BANK DETAIL
exports.updateBankDetail = async(req ,ress , next )=>{
    const userObj ={
        bankName     : req.body.bankName,
        branchName   : req.body.branchName,
        Ifsc         : req.body.IFSC,
        account      : req.body.account,
        userId       : req.body.userId,
    }
    auth (req , ress).then(res=>{
        if(res !=" " && res != null){
        if(res.accesstype == "Customer" || res.accesstype == "Manager" || res.accesstype == "Admin"){    
                bankModel.UpdateBankDetail(userObj , (err , data)=>{
                    if(err){
                            ress.json({status:409 ,message:'Server error try later' })
                    }else{
                        if(data.affectedRows == 0){
                            ress.json({status:404 ,message:' Bank details not found please create first ' ,UserId:data.insertId })    
                        }else if(data.affectedRows == 1){
                            ress.json({status:201 ,message:' Your bank detail is  updated successfully ' ,UserId:data.insertId })    
                        }else{
                            ress.json({status:201 ,message:' Server error try after some time' ,UserId:data.insertId })    
                        }
                    }  
                })
            }else{
                ress.json({status:401 ,message:'Not Authorised '})   ; 
            }
       }
    })
                
}

// GET BANK DETAIL
exports.getBankDetail = async(req ,ress , next )=>{
    const userObj ={
        userId        : req.params.userId,
    }
     bankModel.GetBankDetail(userObj , (err , data)=>{
         if(err){
                ress.json({status:409 ,message:'Server error try later' })
         }else{
                ress.json({status:201 ,message:' Your bank detail is  fetched  successfully ' ,bankData:data})    
         }  
     })
     
}