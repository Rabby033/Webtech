const mongoose = require('mongoose')

const OrderInfo = mongoose.Schema({
  email: String,
  accno: Number,
  amount: Number,
  date: String
})

module.exports = mongoose.model('orderinfo', OrderInfo)
