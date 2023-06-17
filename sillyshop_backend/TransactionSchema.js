const mongoose = require('mongoose')

const Transaction=mongoose.Schema({
  tid:String,
  sender:Number,
  reciever:Number,
  amount:Number 
})

module.exports = mongoose.model('transaction', Transaction)
