import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { products } from '../../products';
import { Product } from './Product';
import './shop.css';
import Navbar from '../../components/Navbar';

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
    <div>
      <Navbar/>
    <div className='shop'>
      <div className='products'>
        {products.map((product) => (
          <Product key={product.id} data={product} />
        ))}
      </div>
    </div>
    </div>
  );
};
