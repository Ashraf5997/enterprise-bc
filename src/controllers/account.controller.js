const accountModel  = require('../models/account.model');
const chalk   =    require('chalk');
const log     =    console.log;
require("dotenv").config( );
const auth    =     require('../middlewares/auth');
// CREATE  USER ACCOUNT
exports.createAccount = async(req ,ress , next )=>{
     const userObj ={
         username      : req.body.username,
         userId        : req.body.userId,
         usercontact   : req.body.usercontact,
         transactionId : req.body.transactionId,
         accountId     : req.body.accountId,
         accountStatus : req.body.accountStatus,
         referenceId   : req.body.referenceId,
         PID           : req.body.PID,
         referenceIdHolder  : req.body.referenceIdHolder,
         SI            : req.body.SI,  
         SLI           : req.body.SLI,
         RI            : req.body.RI,
         LI            : req.body.LI,
         TI            : req.body.TI,
         level         : req.body.level,
         dMembers      : req.body.dMembers,
         reqDate       : new Date(),
         actDate       : new Date(),
         TDate         : new Date(),
         SLITDate      : new Date(),
         SLIS          :"0",
         activatedBy   :req.body.activatedBy,
     }
       // calling accountModel 
       //Authentication
      auth (req , ress).then(res=>{
        if(res !=" " && res != null){
          if(res.accesstype == "Customer" || res.accesstype == "Manager" || res.accesstype == "Admin"){
              if(req.body.PID == "0"){
                    accountModel.createAccount(userObj , (err , data)=>{
                        if(err){
                                ress.json({status:409 ,message:' SERVER ERROR TRY LATTER  ! TID' }) 
                            }else{
                             ress.json({status:201 ,message:' Your request sent successfully for verification , please wait while we process  ! NOUPID,   ' ,accountData:data})    
                        }  
                    })
              }else{
                    accountModel.checkPID(req.body.PID,(err, data)=>{
                           if(err){
                                ress.json({status:409 ,message:'  SERVER ERROR TRY LATTER! CPID   ' }) 
                            } else if(data.length !=0){
                                accountModel.createAccount(userObj , (err , data)=>{
                                    if(err){
                                        ress.json({status:409 ,message:' SERVER ERROR TRY LATTER CCPID' }) 
                                        }else{
                                          accountModel.deletePID(req.body.PID, (err , data)=>{
                                                if(err){
                                                    ress.json({status:409 ,message:'  SERVER ERROR TRY LATTER! DPID   ' }) 
                                                    }else{
                                                       ress.json({status:201 ,message:' Your request sent successfully for verification , please wait while we process CUPID ,   ' ,accountData:data})    
                                                }  
                                             })
                                        }  
                                })
                            } else{
                                ress.json({status:409 ,message:' Invalid pin id  ' }) 
                            } 
                })
              }
        }else{
                ress.json({status:401 ,message:'Not Authorised '})   ; 
        }
    }
  })
 }
// GET USER ACCOUNT BY ID
exports.getAccount = async(req ,ress , next )=>{
    const userObj ={
        userId : req.params.userId,
    }
     // calling accountModel 
     accountModel.getAccount(userObj , (err , data)=>{
         if(err){
                ress.json({status:409 ,message:'Server error try later   ' }) 
             }else{
                 if( data==""){
                    ress.json({status:404 ,message:'Account not exist  ' }) 
                 }else{
                     ress.json({status:200 ,message:' Account successfully fetched  ' ,accountData:data})    
                 }
                }  
     })
}
// GET ALL USER  ACCOUNT  FOR AVTIVATION REQUEST
exports.getAllAccountRequest = async(req ,ress , next )=>{
     accountModel.getAllAccountRequest( (err , data)=>{
         if(err){
                ress.json({status:409 ,message:'Account not exist  ' }) 
             }else{
               ress.json({status:200 ,message:' All account activation  request successfully fetched  ' ,accountData:data})    
         }  
     })
}

// ACT DACT USER ACCOUNT
exports.deactActAccountRequest = async(req ,ress , next )=>{
    const userObj ={
        userId        : req.body.userId,
        accountStatus : req.body.status,
        username      : req.body.username,
        actDate       : new Date(),
        TDate         : new Date(),
        SLITDate      : new Date(),
    }
    auth (req , ress).then(res=>{
       if(res !=" " && res != null){
         if( res.accesstype == "Manager" || res.accesstype == "Admin"){
           accountModel.actDact(userObj , (err , data)=>{
               if(err){
                       ress.json({status:409 ,message:'Account not found , please contact with  manager ' }) 
                   }else{
                    accountModel.updateLevelIncome(req.body.referenceId ,(err , data)=>{
                          if(err){
                            ress.json({status:409 ,message:'Account not found to update LI , please contact with  manager ' })      
                          }
                          else{
                              if(data ==""){
                                ress.json({status:201 ,message:'  Account status and LI  is updated successfully THNAKS ,' ,accountData:data})
                              }
                              else{
                                ress.json({status:201 ,message:'  Account status and LI  is updated successfully  ,' ,accountData:data}) 
                              }
                          }
                      })    
               }  
           })
       }else{
               ress.json({status:401 ,message:'Not Authorised '})   ; 
       }
   }
 })
}
// GET ACCOUNTID
exports.searchAccountId = async(req ,ress , next )=>{
       let  accountId = req.params.accountId;
    accountModel.searchAccountId(accountId, (err , data)=>{
        if(err){
               ress.json({status:409 ,message:' Server Error  ' }) 
            }else{
                if(data ==""){
                    ress.json({status:404,message:'Invalid reference id ' }) 
                }else{
                    ress.json({status:200 ,message:' reference id  successfully fetched  ' ,accountData:data}) 
                }
              }  
    })
}

