import React, { useState, useEffect } from 'react';
import "../style/Admin.css";
import { getData } from '../services/get';
import { updateOrder } from '../services/put';
import Cookies from 'universal-cookie';
const cookies = new Cookies();


function ChefOrders({ setLoading, setError }) {

  const [kitchenOrder, setKitchenOrders] = useState(null);

  useEffect(() => {
    let cancel = false;
    getData(setLoading, 'orders', cookies.get('token'))
      .then((orders) => {
        if (cancel) return;
        const pendingOrders = orders.filter((order) => order.status === 'pending');
          setKitchenOrders(pendingOrders);
      });
    return () => {
      cancel = true;
    }
  }, []);

  const showOrders = (orders) => orders.map((order) => (
    <div className='waiter-orders' key={order._id}>
      <p>00:00:00</p>
      <p>{order.client}</p>
      <div>
        <p>{order.products[0].productId.name}</p>
        <p>{order.products[0].qty}</p>
      </div>
      <div>
        <button onClick={() => {
          updateOrder(order, 'orders', order._id, 'delivering')
      }}>Listo</button>
      </div>
    </div>
  ));

  return (
    <div>
      {kitchenOrder
        ? showOrders(kitchenOrder)
        : <div></div>
      }
    </div>
  );

}

export default ChefOrders;