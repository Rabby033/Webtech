const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Userinfo = require('./User_info');
const Orderinfo = require('./Order_info');

const app = express();
const port = 3005;

// Connection URL
const url =
  'mongodb+srv://rabby11011:rabby123@cluster0.chyecsy.mongodb.net/sillyshop?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB successfully!');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Middleware
app.use(express.json());
app.use(cors());

//add user api

app.post('/userinfo/check', async (req, res) => {
  const userdetails = req.body;
  console.log(userdetails);
  try {
    const data = await Userinfo.create(userdetails);
    res.status(201).send(data);
    console.log("data stored successfully");
  } catch (err) { 
    res.status(500).send(err.message);
  }
});

// order api
app.post('/order/confirm', async (req, res) => {
  const orderdetails = req.body;
  console.log(orderdetails);
  try {
    const data = await Orderinfo.create(orderdetails);
    res.status(201).send(data);
    console.log("order stored successfully");
  } catch (err) { 
    res.status(500).send(err.message); 
  }
});

//order details retrive api for sillyshop admin
app.get('/order/details', async (req, res) => {
  try {
    const data = await Orderinfo.find().exec();
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});


//user information retrive api for bank
app.get('/userinfo/retrive', async (req, res) => {
  try {
    const data = await Userinfo.find().exec();
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Start the server
app.listen(port, () => {
  console.log('Server is running on port:', port);
});
