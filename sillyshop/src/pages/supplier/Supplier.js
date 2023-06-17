import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import './supplier.css';
import Navbar from '../../components/Navbar';

export const Supplier = () => {
  const [entries, setEntries] = useState([]);
  

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
  
  const handleAccept = (entryId) => {
    // Handle the Accept button click for the specific entry
    console.log('Accept clicked for entry:', entryId);
  };

  const handleDeliver = (entryId) => {
    // Handle the Deliver button click for the specific entry
    console.log('Deliver clicked for entry:', entryId);
  };

  return (
    <div>
      <Navbar/>
    <div className="supplier-container">
      <h2 className="text-center mb-4">Order list</h2>
      <div className="cardd-container">
        {entries.map(entry => (
          <div className="cardd" key={entry._id}>
            <h3>Client name: {entry.customername}</h3>
            <p>
              <span className="order-id">Order ID: {entry.orderid}</span>
              <span className="order-date">Order date: {entry.date}</span>
            </p>
            <p>Delivery address: {entry.address}</p>
            <div>
              <p>Order details</p>
              <ul>
                {Object.entries(entry.cartItems).map(([itemId, quantity]) => (
                 quantity > 0 &&(
                  <li key={itemId}>{quantity}: {itemId === '1' ? 'iPhone 14' : itemId === '2' ? 'Guitar' : itemId}</li>
                )))}
              </ul>
            </div>
            <h3>Your money: {entry.intotal}</h3>
            
            <div className="buttons-container">
              <button className="accept-button" onClick={() => handleAccept(entry._id)}>Accept</button>
              <button className="deliver-button" onClick={() => handleDeliver(entry._id)}>Deliver</button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};