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
        console.log(orders);
        const pendingOrders = orders.filter((order) => order.status === 'delivering');
        setKitchenOrders(pendingOrders);
      });
    return () => {
      cancel = true;
    };
  }, []);

  const time = (order) => {
    const { dateProcessed, dateEntry } = order;
    if (dateProcessed.slice(0, -14) === dateEntry.slice(0, -14)) {
      const finalHour = Number(dateProcessed.slice(11, -11)) - Number(dateEntry.slice(11, -11));
      const finalMinutes = Number(dateProcessed.slice(14, -8)) - Number(dateEntry.slice(14, -8));
      const finalSeconds = Number(dateProcessed.slice(17, -5)) - Number(dateEntry.slice(17, -5));
      return (
        `${finalHour < 10 ? `0${finalHour}` : finalHour}: ${finalMinutes < 10 ? `0${finalMinutes}` : finalMinutes}: ${finalSeconds < 10 ? `0${finalSeconds}` : finalSeconds}`);
    }
    return 'Orden fuera de tiempo';
  };

  const showOrders = (orders) => orders.map((order) => (
    <div className="waiter-orders" key={order._id}>
      <p>{time(order)}</p>
      <p>{order.client}</p>
      <div>
        <p>{order.products[0].productId.name}</p>
        <p>{order.products[0].qty}</p>
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
