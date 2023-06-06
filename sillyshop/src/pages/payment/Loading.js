import React from 'react'
import './payment.css'
import image  from '../../assets/order_confirm.png'

export const Loading = () => {
  return (
    <div>
    <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    <b className='loading'>Processing, please wait....</b>
    </div>
  )
}
