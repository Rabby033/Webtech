const mongoose = require('mongoose')

const SupplyInfo=mongoose.Schema({
  orderid:String,
  customername:String,
  address:String,
  cartItems: Object,
  intotal:Number,
  date:String,
  status:String
  
})


module.exports = mongoose.model('supplyinfo', SupplyInfo)
