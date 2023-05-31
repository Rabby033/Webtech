const mongoose=require('mongoose')

const UserInfo=mongoose.Schema({
   customer_name:String,
   email:String,
   accountNumber:Number,
   Balance:Number
});

module.exports=mongoose.model('userinfo',UserInfo);