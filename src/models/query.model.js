
  var dbConn = require('../../config/db.config');
  var queryModel = function(query){
     this.Id              =     query.Id;
     this.fullname        =     query.fullname;
     this.contact         =     query.contact;
     this.query           =     query.query;
     this.querydate       =     new Date()
  }

// create  query
queryModel.CreateQuery= (reqData , result) =>
{
  dbConn.query('INSERT INTO queries SET?' , reqData , (err , res)=>{
      if(err)
      {
           result( err, null)
      }else{
           result(null ,res) 
      }
  })
}

// create  query
queryModel.getQuery= ( result) =>
{
  dbConn.query("SELECT *  FROM  queries",(err,res)=>{ 
      if(err)
      {
           result( err, null)
      }else{
           result(null ,res) 
      }
  })
}
// delete query
queryModel.deleteQuery= ( id,result) =>
{
  dbConn.query("DELETE  FROM  queries WHERE id=?",[id],(err,res)=>{ 
      if(err)
      {
           result( err, null)
      }else{
           result(null ,res) 
      }
  })
}



module.exports= queryModel;