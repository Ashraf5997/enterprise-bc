



var dbConn = require('../../config/db.config');

var cartModel = function(prodcut){

   this.Id                =   product.Id; 
   this.productname       =   product.productname; 
   this.productcategory   =   product.productcategory; 
   this.productprice      =   product.productprice; 
   this.createdby         =   product.createdby;
   this.productquantity   =   product.productquantity;
   this.prodcutowner      =   product.prodcutowner

}


 // Fetch By CART Name products
 cartModel.addCartProducts = ( rData ,result) =>
 {
      dbConn.query('INSERT INTO cart SET?  ' , rData , (err , res)=>{
       if(err)
       {
            result( err, null)
       }else{
            result(null ,res) 
       }
   })
 }

 ///delete By CART Name products
 cartModel.deleteCartProducts =( id,result) =>
 {
     dbConn.query("DELETE  FROM  cart WHERE id =?  ",[id] ,(err,res)=>{ 

       if(err)
       {
            result( err, null)
       }else{
            result(null ,res) 
       }
   })
 }

 
 ///get  By CART Name products
 cartModel.getCartProducts = ( name,result) =>
 {
     dbConn.query("SELECT *  FROM  cart WHERE productowner =?",[name] ,(err,res)=>{ 

       if(err)
       {
            result( err, null)
       }else{
            result(null ,res) 
       }
   })
 }

 
 ///Update cart By CART Name products
 cartModel.updateCartProducts = ( obj,result) =>
 {
      console.log("*******************"+obj.productowner)
     dbConn.query("UPDATE  cart SET  productquantity=?   WHERE productowner =?  AND  id =? ",[ obj.productquantity ,obj.productowner , obj.id] ,(err,res)=>{ 
       if(err)
       {
            result( err, null)
       }else{
            result(null ,res) 
       }
   })
 }




module.exports= cartModel;