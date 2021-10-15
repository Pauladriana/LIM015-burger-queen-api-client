import React, { useState } from 'react';
import "../style/waiter.css";
import { getProduct } from '../services/get'

function WaiterOrders (setLoading, orders, setError) {

  // const [buttonDisplay, setDisplay] = useState('none');

  const getProductName = async (ordertable) => {
    await getProduct(`orders/${ordertable.products.productId}`);
  };
  const returnedArray = Array.from(orders)
  console.log(orders, returnedArray)

    return (
      <div>
        <div>
          <button>Filtro</button>
        </div>
        <h2>Hola</h2>
        <div>
        {returnedArray.map((order) => (
        <div className='waiter-orders'>
          <p>{order.status}</p>
          <p>{order.client}</p>
          <div>
            <p>{getProductName(order)}</p>
            <p>{order.products.qty}</p>
          </div>
        <div>
          <button >Cancelar</button>
          <button >Entregar</button>
        </div>
        </div>
        ))}
        </div>
      </div>
    )
}

export default WaiterOrders;