import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import { getData } from '../services/get';
import plus from '../media/plus.svg';
import '../style/Waiter.css';

const cookies = new Cookies();

const Breakfast = ({
  productsOrder, setProductsOrder, setQtyChange, setSum, sum,
}) => {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    let cancel = false;
    getData('products', cookies.get('token'))
      .then((products) => {
        if (cancel) return;
        const breakfastProducts = products.filter((p) => p.type === 'Desayuno');
        setProducts(breakfastProducts);
      });
    return () => {
      cancel = true;
    };
  }, []);

  const addProduct = (product) => {
    setSum(product.price + sum);
    const arrayOfId = productsOrder.map((p) => p._id);
    if (arrayOfId.indexOf(product._id) !== -1) {
      const p = productsOrder[(arrayOfId.indexOf(product._id))];
      p.qty += 1;
      setQtyChange(true);
      return setProductsOrder(productsOrder);
    }
    return setProductsOrder([...productsOrder, { ...product, qty: 1 }]);
  };

  const showProducts = (products) => products.map((product) => (
    <div key={product._id} className="waiterProductCard" onClick={() => addProduct(product)}>
      <div className="waiterProductCardText">
        <h3>{product.name}</h3>
        <span>{product.price}</span>
      </div>
      <div className="waiterProductCardImage">
        <img className="waiterImgCard" src={product.image} alt="food" />
      </div>
    </div>
  ));

  return (
    <div className="waiterProductsContainer">
      {products
        ? showProducts(products)
        : <div />}
    </div>
  );
};

export default Breakfast;
