const { exist } = require('joi');
var dbConn = require('../../config/db.config');
var accountModel={
    createAccount:{},
}
// CREATE  ACCOUNT
accountModel.createAccount= (reqData , result) =>
{
    dbConn.query('INSERT INTO user_account SET?' , reqData , (err , res)=>{
        if(err)
        {
            result( err, null)
        }else{
            result(null ,res) 
        }
    })
}
// GET  ACCOUNT BY ID
accountModel.getAccount= (reqData , result) =>
{
    dbConn.query("SELECT *  FROM  user_account WHERE userId =?",[reqData.userId] ,(err,res)=>{ 
    if(err)
    {         
        result( err, null)
    }else{
         result(null ,res) 
    }
})
}
// GET  ALL FOR ACTIVATION ACCOUNT  REQUEST
accountModel.getAllAccountRequest= (result) =>
{
    dbConn.query("SELECT *  FROM  user_account",(err,res)=>{ 
    if(err)
    {         
        result( err, null)
    }else{
         result(null ,res) 
    }
})
}
//  ACCOUNT ACT DEACTIVE 
accountModel.actDact= (reqData,result) =>
{
    dbConn.query("UPDATE user_account SET accountStatus=?,actDate=?,TDate=?,SLITDate=?,activatedBy=? WHERE userId =?",[reqData.accountStatus,reqData.actDate,reqData.TDate,reqData.SLITDate,reqData.username,reqData.userId],(err,res)=>{ 
    if(err)
    {         
        result( err, null)
    }else{
         result(null ,res) 
    }
})
}

//  TDate update
accountModel.updateTDate= (reqData,result) =>
{
    dbConn.query("UPDATE user_account SET SLI=?,TI=?,TDate=? WHERE accountId =?",[reqData.SLI,reqData.TI,reqData.TDate,reqData.accountId],(err,res)=>{ 
    if(err)
    {         
        result( err, null)
    }else{
         result(null ,res) 
    }
})
}
//  SLITDate update
accountModel.updateSLITDate= (reqData,result) =>
{
    dbConn.query("UPDATE user_account SET SLIS=?,SLITDate=? WHERE accountId =?",[reqData.SLIS,reqData.SLITDate,reqData.accountId],(err,res)=>{ 
    if(err)
    {         
        result( err, null)
    }else{
         result(null ,res) 
    }
})
}
//  RI update
accountModel.updateRI= (reqData,result) =>
{
    dbConn.query("UPDATE user_account SET RI=?,TI=? WHERE accountId =?",[reqData.RI,reqData.TI,reqData.accountId],(err,res)=>{ 
    if(err)
    {         
        result( err, null)
    }else{
         result(null ,res) 
    }
    })
}
//  RD update
accountModel.updateRD= (reqData,result) =>
{
    dbConn.query("UPDATE user_account SET RD=? WHERE accountId =?",[reqData.RD,reqData.accountId],(err,res)=>{ 
    if(err)
    {         
        result( err, null)
    }else{
         result(null ,res) 
    }
    })
}
// GET  ACCOUNTId
accountModel.searchAccountId= (accountId,result) =>
{
    dbConn.query("SELECT *  FROM  user_account WHERE accountId =?",[accountId],(err,res)=>{ 
    if(err)
    {         
        result( err, null)
    }else{
         result(null ,res) 
    }
    })
}
// GET  ALL ACTIVE USERS COUNT 
accountModel.getAllActiveUsers= (result) =>
{
   dbConn.query( "SELECT COUNT( * ) as 'count' FROM user_account  WHERE accountStatus='active'",(err , res)=>{
     if(err){
        result(err , null)
     }else{
        result(null , res) 
     }
   })
}
// GET  ALL ACTIVE USERSSS COUNT 
accountModel.getAllActiveUserss= (userId,result) =>
{
   dbConn.query( "SELECT COUNT( * ) as 'count' FROM user_account  WHERE accountStatus='active' AND  userId >=?",[userId],(err , res)=>{
     if(err){
        result(err , null)
     }else{
        result(null , res) 
     }
   })
}
//  GET DOWNLINK MEMBERS 
accountModel.getDownLinkMembers = (refId,result)=>{
    dbConn.query("SELECT *  FROM  user_account WHERE referenceId =?",[refId],(err,res)=>{ 
        if(err)
        {         
            result( err, null)
        }else{
             result(null ,res) 
        }
    })
}
//  CHECK PID 
accountModel.checkPID = (PID,result)=>{
    dbConn.query("SELECT *  FROM  mypins WHERE pin =?",[PID],(err,res)=>{ 
        if(err)
        {         
            result( err, null)
        }else{
             result(null ,res) 
        }
    })
}
//  UPDATE PID 
accountModel.deletePID = (PID,result)=>{
    dbConn.query("DELETE  FROM  mypins WHERE pin=?",[PID],(err,res)=>{ 
        if(err)
        {         
            result( err, null)
        }else{
             result(null ,res) 
        }
    })
}

