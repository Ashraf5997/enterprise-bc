
var dbConn = require('../../config/db.config');

var pinModel={
    getAllPinRequest:{},
    getAllActPinRequest:{},
    createPinRequest:{},
    getAll:{},
    actPinReq:{},
    genPinReq:{},
}

// CREATE  PIN REQUEST
pinModel.createPinRequest= (reqData , result) =>
{
  dbConn.query("INSERT INTO pin_request SET ?" ,[reqData] , (err , res)=>{
      if(err)
      {
           result( err, null)
      }else{
           result(null ,res) 
      }
  })
}

// GETING  PIN BY USER CONTACT FROM REQ TABLE
pinModel.getAllPinRequest =(obj, result)=>{
    dbConn.query("SELECT * FROM pin_request WHERE usercontact=?",[obj.usercontact],(err, res)=>{
      if(err){
        result( err, null)
      }else{
        result(null ,res) 
      }
    })
}
// GETING BY USER ID FROM MYPINS TABLE
pinModel.getAllActPinRequest =(obj, result)=>{
  dbConn.query("SELECT * FROM mypins  WHERE userId=? ",[obj.userId],(err, res)=>{
    if(err){
      result( err, null)
    }else{
      result(null ,res) 
    }
  })
}

// GETING ALL PIN REQUEST
pinModel.getAll =(result)=>{
  dbConn.query("SELECT * FROM pin_request",(err, res)=>{
    if(err){
      result( err, null)
    }else{
      result(null ,res) 
    }
  })
}


// UPDATING PIN REQUEST
pinModel.actPinReq=(rData,result)=>{
  dbConn.query("UPDATE pin_request SET actDate=?, activatedBy=?, status=? WHERE id =?", 
  [rData.actDate ,rData.activatedBy, rData.status,rData.id] ,(err,res)=>{
      if(err)
      {
           result( err, null)
      }else{
           result(null ,res) 
      }
  })
}

// GENERATING PIN 
pinModel.genPinReq = (req, result)=>{
  
  for(let i=1 ; i<=req.body.pinqty;i++){
    let pin ='PIN_' + Math.random().toString(36).substr(2, 99);
    let pinObj ={
        userId :req.body.userId,
        pin    :pin,
        actDate:new Date(),
        pinStatus :"active",
        rId    :req.body.rId,
    }
    dbConn.query("INSERT INTO mypins SET ?" ,[pinObj] , (err , res)=>{
        if(err)
        {
            result( err, null)
        }else{
          if( i == req.body.pinqty){
            result(null ,res) 
          }  
        }
    })
}

}

// DELETE PIN REQUEST
pinModel.delPinReq= ( id,result) =>
{
  dbConn.query("DELETE  FROM  pin_request WHERE id=?",[id],(err,res)=>{ 
      if(err)
      {
           result( err, null)
      }else{
          // result(null ,res) 
          dbConn.query("DELETE  FROM  mypins WHERE rId=?",[id],(err,res)=>{ 
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



module.exports= pinModel;