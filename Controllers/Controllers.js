class Controllers{
    constructor(){
    }
    error(message,status){
        const err=new Error(message);
        err.status=status;
        throw err;
    }
}
module.exports=Controllers;