//  UPDATE LEVEL INCOME
accountModel.updateLevelIncome= (referenceId,result) =>
{
    dbConn.query("SELECT *  FROM  user_account WHERE accountId =?",[referenceId],(err,res)=>{ 
        if(err)
        {     
            result( err, null)
        }else
        {
            if( res[0].referenceId == "Admin0001")
            {
                result(null ,res) 
            }else
            {
                let referenceId = res[0].referenceId;
                let accountId   = res[0].accountId
                let level       = res[0].level;
                let LI          = res[0].LI; 
                let TI          = res[0].TI;
                let SI          = res[0].SI;
                let dM = res[0].dMembers;
                if( level == 0)
                {
                    level = 1;
                }/*else{
                    level =level+1;
                }*/
                LI = LI+20;
                SI =SI+20;
                dM =dM+1;
                 TI =TI+20+20;
                dbConn.query(" UPDATE user_account SET level=?,LI=?,dMembers=?,TI=? ,SI=? WHERE accountId =? ",[level,LI,dM,TI,SI,accountId],(err,res)=>
                { 
                    if(err)
                    {            
                        result( err, null)
                    }else
                    {
                        dbConn.query("SELECT *  FROM  user_account WHERE accountId =?",[referenceId],(err,res)=>
                        { 
                            if(err)
                            {           
                                    result( err, null)
                            }else
                            {
                                if( res.length == 0)
                                {
                                    result(null ,res) 
                                }else
                                {
                                    let accountId   = res[0].accountId
                                    let referenceId = res[0].referenceId;
                                    let level       = res[0].level;
                                    let LI          = res[0].LI;
                                    let TI          = res[0].TI;
                                    LI = LI+10;
                                    level =level+1;
                                    TI =TI+10;
                                // LEVEL 2   
                                dbConn.query(" UPDATE user_account SET level=?,LI=? ,TI=? WHERE accountId =? ",[level,LI,TI,accountId],(err,res)=>
                                { 
                                    if(err)
                                    {         
                                        result( err, null)
                                    }else
                                    {
                                        dbConn.query("SELECT *  FROM  user_account WHERE accountId =?",[referenceId],(err,res)=>
                                        { 
                                            if(err)
                                            {        
                                                    result( err, null)
                                            }else
                                            {
                                                if( res.length == 0)
                                                {
                                                  result(null ,res);
                                                }else
                                                {
                                                let accountId   = res[0].accountId
                                                let referenceId = res[0].referenceId;
                                                let level       = res[0].level;
                                                let LI          = res[0].LI;
                                                let TI          = res[0].TI;
                                                LI = LI+8;
                                                level =level+1;
                                                TI =TI+8;
                                                // level 3
                                                dbConn.query(" UPDATE user_account SET level=?,LI=?,TI=?  WHERE accountId =? ",[level,LI,TI,accountId],(err,res)=>
                                                { 
                                                    if(err)
                                                    {           
                                                         result( err, null)
                                                    }else
                                                    {
                                                        dbConn.query("SELECT *  FROM  user_account WHERE accountId =?",[referenceId],(err,res)=>{ 
                                                            if(err)
                                                            {         
                                                                    result( err, null)
                                                            }else
                                                            {
                                                                if( res.length == 0)
                                                                {
                                                                    result(null ,res) 
                                                                }else
                                                                {
                                                                let accountId   = res[0].accountId
                                                                let referenceId = res[0].referenceId;
                                                                let level       = res[0].level;
                                                                let LI          = res[0].LI;
                                                                let TI          = res[0].TI;
                                                                LI = LI+6;
                                                                level =level+1;
                                                                TI =TI+6;
                                                                // level 4
                                                                dbConn.query(" UPDATE user_account SET level=?,LI=? ,TI=? WHERE accountId =? ",[level,LI,TI,accountId],(err,res)=>
                                                                { 
                                                                    if(err)
                                                                    {         
                                                                           result( err, null)
                                                                    }else
                                                                    {
                                                                        dbConn.query("SELECT *  FROM  user_account WHERE accountId =?",[referenceId],(err,res)=>
                                                                        { 
                                                                            if(err)
                                                                            {           
                                                                                    result( err, null)
                                                                            }else
                                                                            {
                                                                                if( res.length == 0)
                                                                                {
                                                                                    result(null ,res) 
                                                                                }else
                                                                                {
                                                                                let accountId   = res[0].accountId
                                                                                let referenceId = res[0].referenceId;
                                                                                let level       = res[0].level;
                                                                                let LI          = res[0].LI;
                                                                                let TI          = res[0].TI;
                                                                                LI = LI+5;
                                                                                level =level+1;
                                                                                TI =TI+5;
                                                                                // level 5
                                                                                dbConn.query(" UPDATE user_account SET level=?,LI=? ,TI=? WHERE accountId =? ",[level,LI,TI,accountId],(err,res)=>
                                                                                { 
                                                                                    if(err)
                                                                                    {           
                                                                                          result( err, null)
                                                                                    }else
                                                                                    {
                                                                                        dbConn.query("SELECT *  FROM  user_account WHERE accountId =?",[referenceId],(err,res)=>
                                                                                        { 
                                                                                            if(err)
                                                                                            {         
                                                                                                      result( err, null)
                                                                                            }else
                                                                                            {
                                                                                                if( res.length==0)
                                                                                                {
                                                                                                    result(null ,res) 
                                                                                                }else{
                                                                                                let accountId   = res[0].accountId
                                                                                                let referenceId = res[0].referenceId;
                                                                                                let level       = res[0].level;
                                                                                                let LI          = res[0].LI;
                                                                                                let TI          = res[0].TI;
                                                                                                LI = LI+3;
                                                                                                level =level+1;
                                                                                                TI =LI;
                                                                                                // level 6
                                                                                                dbConn.query(" UPDATE user_account SET level=?,LI=?,TI=?  WHERE accountId =? ",[level,LI,TI,accountId],(err,res)=>
                                                                                                { 
                                                                                                    if(err)
                                                                                                    {         
                                                                                                        result( err, null)
                                                                                                    }else
                                                                                                    {
                                                                                                        dbConn.query("SELECT *  FROM  user_account WHERE accountId =?",[referenceId],(err,res)=>
                                                                                                        { 
                                                                                                            if(err)
                                                                                                            {           
                                                                                                               result( err, null)
                                                                                                            }else
                                                                                                            {
                                                                                                                if( res.length == 0)
                                                                                                                {
                                                                                                                    result(null ,res) 
                                                                                                                }else{
                                                                                                                let accountId   = res[0].accountId
                                                                                                                let referenceId = res[0].referenceId;
                                                                                                                let level       = res[0].level;
                                                                                                                let LI          = res[0].LI;
                                                                                                                let TI          = res[0].TI;
                                                                                                                LI = LI+3;
                                                                                                                level =level+1;
                                                                                                                TI =TI+3;
                                                                                                                // level 7
                                                                                                                dbConn.query(" UPDATE user_account SET level=?,LI=?,TI=?  WHERE accountId =? ",[level,LI,TI,accountId],(err,res)=>
                                                                                                                { 
                                                                                                                    if(err)
                                                                                                                    {          
                                                                                                                        result( err, null)
                                                                                                                    }else
                                                                                                                    {
                                                                                                                        dbConn.query("SELECT *  FROM  user_account WHERE accountId =?",[referenceId],(err,res)=>
                                                                                                                        { 
                                                                                                                            if(err)
                                                                                                                            {          
                                                                                                                                result( err, null)
                                                                                                                            }else
                                                                                                                            {
                                                                                                                                if( res.length == 0)
                                                                                                                                {
                                                                                                                                    result(null ,res) 
                                                                                                                                }else{
                                                                                                                                    let accountId   = res[0].accountId
                                                                                                                                    let referenceId = res[0].referenceId;
                                                                                                                                    let level       = res[0].level;
                                                                                                                                    let LI          = res[0].LI;
                                                                                                                                    let TI          = res[0].TI;
                                                                                                                                    LI = LI+2;
                                                                                                                                    level =level+1;
                                                                                                                                    TI =TI+2;
                                                                                                                                    // level 8
                                                                                                                                  dbConn.query(" UPDATE user_account SET level=?,LI=? ,TI=? WHERE accountId =? ",[level,LI,TI,accountId],(err,res)=>
                                                                                                                                  { 
                                                                                                                                    if(err)
                                                                                                                                    {         
                                                                                                                                        result( err, null)
                                                                                                                                    }else
                                                                                                                                    {
                                                                                                                                        dbConn.query("SELECT *  FROM  user_account WHERE accountId =?",[referenceId],(err,res)=>
                                                                                                                                        { 
                                                                                                                                            if(err)
                                                                                                                                            {           
                                                                                                                                               result( err, null)
                                                                                                                                            }else
                                                                                                                                            { 
                                                                                                                                                if( res.length == 0)
                                                                                                                                                {
                                                                                                                                                    result(null ,res) 
                                                                                                                                                }else
                                                                                                                                                {
                                                                                                                                                let accountId   = res[0].accountId
                                                                                                                                                let referenceId = res[0].referenceId;
                                                                                                                                                let level       = res[0].level;
                                                                                                                                                let LI          = res[0].LI;
                                                                                                                                                let TI          = res[0].TI;
                                                                                                                                                LI = LI+2;
                                                                                                                                                level =level+1;
                                                                                                                                                TI =TI+2;
                                                                                                                                                // level 9
                                                                                                                                                dbConn.query(" UPDATE user_account SET level=?,LI=?,TI=?  WHERE accountId =? ",[level,LI,TI,accountId],(err,res)=>
                                                                                                                                                { 
                                                                                                                                                    if(err)
                                                                                                                                                    {         
                                                                                                                                                        result( err, null)
                                                                                                                                                    }else
                                                                                                                                                    {
                                                                                                                                                        dbConn.query("SELECT *  FROM  user_account WHERE accountId =?",[referenceId],(err,res)=>
                                                                                                                                                        { 
                                                                                                                                                            if(err)
                                                                                                                                                            {        
                                                                                                                                                               result( err, null)
                                                                                                                                                            }else
                                                                                                                                                            {  
                                                                                                                                                                if( res.length == 0)
                                                                                                                                                                {
                                                                                                                                                                    result(null ,res) 
                                                                                                                                                                }else{
                                                                                                                                                                let accountId   = res[0].accountId
                                                                                                                                                                let referenceId = res[0].referenceId;
                                                                                                                                                                let level       = res[0].level;
                                                                                                                                                                let LI          = res[0].LI;
                                                                                                                                                                let TI          = res[0].TI;
                                                                                                                                                                LI = LI+2;
                                                                                                                                                                level =level+1;
                                                                                                                                                                TI =LI;
                                                                                                                                                                // level 10
                                                                                                                                                                dbConn.query(" UPDATE user_account SET level=?,LI=? ,TI=? WHERE accountId =? ",[level,LI,TI,accountId],(err,res)=>
                                                                                                                                                                { 
                                                                                                                                                                    if(err)
                                                                                                                                                                    {       
                                                                                                                                                                        result( err, null)
                                                                                                                                                                    }else
                                                                                                                                                                    {
                                                                                                                                                                        dbConn.query("SELECT *  FROM  user_account WHERE accountId =?",[referenceId],(err,res)=>
                                                                                                                                                                        { 
                                                                                                                                                                            if(err)
                                                                                                                                                                            {       
                                                                                                                                                                               result( err, null)
                                                                                                                                                                            }else
                                                                                                                                                                            {
                                                                                                                                                                                if( res.length == 0)
                                                                                                                                                                                {
                                                                                                                                                                                    result(null ,res) 
                                                                                                                                                                                }else{
                                                                                                                                                                                let accountId   = res[0].accountId
                                                                                                                                                                                let referenceId = res[0].referenceId;
                                                                                                                                                                                let level       = res[0].level;
                                                                                                                                                                                let LI          = res[0].LI;
                                                                                                                                                                                let TI          = res[0].TI;
                                                                                                                                                                                LI = LI+2;
                                                                                                                                                                                level =level+1;
                                                                                                                                                                                TI =TI+2;
                                                                                                                                                                                // level 11
                                                                                                                                                                                dbConn.query(" UPDATE user_account SET level=?,LI=? ,TI=? WHERE accountId =? ",[level,LI,TI,accountId],(err,res)=>
                                                                                                                                                                                { 
                                                                                                                                                                                    if(err)
                                                                                                                                                                                    {     
                                                                                                                                                                                          result( err, null)
                                                                                                                                                                                    }else
                                                                                                                                                                                    {
                                                                                                                                                                                        result(null ,res) 

                                                                                                                                                                                    }
                                                                                                                                                                                })

                                                                                                                                                                            }}
                                                                                                                                                                        })

                                                                                                                                                                    }
                                                                                                                                                                })

                                                                                                                                                            }}
                                                                                                                                                        })

                                                                                                                                                    }
                                                                                                                                                })

                                                                                                                                            }}
                                                                                                                                        })
                                                                                                                                    }
                                                                                                                                })

                                                                                                                            }}
                                                                                                                        })

                                                                                                                    }
                                                                                                                })
                                                                                                            }}
                                                                                                        })
                                                                                                    }
                                                                                                })

                                                                                            }}
                                                                                        })
                                                                                    }
                                                                                })
                                                                            }}
                                                                        })
                                                                    }
                                                                })
                                                            }}
                                                        })
                                                    } 
                                                }) 
                                            
                                    /* 1st */} 
                                            }
                                        })
                                    }
                                })
                            }
                            
                        }})
                    }
                })
            }
        }
    })

}

module.exports= accountModel;
