var dbConn = require('../../config/db.config');
  var addressModel={
      CreateAddressDetail:{},
      UpdateAddressDetail:{},
      GetAddressDetail:{},
  }
// CREATE  ADDRESS    DETAIL
addressModel.CreateAddressDetail= (reqData , result) =>
{
  dbConn.query('INSERT INTO address SET?' , reqData , (err , res)=>{
      if(err)
      {
           result( err, null)
      }else{
           result(null ,res) 
      }
  })
}
//  UPDATE  ADDRESS DETAIL
addressModel.UpdateAddressDetail= (reqData , result) =>
{
  dbConn.query('UPDATE  address  SET country=?,  state=? , district=? , block=?, pname=?, pincode=?   WHERE userId =?' , [ reqData.country ,reqData.state, reqData.district ,reqData.block ,reqData.pname , reqData.pincode, reqData.userId],(err , res)=>{
      if(err)
      {
           result( err, null)
      }else{
           result(null ,res) 
      }
  })
}
//  GET  ADDRESS DETAIL
addressModel.GetAddressDetail= (reqData , result) =>
{
     dbConn.query("SELECT *  FROM  address WHERE userId =?",[reqData.userId] ,(err,res)=>{ 
      if(err)
      {
           result( err, null)
      }else{
           result(null ,res) 
      }
  })
}
module.exports= addressModel;