import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from '../../axios';

export default function Payment() {
  const location = useLocation();
  const { amount } = location.state;

  const [accno, setAccno] = useState(0);
  const [retriveuser, setretriveuser] = useState([]);
  const [userBalance, setuserBalance] = useState(0);
  const [email, setemail] = useState('');
  //  const [date, setDate] = useState('');

  useEffect(() => {
    setuserBalance(userBalance);
  }, [userBalance]);

  useEffect(() => {
    const fetchdata = async () => {
      const response = await axios.get('/userinfo/retrive');
      setretriveuser(response.data);
    };
    fetchdata();
  }, []);

  const search = (e) => {
    e.preventDefault();
    const userinfo = retriveuser.find(
      (user) => user.accountNumber === parseInt(accno)
    );
    setuserBalance(userinfo.Balance);
  };
  
  // store data 
  const confirmOrder = e => {
    e.preventDefault()
    const date = new Date().toISOString();
    axios
      .post('/order/confirm', {email,accno,amount,date})
      .then(() => {
      })
      .catch(error => alert(error.message))
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
      {search && (
        <div>
          <h2>Current Balance: {userBalance}</h2>
        </div>
      )}
      {userBalance > amount ? (
        <div>
          <p>You can buy this,</p>
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
            {/* <label>
              Date:
              <input
                type='text'
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </label>
            <br /> */}
            <button type='submit' onClick={confirmOrder}>
              Submit
            </button>
          </form>
        </div>
      ) : (
        <p>Sorry!! You don't have enough balance</p>
      )}
    </div>
  );
}
