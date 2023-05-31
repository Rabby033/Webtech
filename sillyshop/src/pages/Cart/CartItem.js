import React, { useContext } from 'react'
import cart from './cart.css'
import { Shopcontext } from '../../context/Shopcontext'

export const CartItem = props => {
  const { id, productName, price, productImage } = props.data
  const {  cartItems, addTocart, removefromCart,updatecartcount } = useContext(Shopcontext)
  return (
    <div className='cartItem'>
      <img src={productImage} />
      <div className='description'>
        <p>
          <b>{productName}</b>
        </p>
        <p>{price}</p>
        <div className='countHandler'>
          <button onClick={()=>removefromCart(id)}>-</button>
          <input value={cartItems[id]} onChange={(e)=>updatecartcount(id,Number(e.target.value))} />
          <button onClick={()=>addTocart(id)}>+</button>
        </div>
      </div>
    </div>
  )
}
