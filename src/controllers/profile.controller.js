const joi         = require('joi')
const profileModel  = require('../models/profile.modal');
const tokonModel  = require('../models/refreshToken.model');
const JwtService  =   require('../services/JwtService');
const bcrypt  =   require('bcryptjs');
const chalk   =    require('chalk');
const log     =    console.log;
const{ json } = require('body-parser');
require("dotenv").config( );
const auth    =     require('../middlewares/auth');
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

// CREATE PROFILE
exports.createProfile = async(req ,ress , next )=>{
     // creating object 
     const userObj ={
        gurdianName : req.body.gurdianName,
        panNumber   : req.body.panNumber,
        userId      : req.body.userId,
     }
      // calling profileModel 
       //Authentication
       auth (req , ress).then(res=>{
        if(res !=" " && res != null){
          console.log(res.accesstype);
          if(res.accesstype == "Customer" || res.accesstype == "Manager" || res.accesstype == "Admin"){
                profileModel.CreateProfile(userObj , (err , data)=>{
                    if(err){
                        log(chalk.yellow(" profile already created", JSON.stringify(err)));
                            ress.json({status:409 ,message:'Profile is already created' })
                        }else{
                            log(chalk.blue(" New Profile Is Created Successfully ",JSON.stringify(data)));
                        // Jwt  token creating
                            ress.json({status:201 ,message:' Your Profile is created successfully ' ,newUserId:data.insertId })    
                    }  
                })
          }else{
                log(chalk.yellow(" NOT AUTHORISED TO CREATE ADDRESS "));
                ress.json({status:401 ,message:'Not Authorised '})   ; 
          }
        }
     })
 }

// UPDATE PROFILE
exports.updateProfile = async(req ,ress , next )=>{
    // updating object 
    const userObj ={
       gurdianName : req.body.gurdianName,
       panNumber   : req.body.panNumber,
       userId      : req.body.userId,
    }
     // calling profileModel 
       //Authentication
       auth (req , ress).then(res=>{
        if(res !=" " && res != null){
          console.log(res.accesstype);
          if(res.accesstype == "Customer" || res.accesstype == "Manager" || res.accesstype == "Admin"){
             
            profileModel.UpdateProfile(userObj , (err , data)=>{
                if(err){
                        log(chalk.yellow(" Server Error Try Later", JSON.stringify(err)));
                        ress.json({status:409 ,message:'Server error try later' })
                }else{
                    log(chalk.blue(" Profile Is Updated  Successfully ",JSON.stringify(data)));
                    ress.json({status:201 ,message:' Your Profile is  updated successfully ' ,UserId:data.insertId })    
                }  
            })
        }else{
            log(chalk.yellow(" NOT AUTHORISED TO CREATE ADDRESS "));
            ress.json({status:401 ,message:'Not Authorised '})   ; 
      }
    }
 })
}

// GET PROFILE
exports.getProfile = async(req ,ress , next )=>{
    // updating object 
    const userObj ={
       userId        : req.params.userId,
    }
     // calling profileModel 
     profileModel.GetProfile(userObj , (err , data)=>{
         if(err){
                log(chalk.yellow(" Server Error Try Later", err));
                ress.json({status:409 ,message:'Server error try later' })
         }else{
               log(chalk.blue(" Profile Is Fetched  Successfully ",data));
               ress.json({status:201 ,message:' Your Profile is fetched successfully ' ,profileData:data })    
         }  
     })
}
 