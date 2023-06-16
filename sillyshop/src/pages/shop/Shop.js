import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { products } from '../../products';
import { Product } from './Product';
import './shop.css';

export const Shop = () => {
  const location = useLocation();
  const [initialRender, setInitialRender] = useState(true);

  useEffect(() => {
    if (initialRender) {
      setInitialRender(false);
    }
  }, [location]);

  if (initialRender) {
    return null; // Render nothing during the initial render
  }

  return (
    <div className='shop'>
      <div className='shopTitle'>
        <h1>Sillyshop</h1>
      </div>
      <div className='products'>
        {products.map((product) => (
          <Product key={product.id} data={product} />
        ))}
      </div>
    </div>
  );
};
