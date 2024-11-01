const Controllers=require('./Controllers');

class Dashboard extends Controllers{
    async dashboard(req,res,next){
            try {
                res.render('dashboard');
            } catch (error) {
                next(error);
            }
    }
}
module.exports=new Dashboard;