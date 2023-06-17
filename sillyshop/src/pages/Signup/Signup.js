import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './signup.css';
import axios from '../../axios';
import Navbar from '../../components/Navbar';


export const Signup = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [account, setAccountNo] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate()



  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleAccountNoChange = (e) => {
    setAccountNo(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform form validation
    if (!email || !name || !password || !address || !account) {
      setError('All fields are required');
      return;
    }

    

    try {
      // Make the API request to create a new user
      const response = await axios.post('/api/signup', {email,name,password,address,account});
      

      if (response.statusText==="OK") {
        // User successfully created
        // const data = await response.json();
        console.log('User created');

        // Reset the form fields
        setEmail('');
        setName('');
        setPassword('');
        setAddress('');
        setAccountNo('');
        setError(null);
        navigate('/')
      } else {
        // Error creating user
        const errorData = await response.json();
        setError(errorData.message);
        
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again.');      
    }
  };

  return (
    <div>
      <Navbar/>
    <div className="signup-container">
      <div className="signup-background"></div>
      <div className="col-md-6">
        <h2 className="text-center mb-4">Signup</h2>
        <form onSubmit={handleSubmit}>
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="form-group">
            <label htmlFor="email"></label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="name"></label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={handleNameChange}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password"></label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Password"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="address"></label>
            <input
              type="text"
              className="form-control"
              id="address"
              value={address}
              onChange={handleAddressChange}
              placeholder="Your address"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="accountNo">Bank Account No:</label>
            <input
              type="number"
              className="form-control"
              id="account"
              value={account}
              onChange={handleAccountNoChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block">Signup</button>
        </form>
        <p>Already have an account? <Link to="/">login</Link></p>
      </div>
    </div>
    </div>
  );
};