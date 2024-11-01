const Validation=require('./Validation');
const {check}=require('express-validator');
class ProductValidation extends Validation{
    handle(){
        return[
            check("product","The length of the product must be at least 5 characters").not().isEmpty()
            .isLength({min:5}),
            check("price","Please Fill Input price").not().isEmpty()
        ];
    };
};
module.exports=new ProductValidation;