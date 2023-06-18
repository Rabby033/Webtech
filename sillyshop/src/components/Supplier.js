import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart } from 'phosphor-react'
import './navbar.css'
import axios from '../axios'
import logoImage from '../assets/logo.jpg';

export default function Navbar () {
  return (
    <div className='navbar'>
      <div className='logo'>
       <div>
          <p className='bal'>Sillyshop Supplier</p>
       </div>
      </div>
    </div>
  )
}
