import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import './supplier.css';
import Navbar from '../../components/Navbar';

export const Supplier = () => {
  const [entries, setEntries] = useState([]);
  const [acceptedOrders, setAcceptedOrders] = useState([]);
  const [deliveredOrders, setDeliveredOrders] = useState([]);
  const [showNotification, setShowNotification] = useState(false);


  useEffect(() => {
    
    const fetchSupplyInfoEntries = async () => {
      try {
        const response = await axios.get('/api/supplyinfo');
        setEntries(response.data);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchSupplyInfoEntries();
  }, []);
  
  const handleAccept = async (entryId) => {
    setAcceptedOrders(prevOrders => [...prevOrders, entryId]);
    try {
      // Fetch the total amount of the corresponding order
      const entry1 = entries.find(entry => entry._id === entryId);
      var totalAmount=0;

      if (entry1) {
        totalAmount = entry1.intotal;
        console.log(totalAmount);
      }
  
      // Transfer the amount from bank account "12345" to "9090"
      const transferData = {
        fromAccount: "12345",
        toAccount: "9090",
        amount: totalAmount,
      };
  
      await axios.post('/api/transfer', transferData);
  
      // Perform any other necessary actions after successful transfer
      setShowNotification(true);

      // After a certain delay, hide the notification
      setTimeout(() => {
        setShowNotification(false);
      }, 500);
  
      console.log(`Amount ${totalAmount} transferred successfully.`);
    } catch (error) {
      console.log(error);
    }
  };
  

  const handleDeliver = async (entryId, orderId) => {
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 500);
    setDeliveredOrders(prevOrders => [...prevOrders, entryId]);
    try {
      await axios.post('/api/delivered', {orderId});
      
  
    } catch (error) {
      console.error(error);
    }
    console.log('Deliver clicked for entry:', orderId);
  };

  return (
    <div className="supplier-container">
      <Navbar/>
      <h2 className="text-center mb-4">Order list</h2>
      <div className={`notification ${showNotification ? 'show' : ''}`}>
        Success
      </div>

      <div className="card-container">
        {entries.map(entry => (
          !deliveredOrders.includes(entry._id) && entry.status !== "Delivered" &&(
          <div className="card" key={entry._id}>
            <h3>Client name: {entry.customername}</h3>
            <p>
              <span className="order-id">Order ID: {entry.orderid}</span>
              <span className="order-date">Order date: {entry.date}</span>
            </p>
            <p>Delivery address :  {entry.address}</p>
            <div>
              <p>Order details</p>
              <ul>
                {Object.entries(entry.cartItems).map(([itemId, quantity]) => (
                 quantity > 0 &&(
                  <li key={itemId}> {itemId === '1' ? 'iPhone 14' : itemId === '2' ? 'Guitar' : itemId}: {quantity} pieces</li>
                )))}
              </ul>
            </div>
            <h3>You will recieve {entry.intotal} tk to deliver this order.</h3>
            
            <div className="buttons-container">
                {!acceptedOrders.includes(entry._id) && (
                  <button className="accept-button" onClick={() => handleAccept(entry._id)}>Accept</button>
                )}
                {!deliveredOrders.includes(entry._id) && (
                  <button className="deliver-button" onClick={() => handleDeliver(entry._id, entry.orderid)}>Deliver</button>
                )}
              </div>
          </div>
        )))}
      </div>
    </div>
  );
};