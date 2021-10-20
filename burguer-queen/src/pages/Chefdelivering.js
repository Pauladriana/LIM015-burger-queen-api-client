import React, { useState, useEffect } from 'react';
import '../style/Orders.css';
import Cookies from 'universal-cookie';
import { getData } from '../services/get';

const cookies = new Cookies();

function ChefOrders({ setLoading, setModalMessage }) {
  const [kitchenOrder, setKitchenOrders] = useState(null);

  useEffect(() => {
    let cancel = false;
    getData('orders', cookies.get('token'))
      .then((orders) => {
        if (cancel) return;
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
    <div className="ordersCard" key={order._id}>
      <p className="orderTimer">{time(order)}</p>
      <p className="orderClient">{order.client}</p>
      <div className="chef-orderContent">
        <p className="chef-item">{order.products[0].productId.name}</p>
        <p className="chef-qty">{order.products[0].qty}</p>
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
