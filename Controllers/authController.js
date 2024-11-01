const Date=require('../models/user');
const Joi=require('joi');
const Controllers = require('./Controllers');
const AuthControll = require('../models/authControll');
const _=require('lodash');
const bcrypt=require('bcrypt');
const flash=require('connect-flash');

class AuthController extends Controllers{
    async registerForm(req,res,next){
        try {
            res.render('auth/register');
        } catch (error) {
            next(error)
        }
    }
    async loginForm(req,res,next){
        try {
            res.render('auth/login');
        } catch (error) {
            next(error)
        }
    }
    async register(req,res,next){
        try {
            const schema={
                username:Joi.string().min(5).max(50).required(),
                email:Joi.string().email().required(),
                password:Joi.string().min(5).max(15).required(),
                birthdate:Joi.date().required()
            }
            const validateResult=Joi.object(schema).validate(req.body);
            if(validateResult.error){
                const err=validateResult.error.details[0].message
                return res.render('auth/register',{err});
            }
            const user=await AuthControll.getUserByEmail(req.body.email);
            if(user){
                return req.flash('message','user already exist');
            }
            const hashPass=bcrypt.hashSync(req.body.password,10);
            const result=await AuthControll.insertUser(req.body.username,req.body.email,hashPass,req.body.birthdate);
            const newUser=await AuthControll.getUserByEmail(req.body.email);
            req.flash('message','register is success');
            res.redirect('/');
            return _.pick(newUser,["username","email","birthdate"]);
        } catch (error) {
            next(error)
        }
    }
    async login(req,res,next){
        try {
            const schema={
                email:Joi.string().email().required(),
                password:Joi.string().min(5).max(8).required(),
            }
            const validateResult=Joi.object(schema).validate(req.body);
            if(validateResult.error){
               return req.flash('error',validateResult.error.details[0].message);
            }
            const user=await AuthControll.getUserByEmail(req.body.email);
            if(!user){
                return req.flash('error','email or password is invalid');
            }
            const validPassword=await bcrypt.compare(req.body.password,user.password);
            if(!validPassword){
                req.flash('errors','password or email is invalid');
                return res.redirect('/');
            }
            req.flash('message','Welcome,Login is compeleted');
            return res.redirect('/')
        } catch (error) {
            next(error)
        }
    }
}
module.exports=new AuthController;