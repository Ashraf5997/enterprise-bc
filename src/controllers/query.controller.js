const joi         = require('joi')
const queryModel  = require('../models/query.model');
const tokonModel  = require('../models/refreshToken.model');
const JwtService  =   require('../services/JwtService');
const bcrypt  =    require('bcrypt');
const chalk   =    require('chalk');
const log     =    console.log;
const{ json } = require('body-parser');
require("dotenv").config( );
const auth    =     require('../middlewares/auth');
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;


// CREATE QUERIES 
exports.createQuery = async(req ,ress , next )=>{
     // creating object 
     const userObj ={
         fullname :req.body.fullname,
         contact  :req.body.contact,
         query    :req.body.query,
         queryDate: new Date(),
     }
      // calling queryModel 
      queryModel.CreateQuery(userObj , (err , data)=>{
          if(err){
              log(chalk.yellow(" query already created", JSON.stringify(err)));
                 ress.json({status:409 ,message:'Internet issue try after sometime' })
              }else{
                log(chalk.blue(" New Query Is Created Successfully ",JSON.stringify(data)));
               // Jwt  token creating
                ress.json({status:201 ,message:' Thanks for your query , we will respond  with in 24 hours ' ,newUserId:data.insertId })    
          }  
      })
 }
 
 // GET  QUERIES 
exports.getQuery = async(req ,ress , next )=>{
     // calling queryModel 
     queryModel.getQuery( (err , data)=>{
         if(err){
             log(chalk.yellow(" query not found ", JSON.stringify(err)));
                ress.json({status:409 ,message:'Internet issue try after sometime' })
             }else{
               log(chalk.blue(" New Query Is Fetched  Successfully ",JSON.stringify(data)));
              // Jwt  token creating
               ress.json({status:201 ,message:' Query list fetched successfully' ,queryData:data })    
         }  
     })
}
// DELETE  QUERIES 
exports.deleteQuery = async(req ,ress , next )=>{
    // calling queryModel 
    let id= req.params.id;
    queryModel.deleteQuery( id,(err , data)=>{
        if(err){
            log(chalk.yellow(" query not found ", JSON.stringify(err)));
               ress.json({status:409 ,message:'Internet issue try after sometime' })
            }else{
              log(chalk.blue(" New Query Is deleted  Successfully ",JSON.stringify(data)));
             // Jwt  token creating
              ress.json({status:201 ,message:' Query deleted  successfully' })    
        }  
    })
}