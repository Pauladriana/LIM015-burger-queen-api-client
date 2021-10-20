import React, { useState, useEffect } from 'react';
import '../style/Orders.css';
import Cookies from 'universal-cookie';
import { getData } from '../services/get';
import { updateOrder } from '../services/put';

const cookies = new Cookies();

function ChefOrders({ setLoading, setModalMessage }) {
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
      <div className="chef-orderContent">
        <p className="chef-item">{order.products[0].productId.name}</p>
        <p className="chef-qty">{order.products[0].qty}</p>
      </div>
      <div>
        <button
          type="button"
          className="chef-orderReady"
          onClick={() => {
            updateOrder('orders', order._id, 'delivering', setModalMessage, 'Orden lista para entregarse.');
          }}
        >
          Listo
        </button>
      </div>
    </div>
  ));

  return (
    <div>
      {kitchenOrder
        ? showOrders(kitchenOrder)
        : <div />}
    </div>
  );
}

export default ChefOrders;
