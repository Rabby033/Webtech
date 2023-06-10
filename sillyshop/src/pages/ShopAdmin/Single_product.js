import React from 'react'

export const Single_product = props => {
  const { id, productName, price, productImage } = props.data
  const selected_items = props.data2
  const  order  = props.data3

   
  // console.log(date)

  return (
    <div>
      <div className='cartItem'>
        <img src={productImage} />
        <div className='description'>
          <p>
            <b>{productName}</b>
          </p>
          <p>{price}</p>
          <p>x {selected_items[id]} </p>
        </div>
      </div>
    </div>
  )
}
