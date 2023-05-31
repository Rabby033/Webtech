import React, { useContext, useState } from 'react';
import {Shopcontext} from '../../context/Shopcontext'

export const Product = (props) => {
  const { id, productName, price, productImage } = props.data;
 
  const {addTocart,cartItems} =useContext(Shopcontext);
  
  return (
    <div className='product'>
      <img src={productImage} alt={productName} />
      <div className='description'>
        <p><b>{productName}</b></p>
        <p>{price}</p>
      </div>
      <button className='addToCartBttn' onClick={()=>addTocart(id)}>Add to Cart{cartItems[id]>0 && <>({cartItems[id]})</>}</button>
    </div>
  );
};
