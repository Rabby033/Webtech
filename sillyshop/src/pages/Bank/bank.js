import React, { useEffect, useState } from 'react'
import axios from '../../axios'

export const Bank = () => {
  const [customer_name, setcustomer_name] = useState('')
  const [email, setEmail] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  const [Balance, setBalance] = useState('')

  const checkuser = e => {
    e.preventDefault()

    axios
      .post('/userinfo/check', { customer_name, email, accountNumber, Balance })
      .then(() => {
        setcustomer_name('')
        setEmail('')
        setAccountNumber('')
        setBalance('')
      })
      .catch(error => alert(error.message))
  }
  const [retriveuser, setretriveuser] = useState([])

    useEffect(() => {
      const fetchdata = async () => {
        const response = await axios.get('/userinfo/retrive')
        //  console.log(data)
        setretriveuser(response.data)
      }
      fetchdata()
    }, [])

  return (
    <div>
      <h1>Bank page</h1>
      <h3>New Customer Enboarding</h3>
      <form>
        <label>
          Name:
          <input
            type='text'
            value={customer_name}
            onChange={e => setcustomer_name(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Bank Account Number:
          <input
            type='number'
            value={accountNumber}
            onChange={e => setAccountNumber(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Balance:
          <input
            type='number'
            value={Balance}
            onChange={e => setBalance(e.target.value)}
            required
          />
        </label>
        <br />
        <button type='submit' onClick={checkuser}>
          Submit
        </button>
      </form>

      <h1>Our clients</h1>
      <table border={1}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Account Number</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {
            retriveuser.map((user, index) => (
            <tr key={index}>
              <td>{user.customer_name}</td>
              <td>{user.email}</td>
              <td>{user.accountNumber}</td>
              <td>{user.Balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
