const pinrequestModel  = require('../models/pinrequest.model');
const chalk   =    require('chalk');
const log     =    console.log;
require("dotenv").config( );
const auth    =     require('../middlewares/auth');
exports.createPinRequest = async(req ,ress , next )=>{
     const userObj ={
         username      : req.body.username,
         userId        : req.body.userId,
         usercontact   : req.body.contact,
         pinqty        : req.body.TP,
         tId           : req.body.TID,
         reqDate       : new Date(),
         actDate       : new Date(),
         status        :"pending",
         activatedBy   :"pending",
     }
     auth (req , ress).then(res=>{
        if(res !=" " && res != null){
          if(res.accesstype == "Customer" || res.accesstype == "Manager" || res.accesstype == "Admin"){
            pinrequestModel.createPinRequest(userObj , (err , data)=>{
                if(err){
                   ress.json({status:409 ,message:'This transaction id is used already  ' }) 
                    }else{
                   ress.json({status:200 ,message:' Request sent for verification , please wait while we process  ,   ' ,accountData:data})    
                }  
            })
        }else{
                ress.json({status:401 ,message:'Not Authorised '})   ; 
        }
     }
  })
 }

 exports.getAllPinRequest =async(req ,ress , next )=>{
      const userObj ={
        usercontact       : req.params.usercontact,
     }
      // calling profileModel 
      pinrequestModel.getAllPinRequest(userObj, (err , data)=>{
          if(err){
                 ress.json({status:404 ,message:'Server Error Try Later' })
          }else{
                ress.json({status:200 ,message:' Pin request is fetched successfully ' ,pinRequestData:data })    
          }  
      })
 }
 

 exports.getAllActPinRequest =async(req ,ress , next )=>{
    const userObj ={
      userId       : req.params.userId,
   }
    // calling profileModel 
    pinrequestModel.getAllActPinRequest(userObj, (err , data)=>{
        if(err){
               ress.json({status:404 ,message:'Server Error Try Later' })
        }else{
              ress.json({status:200 ,message:' Pin request is fetched successfully ' ,pinRequestData:data })    
        }  
    })
}
 // FETCHING ALL PIN REQUEST
 exports.getAll =async(req ,ress , next )=>{
    // calling profileModel 
    pinrequestModel.getAll( (err , data)=>{
        if(err){
               ress.json({status:404 ,message:'Server Error Try Later' })
        }else{
              ress.json({status:200 ,message:'All pin request is fetched successfully ' ,pinRequestData:data })    
        }  
    })
}

// ACTIVE PIN REQUEST
exports.actPinReq = async(req ,ress , next )=>{
     const userObj = {
         id: req.body.rId,
         activatedBy: req.body.username,
         actDate    : new Date(),
         status     :"active"
     }
       // calling accountModel 
       //Authentication
      auth (req , ress).then(res=>{
        if(res !=" " && res != null){
          if( res.accesstype == "Manager" || res.accesstype == "Admin"){
            pinrequestModel.actPinReq(userObj , (err , data)=>{
                if(err){
                        ress.json({status:409 ,message:'SERVER ERROR FOR PIN REQUEST UPADATING  ' }) 
                    }else{
                        pinrequestModel.genPinReq(req, (err , data)=>{
                            if(err){
                                    ress.json({status:409 ,message:'SERVER ERROR FOR PIN REQUEST GENERATING  ' }) 
                                }else{
                                    ress.json({status:200 ,message:' PIN REQUEST IS GENERATED SUCCESSFULLY !  ' ,pinRequestData:data})  
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
 // DELETE PIN REQUEST
exports.delPinReq = async(req ,ress , next )=>{
      let id = req.params.id;
     auth (req , ress).then(res=>{
       if(res !=" " && res != null){
         if( res.accesstype == "Manager" || res.accesstype == "Admin"){
           pinrequestModel.delPinReq(id , (err , data)=>{
               if(err){
                       ress.json({status:409 ,message:'SERVER ERROR ON PIN REQUEST DELETING  ' }) 
                   }else{
                       ress.json({status:200 ,message:'PIN REQUEST IS DELETED  SUCCESSFULLY ! ' }) 
               }  
           })
       }else{
               ress.json({status:401 ,message:'Not Authorised '})   ; 
       }
    }
 })
}
