const express=require('express');
const dashboardController = require('../Controllers/dashboardController');
const router=express.Router();

router.get('/',dashboardController.dashboard.bind(dashboardController));

module.exports=router;