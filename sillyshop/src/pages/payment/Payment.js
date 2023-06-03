import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from '../../axios';
import  './payment.css'
import {Loading} from './Loading'

export default function Payment() {
  const location = useLocation();
  const { amount } = location.state;

  const [accno, setAccno] = useState(0);
  const [retriveuser, setretriveuser] = useState([]);
  const [userBalance, setuserBalance] = useState(0);
  const [email, setemail] = useState('');
  const [bankBalance, setbankBalance] = useState(0);
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchdata = async () => {
      const response = await axios.get('/userinfo/retrive');
      setretriveuser(response.data);
    };
    fetchdata();
  }, []);

  const search = (e) => {
    e.preventDefault();
    setIsSearchClicked(true);
    setIsLoading(true); // Start loading animation
    const userinfo = retriveuser.find(
      (user) => user.accountNumber === parseInt(accno)
    );
    setuserBalance(userinfo.Balance);

    //retrive current amount in bank account
    const bankinfo = retriveuser.find(
      (user) => user.accountNumber === 12345
    );
    setbankBalance(bankinfo.Balance);
    console.log(bankBalance);
    setIsLoading(false); // Stop loading animation
  };

  // store data
  const confirmOrder = (e) => {
    e.preventDefault();
    setIsSubmitClicked(true);
    setIsLoading(true); // Start loading animation
    const date = new Date().toLocaleDateString();
    const bankNo = 12345;
    const User_account_no = accno;
    const updatedAmount = bankBalance + amount;
    console.log(updatedAmount);
    axios
      .post('/order/confirm', { email, accno, amount, date })
      .then(() => {
        axios
          .put('/transfermoney/tobank', { bankNo, updatedAmount })
          .then(() => {
            axios
              .put('/cutamountfrom/customer', { accno, amount })
              .then(() => {
                // All API calls are successfully completed
                // Set the success message
                setSuccessMessage('Your order has been successfully placed.');
                setIsLoading(false); // Stop loading animation
              })
              .catch((error) => {
                alert(error.message);
                setIsLoading(false); // Stop loading animation
              });
          })
          .catch((error) => {
            alert(error.message);
            setIsLoading(false); // Stop loading animation
          });
      })
      .catch((error) => {
        alert(error.message);
        setIsLoading(false); // Stop loading animation
      });
  };

  if (isLoading) {
    return <Loading/>;
  }

  if (isSubmitClicked && successMessage) {
    return (
      <div>
        <p >{successMessage}</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Your total cost: {amount} </h2>
      <label>
        Enter your account Number:
        <input
          type='number'
          value={accno}
          onChange={(e) => setAccno(e.target.value)}
          required
        />
      </label>
      <button onClick={search}>Search</button>
      {isSearchClicked && userBalance > amount ? (
        <div>
          <h2>Current Balance: {userBalance}</h2>
          <form>
            <label>
              Email:
              <input
                type='email'
                value={email}
                onChange={(e) => setemail(e.target.value)}
                required
              />
            </label>
            <br />
            <button
              type='submit'
              onClick={confirmOrder}
              disabled={isSubmitClicked}
            >
              Submit
            </button>
          </form>
          {isSubmitClicked && !successMessage && <p>You are failed</p>}
        </div>
      ) : (
        isSearchClicked && <p>Sorry!! You don't have enough balance</p>
      )}
    </div>
  );
}
