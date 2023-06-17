import React, { useEffect, useState, useContext } from 'react'
import { Shopcontext } from '../../context/Shopcontext'
import { useLocation } from 'react-router-dom'
import axios from '../../axios'
import './payment.css'
import { Loading } from './Loading'
import image from '../../assets/order_confirm.png'
import Navbar from '../../components/Navbar'

export default function Payment () {
  const location = useLocation()
  const { amount } = location.state
  const status = 'Pending'
  const { cartItems, clearCart } = useContext(Shopcontext)

  const user_email = localStorage.getItem('email')
  // console.log(user_email);

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
  const [user_info, setuser_info] = useState('')

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
  const tid = generateTrackingId()
  // console.log(orderid);

  useEffect(() => {
    axios
      .get('/api/finduser', { params: { user_email } })
      .then(response => {
        const userData = response.data
        setuser_info(userData)

        setAccno(userData.account)
        setcustomername(userData.name)
        setaddress(userData.address)
        setemail(userData.email)
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }, [])

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

    setIsLoading(false) // Stop loading animation
  }

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
      .post('/order/confirm', {
        orderid,
        customername,
        accountnumber,
        cartItems,
        amount,
        address,
        status,
        date
      })
      .then(() => {
        axios
          .put('/transfermoney/tobank', { bankNo, updatedAmount })
          .then(() => {
            axios
              .put('/cutamountfrom/customer', { accno, amount })
              .then(() => {
                //make transaction
                const sender = accno
                const reciever = bankNo
                axios
                  .post('/transaction/money', { tid, sender, reciever, amount })
                  .then(() => {
                    // All API calls are successfully completed
                    // Set the success message
                    clearCart()
                    setSuccessMessage(
                      'Your order has been successfully placed.'
                    )
                    setIsLoading(false) // Stop loading animation
                  })
              })
              .catch(error => {
                setIsOrderFailed(true)
                alert(error.message)
                setIsLoading(false)

                // Stop loading animation
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
      <div>
        <Navbar/>
        <div className='image_card'>
          <img src={image} alt='Success' />
          <p>Thank you for being with us.</p>
          {/* Replace "success-image-url" with the URL of the success image */}
        </div>
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
      <Navbar />
      <div className='main'>
        {/* <h2>Your total cost: {amount}</h2> */}
        {!isSearchClicked && (
          <button onClick={search} className='btn'>
            Billing info
          </button>
        )}

        {isSearchClicked && userBalance > amount ? (
          <div className='proceed'>
            <h2>Current Balance: {userBalance}</h2>
            <div>
              <form>
                <div className='form-field'>
                  <label htmlFor='orderId'>Name</label>
                  <input type='text' value={customername} disabled />
                </div>
                <div className='form-field'>
                  <label htmlFor='customerName'>Email:</label>
                  <input type='text' id='customerName' value={email} disabled />
                </div>
                <div className='form-field'>
                  <label htmlFor='customerName'>Total:</label>
                  <input
                    type='text'
                    id='customerName'
                    value={amount}
                    disabled
                  />
                </div>
                <div className='form-field'>
                  <label htmlFor='address'>Address:</label>
                  <input type='text' id='address' value={address} disabled />
                </div>
                <button type='button' onClick={confirmOrder} className='btn'>
                  Confirm Order
                </button>
              </form>
            </div>

            {isSubmitClicked && !successMessage && (
              <p>You have failed to place the order.</p>
            )}
          </div>
        ) : (
          isSearchClicked && <p>Sorry!! You don't have enough balance</p>
        )}
      </div>
    </div>
  )
}
