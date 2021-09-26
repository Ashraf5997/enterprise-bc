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
    console.log(JSON.stringify(reqData)+"DA")
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
        {   console.log("Error 1") ;    
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
                let dM = res[0].dMembers;
                if( level == 0)
                {
                    level = 1;
                }else{
                    level =level+1;
                }
                LI = LI+20;
                dM =dM+1;
                 TI =TI+20;
                console.log("TEST LI = "+LI)
                // level 1  ############# LEVEL 1
                dbConn.query(" UPDATE user_account SET level=?,LI=?,dMembers=?,TI=?  WHERE accountId =? ",[level,LI,dM,TI,accountId],(err,res)=>
                { 
                    if(err)
                    {     console.log("Error 2") ;         
                        result( err, null)
                    }else
                    {
                        // result(null ,res) 
                      //  console.log("SASA"+JSON.stringify(res))
                        dbConn.query("SELECT *  FROM  user_account WHERE accountId =?",[referenceId],(err,res)=>
                        { 
                            if(err)
                            {       console.log("Error 3") ;     
                                    result( err, null)
                            }else
                            {
                                if( res.length == 0)
                                {
                                    result(null ,res) 
                                }else
                                {
                                //  console.log("###########"+res.length)
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
                                    {   console.log("Error 4") ;          
                                        result( err, null)
                                    }else
                                    {
                                        dbConn.query("SELECT *  FROM  user_account WHERE accountId =?",[referenceId],(err,res)=>
                                        { 
                                            if(err)
                                            {       console.log("Error 5") ;    
                                                    result( err, null)
                                            }else
                                            {
                                             //   console.log("+++++++++"+JSON.stringify(res))
                                                if( res.length == 0)
                                                {
                                                 // console.log("ASHRAF JAMAL SB")
                                                  result(null ,res);
                                                   // return({status:409 ,message:'Account not found to update LI , please contact with  manager ' }  )    
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
                                                    {    console.log("Error 6") ;        
                                                         result( err, null)
                                                    }else
                                                    {
                                                        dbConn.query("SELECT *  FROM  user_account WHERE accountId =?",[referenceId],(err,res)=>{ 
                                                            if(err)
                                                            {       console.log("Error 7") ;     
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
                                                                    {      console.log("Error 8") ;      
                                                                           result( err, null)
                                                                    }else
                                                                    {
                                                                        dbConn.query("SELECT *  FROM  user_account WHERE accountId =?",[referenceId],(err,res)=>
                                                                        { 
                                                                            if(err)
                                                                            {       console.log("Error 9") ;     
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
                                                                                    {     console.log("Error 10") ;       
                                                                                          result( err, null)
                                                                                    }else
                                                                                    {
                                                                                        dbConn.query("SELECT *  FROM  user_account WHERE accountId =?",[referenceId],(err,res)=>
                                                                                        { 
                                                                                            if(err)
                                                                                            {         console.log("Error 11") ;   
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
                                                                                                    {     console.log("Error 12") ;       
                                                                                                        result( err, null)
                                                                                                    }else
                                                                                                    {
                                                                                                        dbConn.query("SELECT *  FROM  user_account WHERE accountId =?",[referenceId],(err,res)=>
                                                                                                        { 
                                                                                                            if(err)
                                                                                                            {   console.log("Error 13") ;         
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
                                                                                                                    {   console.log("Error 14") ;         
                                                                                                                        result( err, null)
                                                                                                                    }else
                                                                                                                    {
                                                                                                                        dbConn.query("SELECT *  FROM  user_account WHERE accountId =?",[referenceId],(err,res)=>
                                                                                                                        { 
                                                                                                                            if(err)
                                                                                                                            {   console.log("Error 15") ;        
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
                                                                                                                                    {    console.log("Error 16") ;        
                                                                                                                                        result( err, null)
                                                                                                                                    }else
                                                                                                                                    {
                                                                                                                                        dbConn.query("SELECT *  FROM  user_account WHERE accountId =?",[referenceId],(err,res)=>
                                                                                                                                        { 
                                                                                                                                            if(err)
                                                                                                                                            {    console.log("Error 17") ;        
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
                                                                                                                                                    {     console.log("Error 18") ;       
                                                                                                                                                        result( err, null)
                                                                                                                                                    }else
                                                                                                                                                    {
                                                                                                                                                        dbConn.query("SELECT *  FROM  user_account WHERE accountId =?",[referenceId],(err,res)=>
                                                                                                                                                        { 
                                                                                                                                                            if(err)
                                                                                                                                                            {  console.log("Error 19 ") ;        
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
                                                                                                                                                                    {     console.log("Error 20") ;     
                                                                                                                                                                        result( err, null)
                                                                                                                                                                    }else
                                                                                                                                                                    {
                                                                                                                                                                        dbConn.query("SELECT *  FROM  user_account WHERE accountId =?",[referenceId],(err,res)=>
                                                                                                                                                                        { 
                                                                                                                                                                            if(err)
                                                                                                                                                                            {    console.log("Error 21") ;      
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
                                                                                                                                                                                    {     console.log("Error 22") ; 
                                                                                                                                                                                          console.log("Error 11") ;   
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
