import React, { createContext, useEffect, useState } from 'react'
import { products } from '../products'

export const Shopcontext = createContext()
const getDefaultcart = () => {
  let cart = {}
  for (let i = 1; i <= products.length; i++) {
    cart[i] = 0
  }
  return cart
}

export const Shopstate = props => {
  const [cartItems, setcartItems] = useState(getDefaultcart)

  const addTocart = itemid => {
    setcartItems(prev => ({ ...prev, [itemid]: prev[itemid] + 1 }))
  }
  const removefromCart = itemid => {
    setcartItems(prev => ({ ...prev, [itemid]: prev[itemid] - 1 }))
  }
  const updatecartcount=(itemid,counter)=>{
    setcartItems(prev => ({ ...prev, [itemid]:counter}))
  }
  const getTotalAmount=()=>{
    let total=0;
    for(const i in cartItems)
    {
        if(cartItems[i]>0)
        {
          let itemInfo=products.find((product)=>product.id===Number(i));
          total+=itemInfo.price*cartItems[i];
        }
    }
    return total;
  };
  const contextValue = { cartItems, addTocart, removefromCart,updatecartcount,getTotalAmount}
  return (
    <Shopcontext.Provider value={contextValue}>
      {props.children}
    </Shopcontext.Provider>
  )
}
