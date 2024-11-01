const express=require('express');
const path=require('path');
const app=express();
const methodOverride=require('method-override');
const flash=require('connect-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');
require('dotenv').config();
const Add_Port=process.env.Add_Port;

app.use(express.urlencoded({extended:false}));
app.use(methodOverride('method'));
app.use(express.json());
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(cookieParser(process.env.COOKIE_SECRET))

app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:true,
    saveUninitialized:true,
    cookie:{expires:new Date(Date.now()+1000*3600*24*100),maxAge:60000}
    
}));

app.use(flash());
app.get('/',(req,res)=>{
    res.render('home',{title:'Home Page'});
});

app.use('/',require('./routes/RouterControll'));

app.listen(Add_Port,()=>{
    console.log(`Connection is success to ${Add_Port}`);
});