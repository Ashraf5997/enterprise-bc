const { exist } = require('joi');
var dbConn = require('../../config/db.config');

var withdrawalModel={
    createWithdrawal:{},
    getWithdrawalHistory:{}
}

// CREATE  WITHDRAWAL
withdrawalModel.createWithdrawal= (reqData , result) =>
{
    dbConn.query('INSERT INTO withdrawal SET?' , reqData , (err , res)=>{
        if(err)
        {
            result( err, null)
        }else{
          // result(null ,res) 
          dbConn.query("UPDATE user_account SET RI=0,TI=0,SLI=0,SI=0,LI=0 WHERE userId =?",[reqData.userId],(err,res)=>{ 
            if(err)
            {         
                result( err, null)
            }else{
                 result(null ,res) 
            }
            })
          
        }
    })
}

// GETING  WITHDRAWAL HISTORY BY USER ID
withdrawalModel.getWithdrawalHistory =(userId, result)=>{
    dbConn.query("SELECT * FROM withdrawal WHERE userId=?",[userId],(err, res)=>{
      if(err){
        result( err, null)
      }else{
        result(null ,res) 
      }
    })
}

// GETING  WITHDRAWAL HISTORY BY USER ID
withdrawalModel.getWithdrawalAllRequest =(result)=>{
  dbConn.query("SELECT * FROM withdrawal",(err, res)=>{
    if(err){
      result( err, null)
    }else{
      result(null ,res) 
    }
  })
}

// UPDATE  WITHDRAWAL
withdrawalModel.payWithdrawal= (reqData , result) =>
{
      dbConn.query("UPDATE withdrawal SET tId=?,status=?,payBy=?,payDate=? WHERE id =?",[reqData.tId,reqData.status,reqData.payBy,reqData.payDate,reqData.Id],(err,res)=>{ 
        if(err)
        {         
            result( err, null)
        }else{
             result(null ,res) 
        }
      })
}

module.exports= withdrawalModel;