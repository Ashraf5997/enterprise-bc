
const mysql = require('mysql');
const dbConn = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.MYSQL_DB,
});

dbConn.connect(function(error ){
    if(error)throw error;
    console.log("Database connected successfully");
})


/*
const {createPool} = require('mysql');
const dbConn = createPool({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.MYSQL_DB,
    port     : process.env.MYSQL_PORT,
    limit    : 10,
});*/

module.exports= dbConn;



