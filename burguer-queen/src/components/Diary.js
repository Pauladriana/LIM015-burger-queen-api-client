import React, { useEffect, useState } from 'react';
import { getData } from '../services/get';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const Diary = ({ setLoading, setModalMessage }) => {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    let cancel = false;
    getData(setLoading, 'products', cookies.get('token'))
      .then((products) => {
        if (cancel) return;
        console.log(products);
        const diaryProducts = products.filter(p => p.type === 'Diario');
        setProducts(diaryProducts);
      });
    return () => {
      cancel = true;
    }
  }, []);

  const showProducts = (products) => products.map((product) => (
    <div key={product._id}>
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

export default Diary;