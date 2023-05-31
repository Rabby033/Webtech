const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Userinfo = require('./User_info');

const app = express();
const port = 3005;

// Connection URL
const url =
  'mongodb://rabby11011:rabby123@ac-1t537zc-shard-00-00.chyecsy.mongodb.net:27017,ac-1t537zc-shard-00-01.chyecsy.mongodb.net:27017,ac-1t537zc-shard-00-02.chyecsy.mongodb.net:27017/sillyshop?ssl=true&replicaSet=atlas-4sjq8m-shard-0&authSource=admin&retryWrites=true&w=majority';

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
