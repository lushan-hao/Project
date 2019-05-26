const Koa = require('koa');
const Router = require('koa-router');
let router = new Router();
const mongoose = require('mongoose');

router.post('/addcar', async (ctx) => {
    const Cart = mongoose.model('Cart');
    const cart = new Cart(ctx.request.body);
    await cart.save().then(() => {
        ctx.body = {
            code: 200,
            message: "添加成功"
        };
    }).catch(err => {
        console.log(err);
        ctx.body = {
            code: 500,
            message: err
        };
    })
});
router.post('/cutdata',async(ctx)=>{
    const Cart = mongoose.model('Cart');
    let data = ctx.request.body;
    let id = data.id;
    await Cart.remove({productId:id}).then(() => {
        ctx.body = {
            code: 200,
            message: "删除成功"
        };
}).catch(err => {
    console.log(err);
    ctx.body = {
        code: 500,
        message: err
    };
})
});




router.get('/getCar', async (ctx) => {
    const Cart = mongoose.model('Cart');
    await Cart.find({ userId: ctx.query.userId }).populate('productId').exec().then(res => {              //populate是为了联合查询
        ctx.body = res;
    });
});




module.exports = router;