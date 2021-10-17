
  var dbConn = require('../../config/db.config');
  var profileModel={
      CreateProfile:{},
      UpdateProfile:{},
      GetProfile   :{}
  }
// CREATE  PROFILE
profileModel.CreateProfile= (reqData , result) =>
{
  dbConn.query('INSERT INTO profile SET?' , reqData , (err , res)=>{
      if(err)
      {
           result( err, null)
      }else{
           result(null ,res) 
      }
  })
}
//  UPDATE  PROFIE
profileModel.UpdateProfile= (reqData , result) =>
{
  dbConn.query('UPDATE  profile  SET  gurdianName=? , panNumber=?  WHERE userId =?' , [reqData.gurdianName , reqData.panNumber , reqData.userId],(err , res)=>{
      if(err)
      {
           result( err, null)
      }else{
           result(null ,res) 
      }
  })
}
//  GET   PROFIE
profileModel.GetProfile= (reqData , result) =>
{
     dbConn.query("SELECT *  FROM profile WHERE userId =?",[reqData.userId] ,(err,res)=>{ 
      if(err)
      {
           result( err, null)
      }else{
           result(null ,res) 
      }
  })
}
module.exports= profileModel;