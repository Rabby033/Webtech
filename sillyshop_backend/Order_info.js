const mongoose = require('mongoose')

const OrderInfo=mongoose.Schema({
  orderid:String,
  customername:String,
  accountnumber:Number,
  cartItems: Object,
  amount:Number,
  address:String,
  status:String,
  date:String
})


module.exports = mongoose.model('orderinfo', OrderInfo)
