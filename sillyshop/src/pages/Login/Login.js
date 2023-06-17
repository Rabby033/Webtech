import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './login.css'
import axios from '../../axios'
import { Shopcontext } from '../../context/Shopcontext'
import Navbar from '../../components/Navbar'

export const Login = () => {
  const { addEmail } = useContext(Shopcontext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [role, setRole] = useState('user')
  const navigate = useNavigate()

  const handleEmailChange = e => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = e => {
    setPassword(e.target.value)
  }

  const handleRoleChange = e => {
    setRole(e.target.value)
  }

  const handleSubmit = async e => {
    e.preventDefault()

    // Perform form validation
    if (!email || !password) {
      setError('Email and password are required')
      return
    }
    console.log('out')

    if (role === 'admin') {
      if (email === 'admin@gmail.com' && password === 'ab12') {
        localStorage.setItem('email', email)
        navigate('/admin')
      } else {
        setError('Wrong password/Email')
      }
    }

    if (role === 'supplier') {
      if (email === 'supplier@gmail.com' && password === '1234') {
        localStorage.setItem('email', email)
        navigate('/supplier')
        return
      } else {
        setError('Wrong password/Email')
        return
      }
    }

    // Create the user object
    const userData = {
      email,
      password
    }

    try {
      // Make the API request to login
      // setError('');
      const response = await axios.post('/api/login', {
        email,
        password
      })

      if (response.statusText === 'OK') {
        // Login successful
        // const data = await response.json();
        console.log('Login successful:')
        // console.log(email);

        // Reset the form fields
        setEmail('')
        setPassword('')
        setError('')

        localStorage.setItem('email', email)
        navigate('/shop')
      } else {
        // Error logging in
        localStorage.setItem('email', 'bal')
        console.log(response.statusText)
        const errorData = await response.json()
        setError(errorData.message)
      }
    } catch (error) {
      // localStorage.setItem('email', "bal");
      console.error('Error:', error)
      setError('Wrong password/Email')
    }
  }

  return (
    <div>
      <Navbar />
      <div className='login-container'>
        <div className='login-background'></div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='role'>Login as:</label>
            <select id='role' value={role} onChange={handleRoleChange}>
              <option value='admin'>Admin</option>
              <option value='supplier'>Supplier</option>
              <option value='user'>User</option>
            </select>
          </div>
          <div className='form-group'>
            <label htmlFor='email'></label>
            <input
              type='email'
              id='email'
              value={email}
              onChange={handleEmailChange}
              placeholder='Enter your email'
            />
          </div>
          <div className='form-group'>
            <label htmlFor='password'></label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={handlePasswordChange}
              placeholder='Enter your password'
            />
          </div>
          <button type='submit' className='btn-primary'>
            Login
          </button>
          <p>
            New user? <Link to='/signup'>Sign up</Link>
          </p>
        </form>
        {error && <p className='error-message'>{error}</p>}
      </div>
    </div>
  )
}
