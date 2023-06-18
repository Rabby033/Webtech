import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart } from 'phosphor-react'
import { AiOutlineBell } from 'react-icons/ai'
import './navbar.css'
import axios from '../axios'
import logoImage from '../assets/logo.jpg'

export default function Navbar () {
  const [dropdownVisible, setDropdownVisible] = useState(false)
  const user_email = localStorage.getItem('email')
  const [username, setusername] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const [notifications, setNotifications] = useState([])
  // console.log(user_email)

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible)
  }
  const navigate = useNavigate() // Move the useNavigate hook here
  const logout = () => {
    localStorage.setItem('email', 'bal')
    navigate('/')
  }

  useEffect(() => {
    axios
      .get('/api/finduser', { params: { user_email } })
      .then(response => {
        const userData = response.data
        setusername(userData.name)
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }, [])

  useEffect(() => {
    console.log('aj', username)
    fetchNotifications()
  }, [username])

  const fetchNotifications = async () => {
    try {
      const response = await axios.post('/api/notifyorders', { username })
      setNotifications(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const toggleDropdown2 = () => {
    setShowDropdown(prevShowDropdown => !prevShowDropdown)
  }

  const ClickableNotificationIcon = () => {
    return (
      <div className='notification-icon-wrapper' onClick={toggleDropdown2}>
        <AiOutlineBell size={24} />
      </div>
    )
  }

  const NotificationDropdown = ({ notifications }) => {
    return (
      <div className='notification-dropdown'>
        <div className='notification-dropdown-header'>
          <h3>Notifications</h3>
        </div>
        <ul className='notification-dropdown-list'>
          {notifications.map(notification => (
            <li className='notification-dropdown-item' key={notification._id}>
              <p className='order-id'>Order ID: {notification.orderid}</p>
              <p className='order-date'>Order date: {notification.date}</p>
              <p className='order-money'>
                Amount: <span>{(5 / 4) * notification.intotal}</span>
              </p>
              <p className='order-details'>
                Order status: {notification.status}
              </p>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <div className='navbar'>
      <div className='logo'>
        <div>
          <p className='name'>Sillyshop</p>
        </div>
      </div>
      <div className='links'>
        {user_email !== 'admin@gmail.com' &&
          user_email !== 'supplier@gmail.com' &&
          user_email != 'bal' && (
            <div className='notification-icon'>
              <ClickableNotificationIcon />
              {showDropdown && (
                <NotificationDropdown notifications={notifications} />
              )}
            </div>
          )}
        <Link to='/shop'>Shop</Link>
        <Link to='/cart'>
          <ShoppingCart size={32} />
        </Link>
        {/* Conditionally render the username dropdown */}
        {user_email !== 'admin@gmail.com' &&
          user_email !== 'supplier@gmail.com' &&
          user_email != 'bal' && (
            <div>
              <div className='dropdown'>
                <button onClick={toggleDropdown} className='username'>
                  {username}
                </button>
                {dropdownVisible && (
                  <div className='dropdown-content'>
                    <button onClick={logout}>Logout</button>
                  </div>
                )}
              </div>
            </div>
          )}
        {/* {user_email === 'admin@gmail.com' && (
          <div className='dropdown'>
            <button onClick={toggleDropdown} className='username'>
              admin
            </button>
            {dropdownVisible && (
              <div className='dropdown-content'>
                <button onClick={logout}>Logout</button>
              </div>
            )}
          </div>
        )} */}
        {/* {user_email === 'supplier@gmail.com' && (
          <div className='dropdown'>
            <button onClick={toggleDropdown} className='username'>
              supplier
            </button>
            {dropdownVisible && (
              <div className='dropdown-content'>
                <button onClick={logout}>Logout</button>
              </div>
            )}
          </div>
        )} */}
      </div>
    </div>
  )
}
