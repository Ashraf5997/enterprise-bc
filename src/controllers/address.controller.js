const addressModel  = require('../models/address.model');
const chalk   =    require('chalk');
const log     =    console.log;
require("dotenv").config( );
const auth    =     require('../middlewares/auth');
exports.createAddressDetail = async(req ,ress , next )=>{
     const userObj ={
        pname        : req.body.pname,
        pincode      : req.body.pincode,
        country      : req.body.country,
        state        : req.body.state,
        district     : req.body.district,
        block        : req.body.block,
        userId       : req.body.userId,
     }
       auth (req , ress).then(res=>{
        if(res !=" " && res != null){
          if(res.accesstype == "Customer" || res.accesstype == "Manager" || res.accesstype == "Admin"){
         addressModel.CreateAddressDetail(userObj , (err , data)=>{
            if(err){
                ress.json({status:409 ,message:'Address is already created ' })
            }else{
                if(data.affectedRows == 0){
                    ress.json({status:404 ,message:' technical error try later ' ,UserId:data.insertId })    
            
                }else if(data.affectedRows == 1){
                    ress.json({status:201 ,message:' Your address created successfully ' ,UserId:data.insertId })    
                }else{
                    ress.json({status: 500,message:' Internal server error try after some time' ,UserId:data.insertId })    
                }
            }  
      })
    }else{
        ress.json({status:401 ,message:'Not Authorised '})   ; 
    }
  }
})
    
 }

// UPDATE ADDRESS DETAIL
exports.updateAddressDetail = async(req ,ress , next )=>{
    const userObj ={
        pname        : req.body.pname,
        pincode      : req.body.pincode,
        country      : req.body.country,
        state        : req.body.state,
        district     : req.body.district,
        block        : req.body.block,
        userId       : req.body.userId,
    }
      auth (req , ress).then(res=>{
        if(res !=" " && res != null){
          if(res.accesstype == "Customer" || res.accesstype == "Manager" || res.accesstype == "Admin"){
                    addressModel.UpdateAddressDetail(userObj , (err , data)=>{
                    if(err){
                            ress.json({status:409 ,message:'Server error try later' })
                    }else{
                        if(data.affectedRows == 0){
                            ress.json({status:404 ,message:' Address details not found please create first ' ,UserId:data.insertId })    
                        }else if(data.affectedRows == 1){
                            ress.json({status:201 ,message:' Your address detail is  updated successfully ' ,UserId:data.insertId })    
                        }else{
                            ress.json({status:500 ,message:' Internal server error try after some time ' ,UserId:data.insertId })    
                        }
                    }  
                })
            }else{
                ress.json({status:401 ,message:'Not Authorised '})   ; 
            }
          }
        })
}
 
// GET ADDRESS DETAIL
exports.getAddressDetail = async(req ,ress , next )=>{
    const userObj ={
        userId       : req.params.userId,
    }
     addressModel.GetAddressDetail(userObj , (err , data)=>{
         if(err){
                ress.json({status:409 ,message:'Server error try later' })
         }else{
                ress.json({status:201 ,message:' Your address detail is  fetched successfully ' ,addressData:data})    

         }  
     })
}
 