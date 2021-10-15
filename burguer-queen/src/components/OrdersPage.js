import React, { useState, useEffect } from 'react';
import "../style/Admin.css";
import { getData } from '../services/get';
import Cookies from 'universal-cookie';
const cookies = new Cookies();


function OrdersPage({ setLoading, setError }) {

  const [orders, setOrders] = useState(null);

  useEffect(() => {
    let cancel = false;
    getData(setLoading, 'orders', cookies.get('token'))
      .then((orderTeam) => {
        if (cancel) return;
        setOrders(orderTeam);
      });
    return () => {
      cancel = true;
    }
  }, []);


  const showOrders = (orders) => orders.map((order) => (
    <div className='waiter-orders' key={order.id}>
      <p>{order.status}</p>
      <p>{order.client}</p>
      <div>
        <p>{order.products[0].productId.name}</p>
        <p>{order.products[0].qty}</p>
      </div>
      <div>
        <button >Cancelar</button>
        <button >Entregar</button>
      </div>
    </div>
  ));


  console.log(orders)

  return (
    <div>
      {orders
        ? showOrders(orders)
        : <div></div>
      }
    </div>
  );
};


export default OrdersPage;
