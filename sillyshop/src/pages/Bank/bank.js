import React, { useEffect, useState } from 'react'
import axios from '../../axios'
import Navbar from '../../components/BankNavbar'
import './Bank.css'

export const Bank = () => {
  const [customer_name, setcustomer_name] = useState('')
  const [email, setEmail] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  const [Balance, setBalance] = useState('')
  const [retriveuser, setretriveuser] = useState([])
  const [tran,settran]=useState([])

  useEffect(() => {
    const fetchdata = async () => {
      const response = await axios.get('/userinfo/retrive')
      const tran_response=await axios.get('/transaction/details')
      setretriveuser(response.data)
      settran(tran_response.data)
      //  console.log(tran_response.data)
    }
    fetchdata()
  }, [])

  const [balanceVisibility, setBalanceVisibility] = useState({})

  const toggleBalanceVisibility = index => {
    setBalanceVisibility(prevState => ({
      ...prevState,
      [index]: !prevState[index]
    }))
  }

  return (
    <div>
      <Navbar />
      <div className='container'>
        <div className='carder'>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Account No</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {retriveuser.map((user, index) => (
                <tr key={index}>
                  <td>{user.customer_name}</td>
                  <td>{user.email}</td>
                  <td>{user.accountNumber}</td>
                  <td onClick={() => toggleBalanceVisibility(index)}>
                    <b>{balanceVisibility[index] ? user.Balance : '*****'}</b>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='carder'>
          <table>
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Sender Ac</th>
                <th>Reciever Ac</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {tran.map((user, index) => (
                <tr key={index}>
                  <td>{user.tid}</td>
                  <td>{user.sender}</td>
                  <td>{user.reciever}</td>
                  <td>{user.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
