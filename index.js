
const express       =   require('express');
const bodyParser    =   require('body-parser');
const cors          =   require('cors');
const app           =   express();
const errorHandler  =   require('./src/middlewares/errorHandler');
const path          =   require("path");
//app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
require("dotenv").config( );
const Routes   = require('./src/routes/poprouter.route');
const port     =  process.env.PORT || 9060;
const baseUrl  = '/api/v1';
// TASK ROUTES
app.use(baseUrl,Routes);
//app.use(express.static(path.join(__dirname,'public')));
app.use(errorHandler);
app.listen(port,()=>{
    console.log("Express server is running at PORT "+port);
})

