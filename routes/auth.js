const express=require('express');
const authController = require('../Controllers/authController');
const router=express.Router();


router.get('/register', authController.registerForm.bind(authController));
router.get('/login',authController.loginForm.bind(authController));
router.post('/login',authController.login.bind(authController));
router.post('/register',authController.register.bind(authController));

module.exports=router;