import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import { getData } from '../services/get';
import plus from '../media/plus.svg';
import '../style/Waiter.css';

const cookies = new Cookies();

const Diary = ({
  productsOrder, setProductsOrder, setQtyChange, setSum, sum,
}) => {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    let cancel = false;
    getData('products', cookies.get('token'))
      .then((products) => {
        if (cancel) return;
        const diaryProducts = products.filter((p) => p.type === 'Diario');
        setProducts(diaryProducts);
      });
    return () => { cancel = true; };
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
    <div key={product._id}>
      <button type="button" onClick={() => addProduct(product)}><img src={plus} alt="plus" className="waiterIcon" /></button>
      <p>{product.name}</p>
      <p>{product.type}</p>
      <p>{product.image}</p>
    </div>
  ));

  return (
    <div>
      {products
        ? showProducts(products)
        : <div />}
    </div>
  );
};

export default Diary;
