
const joi         = require('joi')
const JwtService  =   require('../services/JwtService');
const productModel  = require('../models/products.model');
const bcrypt  =   require('bcryptjs');
const chalk   =    require('chalk');
const log     =    console.log;
const{ json } = require('body-parser');
const auth    =     require('../middlewares/auth');
require("dotenv").config( );


// CREATE PRODUCTS
exports.createProducts = async(req ,ress , next )=>{

    const productSchema = joi.object({

       productname       : joi.string().min(3),
       productcategory   : joi.string().min(3),
       productprice      : joi.string().min(1),
       productquantity   : joi.string().min(1),
       createdby         : joi.string().min(3),
     

    })
      // validating data
       const {error} = productSchema.validate(req.body);
       if(error){
       return next(error)
       }

      const {productname , productcategory , productprice, createdby ,productquantity } = req.body;
    
      // creating object 
      const productObj ={
          productname,
          productcategory,
          productprice,
          createdby,
          productquantity
      }
      // calling usersModel 

      //Authentication
       auth (req , ress).then(res=>{
           if(res !=" " && res != null){

             // console.log(JSON.stringify(res)+"adsdadadasddadad")
             if(res.accesstype == "admin-user"){
                   productModel.createProduct(productObj , (err , data)=>{
                        if(err){
                        
                            log(chalk.yellow(" INTERNAL SERVER ERROR", JSON.stringify(err)));
                            ress.json({status:409 ,message:'server error' })

                            }else{

                            log(chalk.blue(" New Product Is Created Successfully ",JSON.stringify(data)));
                            ress.json({status:201 ,message:'New user created successfully',productData:data})    
                        }  
                    })
             }else{
                  log(chalk.yellow(" NOT AUTHORISED TO CREATE USER "));
                  ress.json({status:401 ,message:'Not Authorised '})   ; 
               }
           }
        })
}



// UPDATE PRODUCTS
exports.updateProducts = async( req ,ress , next )=>{

    const productSchema = joi.object({

       productname       : joi.string().min(3),
       productcategory   : joi.string().min(3),
       productprice      : joi.string().min(1),
       productquantity   : joi.string().min(1),
       createdby         : joi.string().min(6),
     
    })
      // validating data
       const {error} = productSchema.validate(req.body);
       if(error){
       return next(error)
       }

      const {productname , productcategory , productprice, createdby ,productquantity } = req.body;
    
      // creating object 
      const productObj ={
          productname,
          productcategory,
          productprice,
          createdby,
          productquantity
      }
      // calling usersModel 

      //Authentication
       auth (req , ress).then(res=>{
           if(res !=" " && res != null){

              console.log(res.accesstype);
             if(res.accesstype == "admin-user"){
                   productModel.updateProduct( req.params.id,productObj , (err , data)=>{
                        if(err){
                        
                            log(chalk.yellow(" INTERNAL SERVER ERROR", JSON.stringify(err)));
                            ress.json({status:409 ,message:'server error' })

                            }else{

                            log(chalk.blue("Product Is Updated Successfully ",JSON.stringify(data)));
                            ress.json({status:201 ,message:' User updated successfully',productData:data})    
                        }  
                    })
             }else{
                  log(chalk.yellow(" NOT AUTHORISED TO UPDATE PRODUCT "));
                  ress.json({status:401 ,message:'Not Authorised '})   ; 
               }
           }
        })
}



// DELETE PRODUCTS
exports.deleteProducts = async( req ,ress , next )=>{

      // calling usersModel 

      //Authentication
       auth (req , ress).then(res=>{
           if(res !=" " && res != null){
             console.log(res.accesstype);
             if(res.accesstype == "admin-user"){
                   productModel.deleteProduct( req.params.id , (err , data)=>{
                        if(err){
                            log(chalk.yellow(" INTERNAL SERVER ERROR", JSON.stringify(err)));
                            ress.json({status:409 ,message:'server error' })
                            }else{
                            log(chalk.blue("UserId Is Deleted Successfully ",JSON.stringify(data)));
                            ress.json({status:201 ,message:' Product Deleted successfully',productData:data})    
                        }  
                    })
             }else{
                  log(chalk.yellow(" NOT AUTHORISED TO DELETE PRODUCT "));
                  ress.json({status:401 ,message:'Not Authorised '})   ; 
               }
           }
        })
}


// FETCH PRODUCTS
exports.fetchProducts = async( req ,ress , next )=>{
    productModel.fetchProducts((err , data)=>{
            if(err){
                log(chalk.yellow(" INTERNAL SERVER ERROR", JSON.stringify(err)));
                ress.json({status:409 ,message:'server error' })

                }else{

                log(chalk.blue("Products Is Fetched  Successfully ",JSON.stringify(data)));
                ress.json({status:201 ,message:' Product Fetched Successfully',productData:data})    
            }  
    })
}



// FETCH BY NAME PRODUCTS
exports.fetchByNameProducts = async( req ,ress , next )=>{
    productModel.fetchByNameProducts(req.params.name,(err , data)=>{
            if(err){
                log(chalk.yellow(" INTERNAL SERVER ERROR", JSON.stringify(err)));
                ress.json({status:409 ,message:'server error' })

                }else{

                log(chalk.blue("Products By Name Is Fetched  Successfully ",JSON.stringify(data)));
                ress.json({status:201 ,message:' Product Fetched Successfully',productData:data})    
            }  
    })
}
