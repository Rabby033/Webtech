import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import './details.css'
import { products } from '../../products'
import { Single_product } from './Single_product'
import axios from './../../axios'
import { Loading } from '../payment/Loading'

export const Details = () => {
  const location = useLocation()
  const { order } = location.state
  const selected_items = order.cartItems
  const { customername, address, cartItems, orderid, amount } = order
  const [isLoading, setIsLoading] = useState(false)

  let intotal = parseInt(amount * 0.8)

  const status = 'Pending'
  const date = new Date().toLocaleDateString()
  console.log(date)

  const confirm_order = e => {
    e.preventDefault()
    setIsLoading(true)
    axios
      .post('/adminorder/confirm', {
        orderid,
        customername,
        address,
        cartItems,
        intotal,
        date,
        status
      })
      .then(() => {
        axios
          .put('/adminorder/status', { orderid })
          .then(() => {
            setIsLoading(false)
          })
          .catch(error => alert(error.message))
      })
      .catch(error => alert(error.message))
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <div>
      <h3 className='title'> Order Details </h3>
      <div className='container'>
        <div className='cart-section'>
          <div className='cartItems'>
            {products.map(product => {
              if (selected_items[product.id] > 0)
                return (
                  <Single_product
                    data={product}
                    data2={selected_items}
                    data3={order}
                  />
                )
            })}
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <p style={{ fontSize: '18px' }}>PaidAmount= {order.amount}</p>
          </div>
        </div>
        <div className='infoitem'>
          <form className='info-form'>
            <b>Order Id</b>
            <input
              type='text'
              value={order.orderid}
              className='levelname'
              disabled
            />
            <br />
            <b>Customer Name</b>
            <input
              type='text'
              id='customerName'
              value={order.customername}
              disabled
              className='levelname'
            />
            <br />
            <b>Address</b>
            <input
              type='text'
              value={order.address}
              disabled
              className='levelname'
            />
            <br />
            <b>Payment Status</b>
            <input type='text' value='Paid' disabled className='levelname' />
            <br />
            <b>Order Date</b>
            <input
              type='text'
              value={order.date}
              disabled
              className='levelname'
            />
            <br />

            <button type='button' onClick={confirm_order}>
              Procced to supplier
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
