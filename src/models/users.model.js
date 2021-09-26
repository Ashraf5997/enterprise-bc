
  var dbConn = require('../../config/db.config');

  var usersModel = function(user){

     this.Id              =     user.Id;
     this.fullname        =     user.fullname;
     this.email           =     user.email;
     this.password        =     user.password;
     this.createdby       =     user.createdby;
     this.accesstype      =     user.accesstype;

  }

 //get all users
 /* usersModel.getAllUsers = (result)=>{
     dbConn.query("SELECT * FROM users" , (err , res )=>{
     if(err)
     {
         console.log(" error while fetching  ");
         result(null , err);
     }
     else{
         console.log("all task fetched successfully");
         result(null , res);
         //  res.json({ success: 200,taskData:res})  ; 
         //  result.send(200).send({success : 200, data : res});
       }
     })
 }
*/
 // create user
usersModel.createUser = (reqData , result) =>
{
  dbConn.query('INSERT INTO users SET?' , reqData , (err , res)=>{
      if(err)
      {
           result( err, null)
      }else{
           result(null ,res) 
      }
  })
}

 // create customer user
 usersModel.cusReg = (reqData , result) =>
 {
   dbConn.query('INSERT INTO Register SET?' , reqData , (err , res)=>{
       if(err)
       {
            result( err, null)
       }else{
            result(null ,res) 
       }
   })
 }
// UPDATE ADMIN USER
usersModel.updateAdminUser = (rData , result) =>
{
  dbConn.query("UPDATE Register SET fullname=?, password=?, contact=?,accesstype=? WHERE id =?", 
  [rData.fullname ,rData.password, rData.contact,rData.accesstype , rData.id] ,(err,res)=>{
      if(err)
      {
           result( err, null)
      }else{
           result(null ,res) 
      }
  })
}
 // Delete Admin User
 usersModel.deleteAdminUser = (id  , result) =>
 {
     dbConn.query("DELETE  FROM Register   WHERE id =?",[id] ,(err,res)=>{ 
       if(err)
       {
            result( err, null)
       }else{
            result(null ,res) 
       }
   })
 }

 // Admin login user
 usersModel.loginUser = (reqData , result) =>
 {
   dbConn.query('SELECT * FROM users WHERE email =?' , reqData.email , (err , res)=>{
       if(err)
       {
            result( err, null)
       }else{
            result(null ,res) 
       }
   })
 }

 // Customer login user
 usersModel.customerLogin = (reqData , result) =>
 {
   dbConn.query('SELECT * FROM Register WHERE contact =?' , reqData.contact , (err , res)=>{
       if(err)
       {
            result( err, null)
       }else{
            result(null ,res) 
       }
   })
 }
 // get token data
 usersModel.extractToken = (reqData , result) =>
 {
   dbConn.query('SELECT * FROM users WHERE id =?' , reqData , (err , res)=>{
       if(err)
       {
            result( err, null)
       }else{
            result(null ,res) 
       }
   })
 }

 // Customer FORGOT PASSWORD
 usersModel.forgotPassword = (reqData , result) =>
 {
   dbConn.query('SELECT * FROM Register WHERE contact =?' , reqData.contact , (err , res)=>{
       if(err)
       {
            result( err, null)
       }else{
            result(null ,res) 
       }
   })
 }

  // Customer RESET PASSWORD
  usersModel.resetPassword = (reqData , result) =>
  {
     //  console.log("Sassasas"+JSON.stringify(reqData))
    dbConn.query('UPDATE register SET password=? WHERE contact =?',[reqData.password , reqData.contact] , (err , res)=>{
        if(err)
        {
             result( err, null)
        }else{
             result(null ,res) 
        }
    })
  }
  // FETCHED ALL USER
 usersModel.getAllAdminUser = (result) =>
 {
  
   dbConn.query('SELECT * FROM register WHERE accesstype ="Admin" OR accesstype="Manager"' , (err , res)=>{
       if(err)
       {
            result( err, null)
       }else{
            result(null ,res) 
       }
   })
 }


module.exports= usersModel;