import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from '../../axios'

export default function Payment () {
  const location = useLocation()
  const { amount } = location.state

  const [accno, setAccno] = useState('')

  const [retriveuser, setretriveuser] = useState([])
  const [userBalance, setuserBalance] = useState(0)

  useEffect(() => {
    setuserBalance(userBalance)
  }, [userBalance])

  useEffect(() => {
    const fetchdata = async () => {
      const response = await axios.get('/userinfo/retrive')
      setretriveuser(response.data)
    }
    fetchdata()
    console.log(accno)
  }, [])

  const search = e => {
    e.preventDefault()
    const userinfo = retriveuser.find(
      user => user.accountNumber === parseInt(accno)
    )
    setuserBalance(userinfo.Balance)
  }

  return (
    <div>
      <h2>Your total cost: {amount} </h2>
      <label>
        Enter your account Number:
        <input
          type='number'
          value={accno}
          onChange={e => setAccno(e.target.value)}
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
          <button>Place order</button>
        </div>
      ) : (
        <p>Sorry!! You don't have enough balance</p>
      )}
    </div>
  )
}
