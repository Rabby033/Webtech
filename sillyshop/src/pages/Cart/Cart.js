import React, { useContext } from 'react'
import { products } from '../../products'
import { Shopcontext } from '../../context/Shopcontext'
import { CartItem } from './CartItem'
import { Link, useNavigate } from 'react-router-dom'

export const Cart = () => {
  const { cartItems, getTotalAmount } = useContext(Shopcontext)
  const totalamount = getTotalAmount()

  const navigate = useNavigate()

  const handleCheckout = () => {
    navigate('/payment', { totalAmount: totalamount })
  }

  return (
    <div className='cart'>
      <div>
        <h1>Your Cart items</h1>
      </div>
      <div className='cartItems'>
        {products.map(product => {
          if (cartItems[product.id] > 0) return <CartItem data={product} />
        })}
      </div>
      {totalamount > 0 ? (
        <dib className='checkout'>
          <p>Subtotal: ${totalamount}</p>
          <button onClick={() => navigate('/')}>Continue Shopping</button>

          <Link to='/payment' state={{ amount: totalamount }}>
            <button>Checkout</button>
          </Link>
        </dib>
      ) : (
        <h1>Your card is empty</h1>
      )}
    </div>
  )
}
