const { exist } = require('joi');
var dbConn = require('../../config/db.config');

var withdrawalModel={
    createWithdrawal:{},
    getWithdrawalHistory:{}
}

// CREATE  WITHDRAWAL
withdrawalModel.createWithdrawal= (reqData , result) =>
{
  let reqDataa ={
    fullName       : reqData.fullName,
    userId         : reqData.userId,
    contact        : reqData.contact,
    bankName       : reqData.bankName,
    branchName     : reqData.branchName,
    accountNumber  : reqData.accountNumber,
    ifsc           : reqData.ifsc,
    amount         : reqData.amount,
    reqDate       : new Date(),
    payDate       : new Date(),
    status        :"pending",
    payBy         :"pending",
    tId           :"pending"
  }
  let Remamount = reqData.Aviamount - reqData.amount
    dbConn.query('INSERT INTO withdrawal SET?' , reqDataa , (err , res)=>{
        if(err)
        {
            result( err, null)
        }else{
          // UPDATING TOTAL AMOUNT
          dbConn.query("UPDATE user_account SET RI=0,SLI=0,SI=0,LI=0,  TI=?WHERE userId =?",[Remamount,reqData.userId],(err,res)=>{ 
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