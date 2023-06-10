const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const Userinfo = require('./User_info')
const Orderinfo = require('./Order_info')
const SupplyInfo = require('./Supplier_order')

const app = express()
const port = 3005

// Connection URL
const url =
  'mongodb+srv://rabby11011:rabby123@cluster0.chyecsy.mongodb.net/sillyshop?retryWrites=true&w=majority'

// Connect to MongoDB
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to MongoDB successfully!')
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error)
  })

// Middleware
app.use(express.json())
app.use(cors())

//add new bank account api
app.post('/userinfo/check', async (req, res) => {
  const userdetails = req.body
  console.log(userdetails)
  try {
    const data = await Userinfo.create(userdetails)
    res.status(201).send(data)
    console.log('data stored successfully')
  } catch (err) {
    res.status(500).send(err.message)
  }
})

// make order api
app.post('/order/confirm', async (req, res) => {
  const orderdetails = req.body
  // console.log(orderdetails);
  try {
    const data = await Orderinfo.create(orderdetails)
    res.status(201).send(data)
    console.log('order stored successfully')
  } catch (err) {
    res.status(500).send(err.message)
  }
})

//order details retrive api for sillyshop admin
app.get('/order/details', async (req, res) => {
  try {
    const data = await Orderinfo.find().exec()
    res.status(200).send(data)
  } catch (err) {
    res.status(500).send(err)
  }
})

//api to transfer money from Customer to Bank
app.put('/transfermoney/tobank', async (req, res) => {
  const { bankNo, updatedAmount } = req.body
  console.log('i am in transfer money api')

  try {
    const user = await Userinfo.findOne({ accountNumber: 12345 })

    if (!user) {
      return res.status(404).json({ message: 'Bank account not found' })
    }

    user.Balance = updatedAmount
    await user.save()
    res.json({ message: 'Balance updated successfully', user })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

//api for confirm order from admin to supplier
app.post('/adminorder/confirm', async (req, res) => {
  const orderdetails = req.body
  console.log(orderdetails)
  try {
    const data = await SupplyInfo.create(orderdetails)
    res.status(201).send(data)
    console.log('order stored successfully')
  } catch (err) {
    res.status(500).send(err.message)
  }
})

//api for editing the status from pending to approved
app.put('/adminorder/status', async (req, res) => {
   const id = req.body.orderid;
   console.log(id)
  try {
    const order = await Orderinfo.findOne({ orderid:id })
    order.status = 'Approved'

    await order.save()

    res.status(200).json({ message: 'Order status updated to approved' })

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

//api for reducing money from customer
app.put('/cutamountfrom/customer', async (req, res) => {
  const UserAccount = req.body.accno
  const Amount = req.body.amount
  try {
    const customer = await Userinfo.findOne({ accountNumber: UserAccount })

    if (!customer) {
      return res.status(400).json({ message: 'Customer account not found' })
    }

    customer.Balance -= Amount
    await customer.save()
    res.json({ message: 'Reducing money from customer account is successfull' })
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .json({ message: 'Reducing money from customer account is successfull' })
  }
})

//user information retrive api for bank
app.get('/userinfo/retrive', async (req, res) => {
  try {
    const data = await Userinfo.find().exec()
    res.status(200).send(data)
  } catch (err) {
    res.status(500).send(err)
  }
})

// Start the server
app.listen(port, () => {
  console.log('Server is running on port:', port)
})
