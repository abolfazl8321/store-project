const Data = require('./user');
const Date=require('./user');

class AuthControll{
    static insertUser=async(username,email,password,birthdate)=>{
        const [newUser]=await Date.query(`insert into 
            users (username,email,password,birthdate) 
            values(?,?,?,?)`,[username,email,password,birthdate]);
            return newUser;
    }
    static getUserByEmail=async(email)=>{
        const [result]=await Data.query(`select * from users where email=?`,[email]);
        return result[0];
    }
}
module.exports=AuthControll;