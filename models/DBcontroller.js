const Data=require('./user');

class DBController{
    constructor(){
    }
    static async getProducts(){
        const [products]=await Data.query(`select * from orders`);
        return products;
    }
    static async getProduct(id){
        const [product]=await Data.query(`select product,price from orders where order_id=?`,[id]);
        return product;
    }
    static async getProductByProduct(product) {
        const [result]=await Data.query(`select * from orders where product=?`,[product]);
        return result[0];
    }
    static async updateProduct(id,product,price){
        const [result]=await Data.query(`update orders set product=?,price=? where order_id=?`,[product,price,id]);
        return this.getProduct(id);
    }
    static async deleteProduct(id){
        const result=await Data.query(`delete from orders where order_id=?`,[id]);
        return id;
    }
}
module.exports=DBController;