var dbConn = require('../../config/db.config');
  var bankModel={
      CreateBankDetail:{},
      UpdateBankDetail:{},
      GetBankDetail   :{}
  }
// CREATE  BANK DETAIL
bankModel.CreateBankDetail= (reqData , result) =>
{
  dbConn.query('INSERT INTO bankdetails SET?' , reqData , (err , res)=>{
      if(err)
      {
           result( err, null)
      }else{
           result(null ,res) 
      }
  })
}
//  UPDATE  BANK DETAIL
bankModel.UpdateBankDetail= (reqData , result) =>
{
  dbConn.query('UPDATE  bankdetails  SET ifsc=?,  bankName=? , branchName=? , account=?   WHERE userId =?' , [ reqData.Ifsc ,reqData.bankName , reqData.branchName ,reqData.account , reqData.userId],(err , res)=>{
      if(err)
      {
           result( err, null)
      }else{
           result(null ,res) 
      }
  })
}
//  GET BANK DETAIL
bankModel.GetBankDetail= (reqData , result) =>
{
     dbConn.query("SELECT *  FROM  bankdetails WHERE userId =?",[reqData.userId] ,(err,res)=>{ 
      if(err)
      {
           result( err, null)
      }else{
           result(null ,res) 
      }
  })
}
module.exports= bankModel;