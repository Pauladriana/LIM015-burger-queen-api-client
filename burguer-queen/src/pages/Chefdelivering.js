import React, { useState, useEffect } from 'react';
import '../style/Orders.css';
import Cookies from 'universal-cookie';
import { getData } from '../services/get';

const cookies = new Cookies();

const showProductsOrder = (array) => array.map((products) => (
  <div className="chef-orderContent">
    <p className="chef-item">{products.productId && products.productId.name}</p>
    <p className="chef-qty">{products.qty}</p>
  </div>
));

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
    const localDateProcessed = (new Date(dateProcessed)).toString();
    const localDateEntry = (new Date(dateEntry)).toString();
    if (localDateProcessed.slice(0, 15) === localDateEntry.slice(0, 15)) {
      const miliseconds = Math.abs(new Date(dateProcessed) - new Date(dateEntry));
      const msToTime = (duration) => {
        let seconds = Math.floor((duration / 1000) % 60);
        let minutes = Math.floor((duration / (1000 * 60)) % 60);
        let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
        hours = (hours < 10) ? `0${hours}` : hours;
        minutes = (minutes < 10) ? `0${minutes}` : minutes;
        seconds = (seconds < 10) ? `0${seconds}` : seconds;
        return `${hours} : ${minutes} : ${seconds}`;
      };
      return msToTime(miliseconds);
    }
    return 'Orden fuera de tiempo';
  };

  const showOrders = (orders) => orders.map((order) => (
    <div className="ordersCard" key={order._id}>
      <p className="orderTimer">{time(order)}</p>
      <p className="orderClient">{order.client}</p>
      <div>
        {showProductsOrder(order.products)}
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
