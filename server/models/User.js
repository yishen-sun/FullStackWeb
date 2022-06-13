const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const { Schema } = mongoose; 和上面效果一样，Schema是mongoose的一个属性
const userSchema = new Schema({
    googleId: String
});

// a new collection/class: users, using userSchema
mongoose.model('users', userSchema); // 两个参数表示把schema加载到collection load in