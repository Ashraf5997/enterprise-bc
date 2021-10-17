const profileModel  = require('../models/profile.modal');
const chalk   =    require('chalk');
const log     =    console.log;
require("dotenv").config( );
const auth    =     require('../middlewares/auth');
exports.createProfile = async(req ,ress , next )=>{
     const userObj ={
        gurdianName : req.body.gurdianName,
        panNumber   : req.body.panNumber,
        userId      : req.body.userId,
     }
     auth (req , ress).then(res=>{
        if(res !=" " && res != null){
          if(res.accesstype == "Customer" || res.accesstype == "Manager" || res.accesstype == "Admin"){
                profileModel.CreateProfile(userObj , (err , data)=>{
                    if(err){
                            ress.json({status:409 ,message:'Profile is already created' })
                        }else{
                            ress.json({status:201 ,message:' Your Profile is created successfully ' ,newUserId:data.insertId })    
                    }  
                })
          }else{
                ress.json({status:401 ,message:'NOT AUTHORISED TO CREATE ADDRESS'})   ; 
          }
        }
     })
 }
// UPDATE PROFILE
exports.updateProfile = async(req ,ress , next )=>{
    const userObj ={
       gurdianName : req.body.gurdianName,
       panNumber   : req.body.panNumber,
       userId      : req.body.userId,
    }
    auth (req , ress).then(res=>{
        if(res !=" " && res != null){
          if(res.accesstype == "Customer" || res.accesstype == "Manager" || res.accesstype == "Admin"){
            profileModel.UpdateProfile(userObj , (err , data)=>{
                if(err){
                        ress.json({status:409 ,message:'Server error try later' })
                }else{
                     if(data.affectedRows == 0){
                            ress.json({status:404 ,message:' Profile details not found please create first ' ,UserId:data.insertId })    
                    }else if(data.affectedRows == 1){
                            ress.json({status:201 ,message:' Profile details is  updated successfully ' ,UserId:data.insertId })    
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

// GET PROFILE
exports.getProfile = async(req ,ress , next )=>{
    const userObj ={
       userId        : req.params.userId,
    }
     profileModel.GetProfile(userObj , (err , data)=>{
         if(err){
                ress.json({status:409 ,message:'Server error try later' })
         }else{
               ress.json({status:201 ,message:' Your Profile is fetched successfully ' ,profileData:data })    
         }  
     })
}
 