
const joi         = require('joi')
const usersModel  = require('../models/users.model');
const JwtService  =   require('../services/JwtService');
const bcrypt  =  require('bcryptjs');
const chalk   =    require('chalk');
const log     =    console.log;
const fast2sms = require('fast-two-sms')
require("dotenv").config( );
const auth    =     require('../middlewares/auth');
// CREATE ADMIN USER
exports.createAdminUser = async(req ,ress , next )=>{
  const {fullname , contact , accesstype, createdBy ,password } = req.body;
  const hashedPassword = await bcrypt.hash(password,10)
  const userObj ={
    fullname,
    contact,
    accesstype,
    createdBy,
    password : hashedPassword,
    joiningDate: new Date(),
  }
  auth (req , ress).then(res=>{
    if(res !=" " && res != null){
      if(res.accesstype == "Manager"){
        usersModel.cusReg(userObj , (err , data)=>{
          if(err){
            ress.json({status:409 ,message:'User already exist' })
          }else{
            access_token= JwtService.sign({id:data.insertId , accesstype : userObj.accesstype, fullname:userObj.fullname})
            ress.json({status:201 ,message:'New  admin user created successfully' ,newUserId:data.insertId , access_token}) 
          }
        })
        }else{
            ress.json({status:401 ,message:'Not Authorised , please contact with manager  '})   ; 
        }
     }
  })
}
// DELETE ADMIN USER
exports.deleteAdminUser = async( req ,ress , next )=>{
   auth (req , ress).then(res=>{
       if(res !=" " && res != null){
         if(res.accesstype == "Manager"){
               usersModel.deleteAdminUser( req.body , (err , data)=>{
                    if(err){
                        ress.json({status:409 ,message:'server error' })
                        }else{
                        ress.json({status:201 ,message:' User Is Deleted successfully',productData:data})    
                    }  
                })
         }else{
              ress.json({status:401 ,message:'Not Authorised , please contact with manager '})   ; 
           }
       }
    })
}
// UPDATE ADMIN USER
exports.updateAdminUser = async( req ,ress , next )=>{
  const hashedPassword = await bcrypt.hash(req.body.password,10)
   auth (req , ress).then(res=>{
       if(res !=" " && res != null){
         if(res.accesstype == "Manager"){
             const userObj ={
                  fullname :req.body.fullname,
                  contact  :req.body.contact,
                  accesstype: req.body.accesstype,
                  id   : req.body.userId ,
                  password :hashedPassword
              }
               usersModel.updateAdminUser( userObj, (err , data)=>{
                    if(err){
                        ress.json({status:409 ,message:'server error' })
                        }else{
                        ress.json({status:201 ,message:' User Data Is Updated Successfully',productData:data})    
                    }  
                })
         }else{
              ress.json({status:401 ,message:'NOT AUTHORISED TO DELETE ANY USER  PLEASE ASK YOUR MANAGER '})   ; 
           }
       }
    })
}
// CREATE CUSTOMER USER
exports.customerRegistration = async(req ,ress , next )=>{
    const password = req.body.password;
    const hashedPassword = await bcrypt.hash(password,10)
    const userObj ={
        fullname :req.body.fullname,
        contact  :req.body.contact,
        joiningDate: new Date(),
        password : hashedPassword,
        accesstype:"Customer",
        createdBy:"self",
    }
     // calling usersModel 
     usersModel.cusReg(userObj , (err , data)=>{
         if(err){
                ress.json({status:409 ,message:'Contact Number already exist try with another' })
             }else{
               access_token= JwtService.sign({id:data.insertId , accesstype :"customerUser", fullname:userObj.fullname})
               ress.json({status:201 ,message:' Registration Successful ,Sign-in now ' ,newUserId:data.insertId , access_token})    
         }  
     })
}
// FETCH ALL USERS ADMDIN
exports.getAllAdminUser = async( req ,ress , next )=>{
  usersModel.getAllAdminUser((err , data)=>{
          if(err){
                ress.json({status:409 ,message:'server error try later' })
              }else{
                ress.json({status:200 ,message:' User Fetched Successfully',userData:data})    
          }  
  })
} 
//ADMIN LOGIN USER
exports.loginUser = async(req ,res , next )=>{
    const userSchema = joi.object({
       email   : joi.string().email().required(),
       password: joi.string().pattern(new RegExp('^[a-zA-z0-9]{6,30}$')).required(), 
    })
       const {error} = userSchema.validate(req.body);
       if(error){
         return next(error)
       }
      const {email,password } = req.body;
      const userObj ={
          email,
          password
      }
      // calling usersModel 
       usersModel.loginUser(userObj , (err , data)=>{
           if(err){
              res.json({status:500 ,message:'SERVER ERROR' ,errData:err}) 
           }else if(data ==""){
              res.json({status:404 ,message:'User not found' ,Data:data})   
           }
           else{
             bcryptedPassword = data[0].password;
             bcrypt.compare(userObj.password , bcryptedPassword ,(err , result )=>{  
                if(result){
                 // Jwt  token creating
                   access_token= JwtService.sign({id:data[0].id , accesstype : data[0].accesstype, fullname:data[0].fullname})
                   res.json({status:200 ,message:'Access Verified' ,userData:data , access_token}) 
                    }else{
                        res.json({status:403 ,message:'Access Denied Invalid Credentials'})    
                    }
              })
           }
       })
}
// CUSTOMER LOGIN USER
exports.customerLogin = async(req ,res , next )=>{
    const {contact,password } = req.body;
    const userObj ={
        contact,
        password
    }
    // calling usersModel 
     usersModel.customerLogin(userObj , (err , data)=>{
         if(err){
            res.json({status:500 ,message:'SERVER ERROR' ,errData:err}) 
         }else if(data ==""){
            res.json({status:404 ,message:'Contact not found' ,Data:data})   
         }
         else{
           bcryptedPassword = data[0].password;
           bcrypt.compare(userObj.password , bcryptedPassword ,(err , result )=>{  
              if(result){
                 access_token= JwtService.sign({id:data[0].id , accesstype :data[0].accesstype , fullname:data[0].fullname})
                 res.json({status:200 ,message:'Access Verified' ,userData:data , access_token:access_token}) 
                  }else{
                      res.json({status:403 ,message:'Access Denied Invalid Credentials'})    
                  }
            })
         }
     })
}
// CUSTOMER FORGOT PASSWORD
exports.forgotPassword = async(req ,res , next )=>{
  const {contact } = req.body;
  const userObj ={
      contact,
  }
  // calling usersModel 
   usersModel.forgotPassword(userObj , (err , data)=>{
       if(err){
          res.json({status:500 ,message:'SERVER ERROR' ,errData:err}) 
       }else if(data ==""){
          res.json({status:404 ,message:'Contact not found' ,Data:data})   
       }
       else{
       var otp = Math.floor(1000 + Math.random() * 9000);
       let number = userObj.contact;
       let API_KEY = process.env.API_KEY;
       let message = "Your 4 digits otp for reset-password is : "+otp+" do not share with others regards: www.enterpricebc.com, THANKS";
       const response = fast2sms.sendMessage({authorization:API_KEY,message:message,numbers:[number]})
       if(response.return = true){
           res.json({status:200 ,message:'4 digits otp has sent to your registered contact number  ' ,otp:otp }) 
       }else{
          res.json({status:409 ,message:"Server error try after sometime " }) 
       }
      }
   })
}
// LOGOUT USER
exports.logoutUser = async(req ,res , next )=>{
   log(req.body.refresh_token)
         try{
       //  auth(req , ress).then(res=>{
              tokonModel.deleterefreshTokon(req.body.refresh_token , (err , data)=>{
                if(err){
                   res.json({status:500,message:'Interrnal Server Error'})    
                }else if(data){
                    res.json({status:200,message:'SUCCESSFULLY LOGGED-OUT'})      
                }
          })
      }catch(err){
        res.json({status:403 ,message:'Access Denied Token Required'})    
      }
} 
// RESET PASSWORD
exports.resetPassword = async(req ,res , next )=>{
 const {password,contact } = req.body;
 const hashedPassword = await bcrypt.hash(password,10)
  const userObj ={
      password:hashedPassword,
      contact
  }
   usersModel.resetPassword(userObj , (err , data)=>{
       if(err){
          res.json({status:500 ,message:'SERVER ERROR' ,errData:err}) 
       }
       else{ setTimeout(()=>{ this.spinnerStart=false }, 2000);
        res.json({status:200 ,message:' Your password has been  reset successfully , please sign-in '}) 
       }
   })
}
// GET OTP FOR REGISTRATION
exports.getOtp = async(req ,res)=>{
        let number = req.params.number;
        let API_KEY = process.env.API_KEY;
        var otp = Math.floor(1000 + Math.random() * 9000);
        let message = "Your 4 digits otp for registration is : "+otp+" do not share with others regards: www.enterpricebc.com, THANKS";
        const response = await fast2sms.sendMessage({authorization:API_KEY,message:message,numbers:[number]})
        if(response.return = true){
            res.json({status:200 ,message:otp })  
        }else{
           res.json({status:409 ,message:"Server error try after sometime " }) 
        }
} 
//   GET TOTAL NUMBERS OF ACTIVE ACOUNT USERS  //COUNT
exports.getAllRegisteredUsers = async(req , ress , next)=>{
  usersModel.getAllRegisteredUsers((err, data)=>{
      if(err){
          ress.json({status:409 ,message:' Server error try latter  ' }) 
      }else if( data == ""){
          ress.json({status:404,message:'No Registered User Exist ' }) 
      }else{
          ress.json({status:200 ,message:'Count of  active users fetched successfully ' ,accountData:data})    
      }
  }) 
} 




