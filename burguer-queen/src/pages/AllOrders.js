
import React, { useState, useEffect } from 'react';
import "../style/Admin.css";
import { getData } from '../services/get';
import { deleteData } from '../services/delete';
import { updateOrder } from '../services/put';
import Cmodal from '../components/cancelOrder';
import Cookies from 'universal-cookie';
const cookies = new Cookies();


function AllOrders({ setLoading, setError }) {

  const [orders, setOrders] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [orderId, setOrderId] = useState(false);
  const [filteredOrders, setFilterOrders] = useState(orders);


  useEffect(() => {
    let cancel = false;
    getData(setLoading, 'orders', cookies.get('token'))
      .then((orderTeam) => {
        if (cancel) return;
        setOrders(orderTeam);
        setFilterOrders(orderTeam);
      });
    return () => {
      cancel = true;
    }
  }, []);


  const pendingOrders = orders.filter((order)=> order.status == "pending");
  const canceledOrders = orders.filter((order)=> order.status === 'canceled');
  const deliveringOrders = orders.filter((order)=> order.status === 'delivering');
  const deliveredOrders = orders.filter((order)=> order.status === 'delivered');

  function showPendingOrders() {
    return setFilterOrders(pendingOrders)
  }

  function showCanceledOrders() {
    return setFilterOrders(canceledOrders)
  }

  function showDeliveringOrders() {
    return setFilterOrders(deliveringOrders)
  }

  function showDeliveredOrders() {
    return setFilterOrders(deliveredOrders)
  }


  const showOrders = (orders) => orders.map((order) => (
    <div className='waiter-orders' key={order._id}>
      <p>{order.status}</p>
      <p>{order.client}</p>
      <div>
        <p>{order.products[0].productId.name}</p>
        <p>{order.products[0].qty}</p>
      </div>
      <div>
        {order.status === 'pending' ? <button  onClick={() => {
          setModalOpen(true);
          setOrderId(order._id);
          updateOrder(order, 'orders', order._id, 'canceled')
        }}>Cancelar</button> : < div /> }
      </div>
      <div>
        {order.status === 'delivering'? <button onClick={() => {
          updateOrder(order, 'orders', order._id, 'delivered')
        }}>Entregar</button> : < div />  }
      </div>
    </div>
  ));


  console.log(orders)

  return (
    <div>
        {/* <button onClick={() => showPendingOrders()}>Pendientes</ button> 
        <button onClick={() => showDeliveringOrders()}>Delivering</ button>
        <button onClick={() => showDeliveredOrders()}>Delivered</ button>
        <button onClick={() => showCanceledOrders()}>Canceled</ button> */}
      {filteredOrders
        ? showOrders(filteredOrders)
        : < div />
      }
      {modalOpen && <Cmodal setLoading={setLoading}  setOpenModal={setModalOpen} setError={setError} path='orders' id={orderId}/>}
    </div>
  );
};


export default AllOrders;
