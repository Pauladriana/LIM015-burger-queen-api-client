import React, { useState, useEffect } from 'react';
import '../style/Orders.css';
import Cookies from 'universal-cookie';
import { getData } from '../services/get';
import { updateOrder } from '../services/put';

const cookies = new Cookies();

const showProductsOrder = (array) => array.map((products) => (
  <div className="chef-orderContent">
    <p className="chef-item">{products.productId && products.productId.name}</p>
    <p className="chef-qty">{products.qty}</p>
  </div>
));

function ChefOrders({ setModalMessage }) {
  const [kitchenOrder, setKitchenOrders] = useState(null);

  useEffect(() => {
    let cancel = false;
    getData('orders', cookies.get('token'))
      .then((orders) => {
        if (cancel) return;
        const pendingOrders = orders.filter((order) => order.status === 'pending');
        setKitchenOrders(pendingOrders);
      });
    return () => {
      cancel = true;
    };
  }, []);

  const showOrders = (orders) => orders.map((order) => (
    <div className="ordersCard" key={order._id}>
      <p className="orderClient">{order.client}</p>
      <div>
        {showProductsOrder(order.products)}
      </div>
      <div className="orderCardButtonContainer">
        <button
          type="button"
          className="chef-orderReady"
          onClick={() => {
            updateOrder('orders', order._id, 'delivering', setModalMessage, 'Orden lista para entregarse.', cookies.get('token'));
          }}
        >
          Listo
        </button>
      </div>
    </div>
  ));

  return (
    <div className="chef-ordersContainer" aria-label="chef-pending">
      {kitchenOrder
        ? showOrders(kitchenOrder)
        : <div />}
    </div>
  );
}

export default ChefOrders;