//   GET TOTAL NUMBERS OF ACTIVE ACOUNT USERS  //COUNT
exports.getAllActiveUsers = async(req , ress , next)=>{
    accountModel.getAllActiveUsers((err, data)=>{
        if(err){
            ress.json({status:409 ,message:' Server error try latter  ' }) 
        }else if( data == ""){
            ress.json({status:404,message:'No Active User Exist ' }) 
        }else{
            ress.json({status:200 ,message:'Count of  active users fetched successfully ' ,accountData:data})    
        }
    }) 
} 
 

// UPDATE TDATE
exports.updateTDate= async(req ,ress , next )=>{
     const userObj ={
         SLI        : req.body.SLI,
         TI         : req.body.TI,
         TDate      : new Date(), 
         accountId  : req.body.accountId  
     }
      auth (req , ress).then(res=>{
        if(res !=" " && res != null){
            if( res.accesstype == "Manager" || res.accesstype == "Admin" || res.accesstype == "Customer"){
                accountModel.updateTDate(userObj , (err , data)=>{
                    if(err){
                            ress.json({status:409 ,message:'Cannot update your account , please contact with  manager ' }) 
                        }else if( data=""){
                            ress.json({status:409 ,message:'  account not found please contact your manager  ,' ,accountData:data})
                        }else if( data !=""){
                            ress.json({status:200 ,message:'  Your  SLI is updated successfully  ,' ,accountData:data}) 
                        }  
                })
            }else{
                    ress.json({status:401 ,message:'Not Authorised '})   ; 
            }
        }
    })
 }
// UPDATE SLITDATE
exports.updateSLITDate= async(req ,ress , next )=>{
    // console.log("ASHRAF ASHRAF JAMAL")
     const userObj ={
         SLIS        : req.body.SLIS,
         SLITDate      : new Date(), 
         accountId  : req.body.accountId  
     }
      // calling accountModel 
      //Authentication
     auth (req , ress).then(res=>{
        if(res !=" " && res != null){
            if( res.accesstype == "Manager" || res.accesstype == "Admin" || res.accesstype == "Customer"){
                accountModel.updateSLITDate(userObj , (err , data)=>{
                    if(err){
                            ress.json({status:409 ,message:'Cannot update your account , please contact with  manager ' }) 
                        }else if( data=""){
                            ress.json({status:409 ,message:'  account SLITDate not found please contact your manager  ,' ,accountData:data})
                        }else if( data !=""){
                            ress.json({status:200 ,message:'  Your  SLITDate is updated successfully  ,' ,accountData:data}) 
                        }  
                })
            }else{
                    ress.json({status:401 ,message:'Not Authorised '})   ; 
            }
        }
    })
 }


 
 
// UPDATE RI
exports.updateRI= async(req ,ress , next )=>{
    // console.log("ASHRAF ASHRAF JAMAL")
     const userObj ={
         RI        : req.body.RI,
         TI        : req.body.TI,
         accountId  : req.body.accountId  
     }
      // calling accountModel 
      //Authentication
     auth (req , ress).then(res=>{
        if(res !=" " && res != null){
            if( res.accesstype == "Manager" || res.accesstype == "Admin" || res.accesstype == "Customer"){
                accountModel.updateRI(userObj , (err , data)=>{
                    if(err){
                            ress.json({status:409 ,message:'Cannot update your RI , please contact with  manager ' }) 
                        }else if( data=""){
                            ress.json({status:409 ,message:'  account RI not found please contact your manager  ,' ,accountData:data})
                        }else if( data !=""){
                            ress.json({status:200 ,message:'  Your  RI is updated successfully  ,' ,accountData:data}) 
                        }  
                })
            }else{
                    ress.json({status:401 ,message:'Not Authorised '})   ; 
            }
        }
    })
 }
 //  GET DOWNLINK MEMBERS 
 exports.getDownLinkMembers = async( req , ress , next )=>{
        let refId = req.params.accountId;
        accountModel.getDownLinkMembers(refId, (err , data)=>{
            if(err){
                    ress.json({status:409 ,message:'SERVER ERROR TRY LATTER ' }) 
                }else if( data==""){
                    ress.json({status:409 ,message:' NO DOWNLINK MEMBERS EXIST !  ,' ,accountData:data})
                }else if( data!="" ){
                    ress.json({status:200 ,message:'  DOWNLINK MEMBERS  FETCHED SUCCESSFULLY  ,' ,accountData:data}) 
                }  
        })
 }