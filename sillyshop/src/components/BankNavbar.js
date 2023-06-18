import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart } from 'phosphor-react'
import './navbar.css'
import axios from '../axios'
import logoImage from '../assets/logo.jpg';

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
      <div className='logo'>
       <div>
          <p className='bal'>Sillyshop Bank</p>
       </div>
      </div>
    </div>
  )
}
