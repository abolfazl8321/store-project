const Data=require('../models/user');
const express=require('express');
const router=express.Router();
const Controllers=require('./Controllers');
const DBController=require('../models/DBcontroller');
const {validationResult}=require('express-validator');
const flash=require('connect-flash');

class ProductsControllers extends Controllers{
    async getProducts(req,res,next){
        try{
            const products=await DBController.getProducts();
            res.render("allProducts",{
                products,
                title:"All Products",
                message:req.flash('message'),
                error:req.flash('errror')
            });
    }
    catch(err){
        next(err)
    }
}
    async getProduct(req,res,next){
        try {
            const product=await DBController.getProduct(parseInt(req.params.id)).then(product=>{
                if(!product){
                    return this.error("This id is not defind",404);
                }
                res.render('product',{product})
            })
        } catch (error) {
            next(error);
        }
    }
    async insertProduct(req,res,next){
        try {
            const errors=validationResult(req)
            if(!errors.isEmpty()){
                const myErrors=errors.array().map(err=>err.msg);
                req.flash("errors",myErrors);
                return res.redirect('/');
            }
            const newProduct=async(product,price)=>{
                const [newProduct]=await Data.query(`insert into orders(product,price) values(?,?)`,[product,price]);
                return DBController.getProduct(newProduct.insertId);
            }
            await newProduct(req.body.product,req.body.price);
            req.flash('message','Your info is save');
            return res.redirect('/product/all');
            }
        catch (error) {
            next(error);
        }
    }
} 

module.exports=new ProductsControllers;