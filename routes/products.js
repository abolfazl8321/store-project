const express=require('express');
const router=express.Router();
const ProductsControllers=require('../Controllers/productsController');
const ProductValidation = require('../Validation/ProductValidation');

//These routers are for control RestfulApi

router.get('/all',ProductsControllers.getProducts.bind(ProductsControllers));
router.get('/:id',ProductsControllers.getProduct.bind(ProductsControllers));
router.post('/new',ProductValidation.handle(),ProductsControllers.insertProduct.bind(ProductsControllers));
router.put('/:id',ProductsControllers.updateProduct.bind(ProductsControllers));
router.delete('/:id',ProductsControllers.deleteProduct.bind(ProductsControllers));
module.exports=router;