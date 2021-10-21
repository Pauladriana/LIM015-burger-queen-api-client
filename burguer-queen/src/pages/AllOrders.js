import React, { useState, useEffect } from 'react';
import '../style/Admin.css';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Cookies from 'universal-cookie';
import { getData } from '../services/get';
import { updateOrder } from '../services/put';

const cookies = new Cookies();

const styleOne = {
  fontFamily: 'Cormorant Upright',
  textTransform: 'none',
  fontSize: 16,
  fontWeight: 600,
  lineHeight: 1.75,
  width: 130,
  backgroundColor: '#DCCA87',
  border: '1px solid #DCCA87',
  color: '#0C0B08',
  borderRadius: 0,
  '&:hover': {
    backgroundColor: '#DCCA87',
    color: '#0C0B08',
  },
};
const styleTwo = {
  fontFamily: 'Cormorant Upright',
  textTransform: 'none',
  fontSize: 16,
  width: 130,
  backgroundColor: '#0C0B08',
  color: '#FFFFFF',
  border: '1px solid #DCCA87',
  borderRadius: 0,
  '&:hover': {
    backgroundColor: '#DCCA87',
    border: '1px solid #DCCA87',
    color: '#0C0B08',
  },
};

function ShowAllOrders({ setLoading, setModalMessage }) {
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    let cancel = false;
    getData('orders', cookies.get('token'))
      .then((orderTeam) => {
        if (cancel) return;
        setOrders(orderTeam);
      });
    return () => {
      cancel = true;
    };
  }, []);

  const showOrders = (orders) => orders.map((order) => (
    <div className="ordersCard" key={order._id}>
      <p className="orderStatus">
        {
          order.status === 'pending' ? 'Pendiente'
            : order.status === 'delivering' ? 'Lista'
              : order.status === 'delivered' ? 'Entregada'
                : order.status === 'canceled' ? 'Cancelada'
                  : 'Error'
        }
      </p>
      <p className="orderClient">{order.client}</p>
      <div className="chef-orderContent">
        <p className="chef-item">{order.products[0].productId.name}</p>
        <p className="chef-qty">{order.products[0].qty}</p>
      </div>
      <div>
        {order.status === 'pending' ? (
          <button
            type="button"
            className="chef-orderReady"
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
            className="chef-orderReady"
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
    <div className="waiterOrdersCardContainer">
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
    <div className="ordersCard" key={order._id}>
      <p className="orderStatus">{order.status === 'pending' ? 'Pendiente' : 'Error'}</p>
      <p className="orderClient">{order.client}</p>
      <div className="chef-orderContent">
        <p className="chef-item">{order.products[0].productId.name}</p>
        <p className="chef-qty">{order.products[0].qty}</p>

      </div>
      <div>
        {order.status === 'pending' ? (
          <button
            type="button"
            className="chef-orderReady"
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
            className="chef-orderReady"
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
    <div className="waiterOrdersCardContainer">
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
        const newOrders = orderTeam.filter((order) => order.status === 'delivering');
        setOrders(newOrders);
      });
    return () => {
      cancel = true;
    };
  }, []);

  const showOrders = (orders) => orders.map((order) => (
    <div className="ordersCard" key={order._id}>
      <p className="orderStatus">{order.status === 'delivering' ? 'Lista' : 'Error'}</p>
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
            updateOrder('orders', order._id, 'delivered', setModalMessage, 'Orden finalizada');
          }}
        >
          Entregar
        </button>
      </div>
    </div>
  ));

  return (
    <div className="waiterOrdersCardContainer">
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
    <div className="ordersCard" key={order._id}>
      <p className="orderStatus">{order.status === 'delivered' ? 'Entregada' : 'Error'}</p>
      <p className="orderClient">{order.client}</p>
      <div className="chef-orderContent">
        <p className="chef-item">{order.products[0].productId.name}</p>
        <p className="chef-qty">{order.products[0].qty}</p>

      </div>
      <div>
        {order.status === 'pending' ? (
          <button
            className="chef-orderReady"
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
    <div className="waiterOrdersCardContainer">
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
    <div className="ordersCard" key={order._id}>
      <p className="orderStatus">{order.status === 'canceled' ? 'Cancelada' : 'Error'}</p>
      <p className="orderClient">{order.client}</p>
      <div className="chef-orderContent">
        <p className="chef-item">{order.products[0].productId.name}</p>
        <p className="chef-qty">{order.products[0].qty}</p>
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
    <div className="waiterOrdersCardContainer">
      {orders
        ? showOrders(orders)
        : <div />}
    </div>
  );
}

function AllOrders({ setLoading, setModalMessage }) {
  const [filteredOrders, setFilterOrders] = useState('allOrders');
  const [styleButton1, setStyleButton1] = useState(styleOne);
  const [styleButton2, setStyleButton2] = useState(styleTwo);
  const [styleButton3, setStyleButton3] = useState(styleTwo);
  const [styleButton4, setStyleButton4] = useState(styleTwo);
  const [styleButton5, setStyleButton5] = useState(styleTwo);

  const ColorButton = styled(Button)(styleButton1);
  const ColorButton2 = styled(Button)(styleButton2);
  const ColorButton3 = styled(Button)(styleButton3);
  const ColorButton4 = styled(Button)(styleButton4);
  const ColorButton5 = styled(Button)(styleButton5);
  return (
    <div className="waiterNewOrderContainer">
      <div className="waiterHeader allOrder">
        <Stack direction="row" spacing={1}>
          <ColorButton
            onClick={() => { setFilterOrders('allOrders'); setStyleButton1(styleOne); setStyleButton2(styleTwo); setStyleButton3(styleTwo); setStyleButton4(styleTwo); setStyleButton5(styleTwo); }}
          >
            Todas
          </ColorButton>
          <ColorButton2
            onClick={() => { setFilterOrders('pending'); setStyleButton1(styleTwo); setStyleButton2(styleOne); setStyleButton3(styleTwo); setStyleButton4(styleTwo); setStyleButton5(styleTwo); }}
          >
            Pendientes
          </ColorButton2>
          <ColorButton3
            onClick={() => { setFilterOrders('delivering'); setStyleButton1(styleTwo); setStyleButton2(styleTwo); setStyleButton3(styleOne); setStyleButton4(styleTwo); setStyleButton5(styleTwo); }}
          >
            Listas
          </ColorButton3>
          <ColorButton4
            onClick={() => { setFilterOrders('delivered'); setStyleButton1(styleTwo); setStyleButton2(styleTwo); setStyleButton3(styleTwo); setStyleButton4(styleOne); setStyleButton5(styleTwo); }}
          >
            Entregadas
          </ColorButton4>
          <ColorButton5
            onClick={() => { setFilterOrders('canceled'); setStyleButton1(styleTwo); setStyleButton2(styleTwo); setStyleButton3(styleTwo); setStyleButton4(styleTwo); setStyleButton5(styleOne); }}
          >
            Canceladas
          </ColorButton5>
        </Stack>
      </div>
      <div className="waiterAllOrdersBody">
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
    </div>
  );
}

export default AllOrders;
