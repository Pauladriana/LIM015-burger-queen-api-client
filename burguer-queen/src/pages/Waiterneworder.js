import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import Breakfast from '../components/Breakfast';
import Diary from '../components/Diary';
import trash from '../media/trash.svg';
import { createOrder } from '../services/post';

const cookies = new Cookies();

export default function NewOrder({ setLoading, setModalMessage }) {
  const [menu, setMenu] = useState('breakfast');
  const [productsOrder, setProductsOrder] = useState([]);
  const [name, setName] = useState('');
  const [qtychange, setQtyChange] = useState(null);
  const [sum, setSum] = useState(0);

  const removeProduct = (product) => {
    setSum(sum - (Number(product.price) * product.qty));
    const newProductsOrder = productsOrder.filter((p) => p._id !== product._id);
    setProductsOrder([
      ...newProductsOrder,
    ]);
  };
  const showOrder = () => productsOrder.map((product) => (
    <tr key={product._id}>
      <td>{product.qty}</td>
      <td>
        {product.name}
        <img src={trash} alt="trash" className="waiterIcon" onClick={() => removeProduct(product)} />
      </td>
      <td>{`S/. ${product.price}`}</td>
    </tr>
  ));

  useEffect(() => {
    if (!cookies.get('userLogged')) window.location.href = '#/';
  }, []);

  const saveOrder = () => {
    const products = productsOrder.map((p) => ({ productId: p._id, qty: p.qty }));
    return createOrder(name, products, (cookies.get('userLogged'))._id, setLoading, setModalMessage, 'orders');
  };
  return (
    <div className="waiterContainer">
      <section className="waiterHeader">
        <div>
          <button type="button" onClick={() => { setMenu('breakfast'); }}>Desayuno</button>
          <button type="button" onClick={() => { setMenu('diary'); }}>Diario</button>
        </div>
        <input className="waiterInput" placeholder="Nombre Cliente" onChange={(e) => setName(e.target.value)} />
      </section>

      <section className="waiterBody">
        <div className="waiterProductsSection">
          {menu === 'breakfast'
            ? <Breakfast setLoading={setLoading} productsOrder={productsOrder} setProductsOrder={setProductsOrder} setQtyChange={setQtyChange} setSum={setSum} sum={sum} />
            : <Diary setLoading={setLoading} productsOrder={productsOrder} setProductsOrder={setProductsOrder} setQtyChange={setQtyChange} setSum={setSum} sum={sum} />}
        </div>
        <div className="waiterOrderSection">
          <h3 className="waiterOrderTitle">Orden</h3>
          <div className="waiterOrderTab">
            <table>
              <thead>
                <tr>
                  <th>Qty</th>
                  <th>Producto</th>
                  <th>Precio Unit.</th>
                </tr>
              </thead>
              <tbody>
                {(productsOrder !== [] || qtychange)
                  ? showOrder()
                  : <div />}
                <tr>
                  <td>Total </td>
                  <td>{sum}</td>
                </tr>
              </tbody>
            </table>
          </div>
          {(qtychange) ? setQtyChange(null) : false}
          <button type="button" onClick={() => saveOrder()}>Guardar</button>
        </div>
      </section>
    </div>
  );
}
