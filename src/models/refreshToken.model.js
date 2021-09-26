
var dbConn = require('../../config/db.config');

  var tokonModel = function(tokon){

     this.Id              =     tokon.Id;
     this.token           =     tokon.token

  }

     // create tokon
     tokonModel.createTokon = (reqData , result) =>
     {
          dbConn.query('INSERT INTO userstoken SET?' , reqData , (err , res)=>{
               if(err)
               {
                    result( err, null)
               }else{
                    result(null ,res) 
               }
          })
     }

       // get refresh  tokon
       tokonModel.getrefreshTokon = (reqData , result) =>
       {
            dbConn.query('SELECT * FROM  userstoken WHERE token=?' , reqData.token , (err , res)=>{
                 if(err)
                 {   
                      result( err, null)
                 }else{
                      result(null ,res) 
                 }
            })
       }

         // delete refresh  tokon
         tokonModel.deleterefreshTokon = (reqData , result) =>
         {
              dbConn.query('DELETE  FROM  userstoken WHERE token=?' , reqData , (err , res)=>{
                   if(err)
                   {   
                        result( err, null)
                   }else{
                        result(null ,res) 
                   }
              })
         }

module.exports= tokonModel;
