const Koa = require('koa');
const Router = require('koa-router');
let router = new Router();
const mongoose = require('mongoose');
const fs = require('fs');
 //往数据库里面添加数据
router.get('/insertProductInfo', async (ctx) => {       
    fs.readFile('./data/product.json', 'utf8', (err, data) => {
        data = JSON.parse(data);                                //字符串转换为对象
        console.log(data);
        let count = 0; // 计数器
        const Product = mongoose.model('Product');                   //名字和模型里发布模型是相同的
        data.map((value, index) => {
            console.log(value);
            let product = new Product(value);
            // 随机生成类型 范围是1~8
            product.type = Math.floor(Math.random() * 8) + 1;
            product.save().then(() => {
                count++;
                console.log('成功' + count);
            }).catch(err => {
                console.log('失败啦:' + error);
            });
        });
    });
    ctx.body = '导入数据';
});


router.get('/getProductsByType', async (ctx) => {
    const Product = mongoose.model('Product');
    await Product.find({ type: ctx.query.typeId }).skip(parseInt(ctx.query.start)).limit(parseInt(ctx.query.limit)).exec().then(res => {
        ctx.body = res;
    })
});

router.get('/getDetail', async(ctx)=>{
    const Product = mongoose.model('Product');
    await Product.findOne({ _id: ctx.query.id}).exec().then(res =>{
        ctx.body = res;
    }).catch(res =>{
        ctx.body = res;
    })
})

module.exports = router;