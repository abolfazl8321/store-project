const express=require('express');
const router=express.Router();
const ProductsControllers=require('../Controllers/productsController');
const ProductValidation = require('../Validation/ProductValidation');

router.get('/all',ProductsControllers.getProducts.bind(ProductsControllers));
router.get('/:id',ProductsControllers.getProduct.bind(ProductsControllers));
router.post('/new',ProductValidation.handle(),ProductsControllers.insertProduct.bind(ProductsControllers));

module.exports=router;