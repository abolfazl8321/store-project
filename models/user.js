const mysql2=require('mysql2');
require('dotenv').config;

const Data=mysql2.createPool({
    user:process.env.DB_USER,
    host:process.env.DB_HOST,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_DATABASE
}).promise();

module.exports=Data;

