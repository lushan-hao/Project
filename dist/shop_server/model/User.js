const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({      
    useId: Schema.Types.ObjectId,
    userName: {unique:true, type:String},                //unique代表唯一的  
    password: String,
    createDate: {type:Date,default: Date.now()}
})

userSchema.pre('save', function(next){                               //每次保存之前
        // 随机生成salt   10 迭代次数
    bcrypt.genSalt(10,(err,salt)=>{                                     //密码加密                  
        if(err) return next(err);
        bcrypt.hash(this.password,salt, (err,hash)=>{
            // console.log(this.password);
            if(err) return next(err)
            this.password = hash;
            next();
        })
     })
});
userSchema.methods = {
    comparePassword: (_password, password) => {
        return new Promise((resolve, reject) => {
            // console.log(_password, password);
            bcrypt.compare(_password, password, (err, isMatch) => {
                if (!err) resolve(isMatch)
                else reject(err)
            })
        })
    }
};


//发布
mongoose.model('User',userSchema);