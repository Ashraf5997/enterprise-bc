const queryModel  = require('../models/query.model');
const chalk   =    require('chalk');
const log     =    console.log;
require("dotenv").config( );
exports.createQuery = async(req ,ress , next )=>{
    const userObj ={
         fullname :req.body.fullname,
         contact  :req.body.contact,
         query    :req.body.query,
         queryDate: new Date(),
     }
     queryModel.CreateQuery(userObj , (err , data)=>{
          if(err){
                 ress.json({status:409 ,message:'Internet issue try after sometime' })
              }else{
                   ress.json({status:201 ,message:' Thanks for your query , we will respond  with in 24 hours ' ,newUserId:data.insertId })    
          }  
      })
 }
 // GET  QUERIES 
exports.getQuery = async(req ,ress , next )=>{
     queryModel.getQuery( (err , data)=>{
         if(err){
              ress.json({status:409 ,message:'Internet issue try after sometime' })
             }else{
                  ress.json({status:201 ,message:' Query list fetched successfully' ,queryData:data })    
         }  
     })
}
// DELETE  QUERIES 
exports.deleteQuery = async(req ,ress , next )=>{
     let id= req.params.id;
    queryModel.deleteQuery( id,(err , data)=>{
        if(err){
            ress.json({status:409 ,message:'Internet issue try after sometime' })
            }else{
                 ress.json({status:201 ,message:' Query deleted  successfully' })    
        }  
    })
}