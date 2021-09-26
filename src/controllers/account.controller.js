const joi           = require('joi')
const accountModel  = require('../models/account.model');
const tokonModel    = require('../models/refreshToken.model');
const JwtService    =   require('../services/JwtService');
const bcrypt  =    require('bcrypt');
const chalk   =    require('chalk');
const log     =    console.log;
const{ json } =    require('body-parser');
require("dotenv").config( );
const auth    =     require('../middlewares/auth');
const { exist } = require('joi');
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

// CREATE  USER ACCOUNT
exports.createAccount = async(req ,ress , next )=>{
    // var ID = Math.floor(1000 + Math.random() * 9000);
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
          console.log(res.accesstype);
          if(res.accesstype == "Customer" || res.accesstype == "Manager" || res.accesstype == "Admin"){
              if(req.body.PID == "0"){
                    accountModel.createAccount(userObj , (err , data)=>{
                        if(err){
                            log(chalk.yellow(" userAccount is", JSON.stringify(err)));
                                ress.json({status:409 ,message:' SERVER ERROR TRY LATTER  ! TID' }) 
                            }else{
                                log(chalk.blue(" New User Account Is Created Successfully  Thanks !",JSON.stringify(data)));
                                // Jwt  token creating
                                // access_token= JwtService.sign({id:data.insertId , accesstype :"customerUser", fullname:userObj.fullname})
                                ress.json({status:201 ,message:' Your request sent successfully for verification , please wait while we process  ! NOUPID,   ' ,accountData:data})    
                        }  
                    })
              }else{
                    accountModel.checkPID(req.body.PID,(err, data)=>{
                           if(err){
                            log(chalk.yellow(" userAccount is  already exist !", JSON.stringify(err)));
                                ress.json({status:409 ,message:'  SERVER ERROR TRY LATTER! CPID   ' }) 
                            } else if(data.length !=0){
                                log(chalk.blue(" New User Account Is Created Successfully  Thanks !!",JSON.stringify(data)));
                                accountModel.createAccount(userObj , (err , data)=>{
                                    if(err){
                                        log(chalk.yellow(" userAccount is  already exist !!!", JSON.stringify(err)));
                                        ress.json({status:409 ,message:' SERVER ERROR TRY LATTER CCPID' }) 

                                        }else{
                                            log(chalk.blue(" New User Account Is Created Successfully  Thanks !!!!",JSON.stringify(data)));
                                           //  ress.json({status:201 ,message:' Your request sent successfully for verification , please wait while we process !! ,   ' ,accountData:data})    
                                            accountModel.deletePID(req.body.PID, (err , data)=>{
                                                if(err){
                                                    log(chalk.yellow(" userAccount is  already exist !!!", JSON.stringify(err)));
                                                    ress.json({status:409 ,message:'  SERVER ERROR TRY LATTER! DPID   ' }) 
                                                    }else{
                                                        log(chalk.blue(" New User Account Is Created Successfully  Thanks !!!!",JSON.stringify(data)));
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
                log(chalk.yellow(" NOT AUTHORISED TO CREATE ACCOUNT "));
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
             log(chalk.yellow(" No records found ", JSON.stringify(err)));
                ress.json({status:409 ,message:'Server error try later   ' }) 
             }else{
                 if( data==""){
                    log(chalk.yellow(" No records found ", JSON.stringify(err)));
                    ress.json({status:404 ,message:'Account not exist  ' }) 
                 }else{
                    log(chalk.blue(" New User Account Is Fetched Successfully  Thanks !",JSON.stringify(data)));
                     // Jwt  token creating
                     // access_token= JwtService.sign({id:data.insertId , accesstype :"customerUser", fullname:userObj.fullname})
                     ress.json({status:200 ,message:' Account successfully fetched  ' ,accountData:data})    
                 }
                }  
     })
}
// GET ALL USER  ACCOUNT  FOR AVTIVATION REQUEST
exports.getAllAccountRequest = async(req ,ress , next )=>{
     // calling accountModel 
     accountModel.getAllAccountRequest( (err , data)=>{
         if(err){
             log(chalk.yellow(" No records found ", JSON.stringify(err)));
                ress.json({status:409 ,message:'Account not exist  ' }) 
             }else{
               log(chalk.blue(" All User Account Request Is Fetched Successfully  Thanks !",JSON.stringify(data)));
               ress.json({status:200 ,message:' All account activation  request successfully fetched  ' ,accountData:data})    
         }  
     })
}

// ACT DACT USER ACCOUNT
exports.deactActAccountRequest = async(req ,ress , next )=>{
   // console.log("ASHRAF ASHRAF JAMAL")
    const userObj ={
        userId        : req.body.userId,
        accountStatus : req.body.status,
        username      : req.body.username,
        actDate       : new Date(),
        TDate         : new Date(),
        SLITDate      : new Date(),
    }
    
     // calling accountModel 
     //Authentication
     auth (req , ress).then(res=>{
       if(res !=" " && res != null){
         console.log(res.accesstype);
         if( res.accesstype == "Manager" || res.accesstype == "Admin"){
           accountModel.actDact(userObj , (err , data)=>{
               if(err){
                   log(chalk.yellow(" userAccount not found", JSON.stringify(err)));
                       ress.json({status:409 ,message:'Account not found , please contact with  manager ' }) 
                   }else{
                      // log(chalk.blue(" Account Is Updated Successfully  Thanks !",JSON.stringify(data)));
                      // ress.json({status:201 ,message:'  account status  is updated successfully  ,' ,accountData:data})
                      accountModel.updateLevelIncome(req.body.referenceId ,(err , data)=>{
                          if(err){
                            log(chalk.yellow(" userAccount not found", JSON.stringify(err)));
                            ress.json({status:409 ,message:'Account not found to update LI , please contact with  manager ' })      
                          }
                          else{
                              if(data ==""){
                                log(chalk.red(" RECORDS NOT FOUND +"+"sdsssdsdsd",JSON.stringify(data)));
                                ress.json({status:201 ,message:'  Account status and LI  is updated successfully THNAKS ,' ,accountData:data})
                              }
                              else{
                                log(chalk.blue(" Account with LI Is Updated Successfully  Thanks  now now !",JSON.stringify(data)));
                                ress.json({status:201 ,message:'  Account status and LI  is updated successfully  ,' ,accountData:data}) 
                              }
                          }
                      })    
               }  
           })
       }else{
               log(chalk.yellow(" NOT AUTHORISED TO PERFORM ANY ACTION  ACCOUNT "));
               ress.json({status:401 ,message:'Not Authorised '})   ; 
       }
   }
 })
}

// GET ACCOUNTID
exports.searchAccountId = async(req ,ress , next )=>{
       let  accountId = req.params.accountId;
    // calling accountModel 
    accountModel.searchAccountId(accountId, (err , data)=>{
        if(err){
               log(chalk.yellow(" SERVER ERROR ", JSON.stringify(err)));
               ress.json({status:409 ,message:' Server Error  ' }) 
            }else{
                if(data ==""){
                    log(chalk.yellow(" No records  with these Id found ", JSON.stringify(err)));
                    ress.json({status:404,message:'Invalid reference id ' }) 
                }else{
                    log(chalk.blue(" User Account By Reference Id Is Fetched Successfully  Thanks !",JSON.stringify(data)));
                    ress.json({status:200 ,message:' reference id  successfully fetched  ' ,accountData:data}) 
                }
              }  
    })
}

//   GET TOTAL NUMBERS OF ACTIVE ACOUNT USERS  //COUNT
exports.getAllActiveUsers = async(req , ress , next)=>{
    accountModel.getAllActiveUsers((err, data)=>{
        if(err){
            log(chalk.yellow(" SERVER ERROR ", JSON.stringify(err)));
            ress.json({status:409 ,message:' Server error try latter  ' }) 
        }else if( data == ""){
            log(chalk.yellow(" No Active users Exist  ", JSON.stringify(err)));
            ress.json({status:404,message:'No Active User Exist ' }) 
        }else{
            log(chalk.blue(" User Account By Active  Users  Fetched Successfully  Thanks !",JSON.stringify(data)));
            ress.json({status:200 ,message:'Count of  active users fetched successfully ' ,accountData:data})    
        }
    }) 
} 
 

// UPDATE TDATE
exports.updateTDate= async(req ,ress , next )=>{
    // console.log("ASHRAF ASHRAF JAMAL")
     const userObj ={
         SLI        : req.body.SLI,
         TI         : req.body.TI,
         TDate      : new Date(), 
         accountId  : req.body.accountId  
     }
      // calling accountModel 
      //Authentication
     auth (req , ress).then(res=>{
        if(res !=" " && res != null){
            console.log(res.accesstype);
            if( res.accesstype == "Manager" || res.accesstype == "Admin" || res.accesstype == "Customer"){
                accountModel.updateTDate(userObj , (err , data)=>{
                    if(err){
                        log(chalk.yellow(" TDate Cannnnot Update contact Manager", JSON.stringify(err)));
                            ress.json({status:409 ,message:'Cannot update your account , please contact with  manager ' }) 
                        }else if( data=""){
                            log(chalk.blue("account not found please contact your manager !",JSON.stringify(data)));
                            ress.json({status:409 ,message:'  account not found please contact your manager  ,' ,accountData:data})
                        }else if( data !=""){
                            log(chalk.blue(" Account Is Updated Successfully  Thanks !",JSON.stringify(data)));
                            ress.json({status:200 ,message:'  Your  SLI is updated successfully  ,' ,accountData:data}) 
                        }  
                })
            }else{
                    log(chalk.yellow(" NOT AUTHORISED TO PERFORM ANY ACTION  ACCOUNT "));
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
            console.log(res.accesstype);
            if( res.accesstype == "Manager" || res.accesstype == "Admin" || res.accesstype == "Customer"){
                accountModel.updateSLITDate(userObj , (err , data)=>{
                    if(err){
                        log(chalk.yellow(" SLITDate Cannnnot Update contact Manager", JSON.stringify(err)));
                            ress.json({status:409 ,message:'Cannot update your account , please contact with  manager ' }) 
                        }else if( data=""){
                            log(chalk.blue("account SLITDate not found please contact your manager !",JSON.stringify(data)));
                            ress.json({status:409 ,message:'  account SLITDate not found please contact your manager  ,' ,accountData:data})
                        }else if( data !=""){
                            log(chalk.blue(" Account Is Updated Successfully  Thanks !",JSON.stringify(data)));
                            ress.json({status:200 ,message:'  Your  SLITDate is updated successfully  ,' ,accountData:data}) 
                        }  
                })
            }else{
                    log(chalk.yellow(" NOT AUTHORISED TO PERFORM ANY ACTION  ACCOUNT "));
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
            console.log(res.accesstype);
            if( res.accesstype == "Manager" || res.accesstype == "Admin" || res.accesstype == "Customer"){
                accountModel.updateRI(userObj , (err , data)=>{
                    if(err){
                        log(chalk.yellow(" RI Cannnnot Update contact Manager", JSON.stringify(err)));
                            ress.json({status:409 ,message:'Cannot update your RI , please contact with  manager ' }) 
                        }else if( data=""){
                            log(chalk.blue("account RI not found please contact your manager !",JSON.stringify(data)));
                            ress.json({status:409 ,message:'  account RI not found please contact your manager  ,' ,accountData:data})
                        }else if( data !=""){
                            log(chalk.blue(" Account RI Is Updated Successfully  Thanks !",JSON.stringify(data)));
                            ress.json({status:200 ,message:'  Your  RI is updated successfully  ,' ,accountData:data}) 
                        }  
                })
            }else{
                    log(chalk.yellow(" NOT AUTHORISED TO PERFORM ANY ACTION  ACCOUNT "));
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
                log(chalk.yellow(" SERVER ERROR TRY LATTER", JSON.stringify(err)));
                    ress.json({status:409 ,message:'SERVER ERROR TRY LATTER ' }) 
                }else if( data==""){
                    log(chalk.blue("NO DOWNLINK MEMBERS EXIST !",JSON.stringify(data)));
                    ress.json({status:409 ,message:' NO DOWNLINK MEMBERS EXIST !  ,' ,accountData:data})
                }else if( data!="" ){
                    log(chalk.blue(" DOWNLINK MEMBERS  FETCHED SUCCESSFULLY !",JSON.stringify(data)));
                    ress.json({status:200 ,message:'  DOWNLINK MEMBERS  FETCHED SUCCESSFULLY  ,' ,accountData:data}) 
                }  
        })


 }