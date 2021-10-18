import React, { useState, useEffect } from 'react';
import '../style/Admin.css';
import Cookies from 'universal-cookie';
import { getData } from '../services/get';
import { updateOrder } from '../services/put';

const cookies = new Cookies();

function ShowAllOrders({ setLoading, setModalMessage }) {
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    let cancel = false;
    getData('orders', cookies.get('token'))
      .then((orderTeam) => {
        if (cancel) return;
        console.log(orderTeam);
        setOrders(orderTeam);
      });
    return () => {
      cancel = true;
    };
  }, []);

  const showOrders = (orders) => orders.map((order) => (
    <div className="waiter-orders" key={order._id}>
      <p>{order.status}</p>
      <p>{order.client}</p>
      <div>
        <p>{order.products[0].productId.name}</p>
        <p>{order.products[0].qty}</p>
      </div>
      <div>
        {order.status === 'pending' ? (
          <button
            type="button"
            onClick={() => {
              setModalMessage({
                title: '¿Está seguro de eliminar esta orden?', button2: 'Cancelar', path: 'orders', id: order._id,
              });
            }}
          >
            Cancelar
          </button>
        ) : <div />}
      </div>
      <div>
        {order.status === 'delivering' ? (
          <button
            type="button"
            onClick={() => {
              updateOrder(order, 'orders', order._id, 'delivered');
            }}
          >
            Entregar
          </button>
        ) : <div />}
      </div>
    </div>
  ));

  return (
    <div>
      {orders
        ? showOrders(orders)
        : <div />}
    </div>
  );
}

function ShowPendingOrders({ setLoading, setModalMessage }) {
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    let cancel = false;
    getData('orders', cookies.get('token'))
      .then((orderTeam) => {
        if (cancel) return;
        const newOrders = orderTeam.filter((order) => order.status === 'pending');
        setOrders(newOrders);
      });
    return () => {
      cancel = true;
    };
  }, []);

  const showOrders = (orders) => orders.map((order) => (
    <div className="waiter-orders" key={order._id}>
      <p>{order.status}</p>
      <p>{order.client}</p>
      <div>
        <p>{order.products[0].productId.name}</p>
        <p>{order.products[0].qty}</p>
      </div>
      <div>
        {order.status === 'pending' ? (
          <button
            type="button"
            onClick={() => {
              setModalMessage({
                title: '¿Está seguro de eliminar esta orden?', button2: 'Cancelar', path: 'orders', id: order._id,
              });
            }}
          >
            Cancelar
          </button>
        ) : <div />}
      </div>
      <div>
        {order.status === 'delivering' ? (
          <button
            type="button"
            onClick={() => {
              updateOrder(order, 'orders', order._id, 'delivered');
            }}
          >
            Entregar
          </button>
        ) : <div />}
      </div>
    </div>
  ));

  return (
    <div>
      {orders
        ? showOrders(orders)
        : <div />}
    </div>
  );
}

function ShowDeliveringOrders({ setLoading, setModalMessage }) {
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    let cancel = false;
    getData('orders', cookies.get('token'))
      .then((orderTeam) => {
        if (cancel) return;
        console.log(orderTeam);
        const newOrders = orderTeam.filter((order) => order.status === 'delivering');
        setOrders(newOrders);
      });
    return () => {
      cancel = true;
    };
  }, []);

  const showOrders = (orders) => orders.map((order) => (
    <div className="waiter-orders" key={order._id}>
      <p>{order.status}</p>
      <p>{order.client}</p>
      <div>
        <p>{order.products[0].productId.name}</p>
        <p>{order.products[0].qty}</p>
      </div>
      <div>
        <button
          type="button"
          onClick={() => {
            updateOrder('orders', order._id, 'delivered', setModalMessage, 'Orden finalizada');
          }}
        >
          Entregar
        </button>
      </div>
    </div>
  ));

  return (
    <div>
      {orders
        ? showOrders(orders)
        : <div />}
    </div>
  );
}

function ShowDeliveredOrders({ setLoading }) {
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    let cancel = false;
    getData('orders', cookies.get('token'))
      .then((orderTeam) => {
        if (cancel) return;
        console.log(orderTeam);
        const newOrders = orderTeam.filter((order) => order.status === 'delivered');
        setOrders(newOrders);
      });
    return () => {
      cancel = true;
    };
  }, []);

  const showOrders = (orders) => orders.map((order) => (
    <div className="waiter-orders" key={order._id}>
      <p>{order.status}</p>
      <p>{order.client}</p>
      <div>
        <p>{order.products[0].productId.name}</p>
        <p>{order.products[0].qty}</p>
      </div>
      <div>
        {order.status === 'pending' ? (
          <button
            type="button"
            onClick={() => {
              updateOrder(order, 'orders', order._id, 'canceled');
            }}
          >
            Cancelar
          </button>
        ) : <div />}
      </div>
      <div>
        {order.status === 'delivering' ? (
          <button
            type="button"
            onClick={() => {
              updateOrder(order, 'orders', order._id, 'delivered');
            }}
          >
            Entregar
          </button>
        ) : <div />}
      </div>
    </div>
  ));

  return (
    <div>
      {orders
        ? showOrders(orders)
        : <div />}
    </div>
  );
}
function ShowCanceledOrders({ setLoading }) {
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    let cancel = false;
    getData('orders', cookies.get('token'))
      .then((orderTeam) => {
        if (cancel) return;
        const newOrders = orderTeam.filter((order) => order.status === 'canceled');
        setOrders(newOrders);
      });
    return () => {
      cancel = true;
    };
  }, []);

  const showOrders = (orders) => orders.map((order) => (
    <div className="waiter-orders" key={order._id}>
      <p>{order.status}</p>
      <p>{order.client}</p>
      <div>
        <p>{order.products[0].productId.name}</p>
        <p>{order.products[0].qty}</p>
      </div>
      <div>
        {order.status === 'delivering' ? (
          <button
            type="button"
            onClick={() => {
              updateOrder(order, 'orders', order._id, 'delivered');
            }}
          >
            Entregar
          </button>
        ) : <div />}
      </div>
    </div>
  ));

  return (
    <div>
      {orders
        ? showOrders(orders)
        : <div />}
    </div>
  );
}

function AllOrders({ setLoading, setModalMessage }) {
  const [filteredOrders, setFilterOrders] = useState('allOrders');
  return (
    <div>
      <button type="button" onClick={() => setFilterOrders('pending')}>Pendientes</button>
      <button type="button" onClick={() => setFilterOrders('delivering')}>Delivering</button>
      <button type="button" onClick={() => setFilterOrders('delivered')}>Delivered</button>
      <button type="button" onClick={() => setFilterOrders('canceled')}>Canceled</button>
      <button type="button" onClick={() => setFilterOrders('allOrders')}>Clear</button>
      {filteredOrders === 'allOrders'
        ? <ShowAllOrders setLoading={setLoading} setModalMessage={setModalMessage} />
        : (filteredOrders === 'pending'
          ? <ShowPendingOrders setLoading={setLoading} setModalMessage={setModalMessage} />
          : (filteredOrders === 'delivering'
            ? <ShowDeliveringOrders setLoading={setLoading} setModalMessage={setModalMessage} />
            : (filteredOrders === 'delivered'
              ? <ShowDeliveredOrders setLoading={setLoading} />
              : (filteredOrders === 'canceled'
                ? <ShowCanceledOrders setLoading={setLoading} />
                : <div />
              )
            )
          )
        )}
    </div>
  );
}

export default AllOrders;
