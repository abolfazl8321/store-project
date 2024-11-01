//this file for controll routers of my store
const express=require('express');
const router=express.Router();
const productRouter=require('./products');
const config = require('../config');
const authRouter=require('./auth')

//this rout for handle wrong routs
router.use('/auth',authRouter);
router.use('/product',productRouter);

router.all('*',(req,res,next)=>{
    try {
        const err=new Error(`This Request Is Not Defind`);
        err.status=404;
        throw err;
    } catch (err) {
        next(err)
    }
});
router.use((err,req,res,next)=>{
    const code=err.status || 500;
    const message=err.message || "";
    const stack=err.stack || "";

    if(config.debug){
        return res.render('errors/error',{message,stack});
    }else{
        return res.render(`errors/status${code}`,{message});
    }
})
module.exports=router;
