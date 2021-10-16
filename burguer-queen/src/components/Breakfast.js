import React, { useEffect, useState } from 'react';
import { getData } from '../services/get';
import Cookies from 'universal-cookie';
import plus from '../media/plus.svg';
import '../style/Waiter.css';

const cookies = new Cookies();

const Breakfast = ({ setLoading, setModalMessage, productsOrder, setProductsOrder }) => {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    let cancel = false;
    getData(setLoading, 'products', cookies.get('token'))
      .then((products) => {
        if (cancel) return;
        const breakfastProducts = products.filter(p => p.type === 'Desayuno');
        setProducts(breakfastProducts);
      });
    return () => {
      cancel = true;
    }
  }, []);

  const addProduct = (product) => {
    setProductsOrder([...productsOrder, product])
  }

  const showProducts = (products) => products.map((product) => (
    <div key={product._id}>
      <img src={plus} alt='plus' className='waiterIcon' onClick={() => addProduct(product)} />
      <p>{product.name}</p>
      <p>{product.type}</p>
      <p>{product.image}</p>
    </div>
  ));
  return (
    <div>
      {products
        ? showProducts(products)
        : <div></div>
      }
    </div>
  );
};

export default Breakfast;
