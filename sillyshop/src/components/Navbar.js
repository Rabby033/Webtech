import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart } from 'phosphor-react'
import './navbar.css'
import axios from '../axios'

export default function Navbar () {
  const [dropdownVisible, setDropdownVisible] = useState(false)
  const user_email = localStorage.getItem('email')
  const [username, setusername] = useState('')
  console.log(user_email)

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

  return (
    <div className='navbar'>
      <div className='links'>
        <Link to='/shop'>Shop</Link>
        <Link to='/cart'>
          <ShoppingCart size={32} />
        </Link>
        {/* Conditionally render the username dropdown */}
        {user_email !== 'admin@gmail.com' &&
          user_email !== 'supplier@gmail.com' && user_email!='bal' && (
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
          )}
        {user_email === 'admin@gmail.com' && (
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
        )}
        {user_email === 'supplier@gmail.com' && (
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
        )}
      </div>
    </div>
  )
}
