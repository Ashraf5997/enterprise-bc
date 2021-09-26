


const joi         = require('joi')
const cartModel  = require('../models/cart.model');
const tokonModel  = require('../models/refreshToken.model');
const JwtService  =   require('../services/JwtService');
const bcrypt  =    require('bcrypt');
const chalk   =    require('chalk');
const log     =    console.log;
const{ json } = require('body-parser');
require("dotenv").config( );
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;



// create BY CART  PRODUCTS
exports.addCartProducts = async( req ,ress , next )=>{
     
    // creating object 
    const cartObj ={
      productname:req.body.productname,
      productcategory:req.body.productcategory,
      productprice: req.body.productprice,
      productquantity:req.body.productquantity,
      createdby:req.body.createdby,
      productowner:req.body.productowner,
     }

   
        cartModel.addCartProducts(cartObj, (err , data)=>{
          if(err){
              log(chalk.yellow(" INTERNAL SERVER ERROR", JSON.stringify(err)));
              ress.json({status:409 ,message:'server error' })

              }else{

                log(chalk.blue("Products By CART Is Added  Successfully ",JSON.stringify(data)));
                ress.json({status:201 ,message:' Product Of Cart Added Successfully',productData:data})

          }  
  })
}


// deleyeBY CART  PRODUCTS
exports.deleteCartProducts = async( req ,ress , next )=>{
  

        cartModel.deleteCartProducts(  req.params.id, (err , data)=>{
        if(err){
            log(chalk.yellow(" INTERNAL SERVER ERROR", JSON.stringify(err)));
            ress.json({status:409 ,message:'server error' })

            }else if( data.affectedRows){
            //alert(JSON.stringify(ress))
            log(chalk.blue("Products By CART Is Deleted  Successfully ",JSON.stringify(data)));
            ress.json({status:201 ,message:' Product Of Cart Deleted Successfully',productData:data})    
           } 
           else{
            log(chalk.blue("ISSUE WHILE FETCHING THE PRODUCT ",JSON.stringify(data)));
            ress.json({status:401 ,message:' Record not exist  ',productData:data}) 
           } 
})
}


// get BY CART  PRODUCTS
exports.getCartProducts = async( req ,ress , next )=>{
   
        cartModel.getCartProducts(req.params.name, (err , data)=>{
           if(err){
            log(chalk.yellow(" INTERNAL SERVER ERROR", JSON.stringify(err)));
            ress.json({status:409 ,message:'server error' })

            }else{

            log(chalk.blue("Products By CART Is fetched Successfully ",JSON.stringify(data)));
            ress.json({status:201 ,message:' Product Of Cart fetched Successfully',productData:data})    
        }  
       })
}


// UPDATE BY ID CART  PRODUCTS
exports.updateCartProducts = async( req ,ress , next )=>{
   
  // creating object 
  let reqObj={
      id:req.body.id,
      productquantity:req.body.productquantity,
      productowner:req.body.productowner
  }
  
       cartModel.updateCartProducts( reqObj, (err , data)=>{
        if(err){
            log(chalk.yellow(" INTERNAL SERVER ERROR", JSON.stringify(err)));
            ress.json({status:409 ,message:'server error' })

            }else if(data != "" && data != null){
               log(chalk.blue("Product  quantity uodated by cart  successfully ",JSON.stringify(data)));
               ress.json({status:201 ,message:' Product Of Cart Updated Successfully',productData:data})    
           }  else{
                ress.json({status:401 ,message:'Data not exist' })
           }
})
}