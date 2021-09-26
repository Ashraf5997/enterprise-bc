

var dbConn = require('../../config/db.config');

var usersModel = function(product){

   this.Id                =   product.Id; 
   this.productname       =   product.productname; 
   this.productcategory   =   product.productcategory; 
   this.productprice      =   product.productprice; 
   this.createdby         =   product.createdby;
   this.productquantity   =   product.productquantity;

}

 // create product
 usersModel.createProduct = (reqData , result) =>
 {
   dbConn.query('INSERT INTO products SET?' , reqData , (err , res)=>{
       if(err)
       {
            result( err, null)
       }else{
            result(null ,res) 
       }
   })
 }

 // update product
 usersModel.updateProduct = (id ,rData , result) =>
 {
   
   dbConn.query("UPDATE products SET productname=?, productcategory=?,productprice=?,productquantity=?,createdby=? WHERE id =?", 
   [rData.productname , rData.productcategory,rData.productprice,rData.productquantity,rData.createdby , id] ,(err,res)=>{
 
       if(err)
       {
            result( err, null)
       }else{
            result(null ,res) 
       }
   })
 }

 // Delete product
 usersModel.deleteProduct = (id  , result) =>
 {
     dbConn.query("DELETE  FROM  products WHERE id =?",[id] ,(err,res)=>{ 
       if(err)
       {
            result( err, null)
       }else{
            result(null ,res) 
       }
   })
 }

 
 // Fetch products
 usersModel.fetchProducts = ( result) =>
 {
     dbConn.query("SELECT *  FROM  products " ,(err,res)=>{ 
       if(err)
       {
            result( err, null)
       }else{
            result(null ,res) 
       }
   })
 }

 
 // Fetch By Name products
 usersModel.fetchByNameProducts = ( name,result) =>
 {
     dbConn.query("SELECT *  FROM  products WHERE productcategory=? ",[name] ,(err,res)=>{ 
       if(err)
       {
            result( err, null)
       }else{
            result(null ,res) 
       }
   })
 }


 module.exports= usersModel;