import React, { useEffect, useState, useContext } from 'react'
import { Shopcontext } from '../../context/Shopcontext'
import { useLocation } from 'react-router-dom'
import axios from '../../axios'
import './payment.css'
import { Loading } from './Loading'
import image from '../../assets/order_confirm.png'

export default function Payment () {
  const location = useLocation()
  const { amount } = location.state
  const status = 'Pending'
  const { cartItems } = useContext(Shopcontext)

  const [accno, setAccno] = useState(0)
  const [retriveuser, setretriveuser] = useState([])
  const [userBalance, setuserBalance] = useState(0)
  const [email, setemail] = useState('')
  const [bankBalance, setbankBalance] = useState(0)
  const [successMessage, setSuccessMessage] = useState('')
  const [isSubmitClicked, setIsSubmitClicked] = useState(false)
  const [isSearchClicked, setIsSearchClicked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isOrderFailed, setIsOrderFailed] = useState(false)
  const [customername, setcustomername] = useState('')
  const [address, setaddress] = useState('')

  //generate TrackinId
  function generateTrackingId () {
    const timestamp = Date.now().toString() // Generate a timestamp
    const random = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, '0') // Generate a random number and pad it with leading zeros
    const trackingId = `ID-${timestamp}-${random}` // Combine the components with desired separators
    return trackingId
  }
  const orderid = generateTrackingId()
  // console.log(orderid);

  useEffect(() => {
    const fetchdata = async () => {
      const response = await axios.get('/userinfo/retrive')
      setretriveuser(response.data)
    }
    fetchdata()
  }, [])

  const search = e => {
    e.preventDefault()
    setIsSearchClicked(true)
    setIsLoading(true) // Start loading animation
    const userinfo = retriveuser.find(
      user => user.accountNumber === parseInt(accno)
    )
    setuserBalance(userinfo.Balance)

    // Retrieve current amount in bank account
    const bankinfo = retriveuser.find(user => user.accountNumber === 12345)
    setbankBalance(bankinfo.Balance)
    console.log(bankBalance)
    setIsLoading(false) // Stop loading animation
  }

  // store data
  const confirmOrder = e => {
    e.preventDefault()
    const date = new Date().toLocaleDateString()
    const bankNo = 12345
    const accountnumber = accno


    setIsSubmitClicked(true)
     setIsLoading(true) // Start loading animation

    const updatedAmount = bankBalance + amount
    console.log(updatedAmount)
    axios
      .post('/order/confirm', { orderid, customername,  accountnumber,cartItems, amount,address,status,date })
      .then(() => {
        axios
          .put('/transfermoney/tobank', { bankNo, updatedAmount })
          .then(() => {
            axios
              .put('/cutamountfrom/customer', { accno, amount })
              .then(() => {
                // All API calls are successfully completed
                // Set the success message
                setSuccessMessage('Your order has been successfully placed.')
                setIsLoading(false) // Stop loading animation
              })
              .catch(error => {
                setIsOrderFailed(true)
                alert(error.message)
                setIsLoading(false) // Stop loading animation
              })
          })
          .catch(error => {
            setIsOrderFailed(true)
            alert(error.message)
            setIsLoading(false) // Stop loading animation
          })
      })
      .catch(error => {
        setIsOrderFailed(true)
        alert(error.message)
        setIsLoading(false) // Stop loading animation
      })
  }

  if (isLoading) {
    return <Loading />
  }

  if (isSubmitClicked && successMessage) {
    return (
      <div className='image_card'>
        <img src={image} alt='Success' />
        <p>Thank you for being with us.</p>
        {/* Replace "success-image-url" with the URL of the success image */}
      </div>
    )
  }

  if (isSubmitClicked && isOrderFailed) {
    return (
      <div>
        <img src='failure-image-url' alt='Failure' />{' '}
        {/* Replace "failure-image-url" with the URL of the failure image */}
        <p>You have failed to place the order.</p>
      </div>
    )
  }

  return (
    <div>
      <h2>Your total cost: {amount}</h2>
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
      {isSearchClicked && userBalance > amount ? (
        <div>
          <h2>Current Balance: {userBalance}</h2>
          <form>
            <label>
              CustomerName:
              <input
                type='text'
                value={customername}
                onChange={e => setcustomername(e.target.value)}
                required
              />
            </label>
            <br />
            <label>
              Address:
              <input
                type='text'
                value={address}
                onChange={e => setaddress(e.target.value)}
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
          {isSubmitClicked && !successMessage && (
            <p>You have failed to place the order.</p>
          )}
        </div>
      ) : (
        isSearchClicked && <p>Sorry!! You don't have enough balance</p>
      )}
    </div>
  )
}
