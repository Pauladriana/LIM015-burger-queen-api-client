import React, { useState, useEffect } from 'react';
import '../style/Admin.css';
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
    <div className="waiter-orders" key={order._id}>
      <p>{order.client}</p>
      <div>
        <p>{order.products[0].productId.name}</p>
        <p>{order.products[0].qty}</p>
      </div>
      <div>
        <button
          type="button"
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
