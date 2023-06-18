const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const userinfo = require('./usermdl');
const Userinfo = require('./User_info');
const Orderinfo = require('./Order_info')
const SupplyInfo = require('./Supplier_order')
const Trans=require('./TransactionSchema')

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


app.post('/api/signup', async (req, res) => {
  const { email, name, password, address, account } = req.body;
  const newUser = new userinfo({
    email,
    name,
    password,
    account,
    address,
  });
  

  // Save the user to the database
  newUser.save()
    .then(() => {
      res.status(200).json({ message: 'Signup successful' });
    })
    .catch((error) => {
      console.error('Error saving user:', error);
      res.status(500).json({ message: 'Internal server error' });
    });
});


app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  console.log(email , password);

  try {
    // Find the user by email in the MongoDB collection
    
    const user = await userinfo.findOne({ email });
    console.log('User found:', user);
    // console.log(user.password);
    
    if (user===null) {
      // User does not exist
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }
    console.log(password);

    // Compare the provided password with the stored password
    const passwordMatch = password === user.password;
    console.log(user.password);

    if (passwordMatch) {
      // Passwords match, login successful
      res.json({ message: 'Login successful' });
    } else {
      // Passwords do not match
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.get('/api/supplyinfo', async (req, res) => {
  
  try {
    
    const entries = await SupplyInfo.find();
    res.json(entries);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

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
//api for finding userinfo of specific user using mail

app.get('/api/finduser', async (req, res) => {
  const { user_email } = req.query;
  try {
    const user = await userinfo.findOne({ email: user_email }); // Use findOne to search for a single user
    if (user) {
      res.json(user);
      // console.log(user)
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user information' });
  }
});



//user information retrive api for bank
app.get('/userinfo/retrive', async (req, res) => {
  try {
    const data = await Userinfo.find().exec()
    res.status(200).send(data)
  } catch (err) {
    res.status(500).send(err)
  }
})


//retrive all user api for shop admin
app.get('/customerinfo/retrive', async (req, res) => {
  try {
    const data = await userinfo.find().exec()
    res.status(200).send(data)
  } catch (err) {
    res.status(500).send(err)
  }
})

//find bank balance of sillyshop admin
app.get('/sillyshop/revenue', async (req, res) => {
  try {
    const user = await Userinfo.findOne({accountNumber:12345 }); // Use findOne to search for a single user
    if (user) {
      res.json(user);
      console.log(user)
    } else {
      res.status(404).json({ message: 'admins bank account not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user information' });
  }
});

//api for transaction of bank account
app.post('/transaction/money', async (req, res) => {
  const tsdetails = req.body
  // console.log(tsdetails)
  try {
    const data = await Trans.create(tsdetails)
    res.status(201).send(data)
    console.log('order stored successfully')
  } catch (err) {
    res.status(500).send(err.message)
  }
})

//retrive transaction details of bank
app.get('/transaction/details', async (req, res) => {
  // console.log("hey man")
  try {
    const data = await Trans.find().exec()
    console.log(data)
    res.status(200).send(data)
  } catch (err) {
    res.status(500).send(err)
  }
});


//status change to deivered
app.post('/api/delivered', async (req, res) => {
  console.log("hi deli");
  const {orderId } = req.body;
  console.log(orderId)
 try {
  const order = await SupplyInfo.findOne({ orderid:orderId })
  const aorder = await Orderinfo.findOne({ orderid:orderId })
   if (!order) {
      return res.status(404).json({ message: 'Order not found' });}
   order.status = 'Delivered'
   if(aorder)
    {
      
      aorder.status = 'Delivered';
      await aorder.save();
    }


   await order.save()
   
   console.log(order.status);

   res.status(200).json({ message: 'Order status updated to approved' })

 } catch (error) {
   console.error(error)
   res.status(500).json({ message: 'Internal server error' })
 }
})


app.post('/api/transfer', async (req, res) => {
  console.log("hi");
  const { fromAccount, toAccount, amount } = req.body;
  console.log(fromAccount,toAccount,amount);

  try {
    const adminAcc = await Userinfo.findOne({ accountNumber: fromAccount })
    const suppliarAcc = await Userinfo.findOne({ accountNumber: toAccount })
    
    adminAcc.Balance -= amount
    suppliarAcc.Balance += amount
    
    await adminAcc.save();
    await suppliarAcc.save();
    res.json({ message: 'Transfer completed successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Transfer failed' });
  }
});

app.post('/api/notifyorders', async (req, res) => {
  
  const { username} = req.body;

  try {
    const orders = await SupplyInfo.find({ customername : username , status: "Delivered"});
    console.log("notify9",username,orders);
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});




// Start the server
app.listen(port, () => {
  console.log('Server is running on port:', port)
})
