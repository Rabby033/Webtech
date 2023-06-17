import React from 'react'
import './payment.css'
import image  from '../../assets/order_confirm.png'
import Navbar from '../../components/Navbar'

export const Loading = () => {
  return (
    <div>
    <Navbar/>
    <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    <b className='loading'>Processing, please wait....</b>
    </div>
  )
}
