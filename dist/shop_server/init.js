//通过mongoose连接数据库


const mongoose = require('mongoose');
const db = 'mongodb://47.94.5.58/shop';           //默认27017端口号，如果自定义在localhost后面




// 引入所有 schema
const glob = require('glob');                       //需要安装
const path = require('path');
exports.initSchemas = () => {
    glob.sync(path.resolve(__dirname, './model', '*.js')).forEach(require);
};

// 连接数据库方法
exports.connect = () => {
    // 连接数据库
    mongoose.connect(db, { useNewUrlParser: true });                      //use地址解析
    // 监听数据库连接
    mongoose.connection.on('disconnected', () => {                      //连接失败重新连接
        mongoose.connect(db);
    });
    // 数据库出现错误
    mongoose.connection.on('error', err => {
        console.log(err);
        mongoose.connect(db);
    });

    // 连接的时候
    mongoose.connection.once('open', () => {
        console.log('mongodb connected success');
    });
};