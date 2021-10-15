import React, { useState } from 'react';
import WaiterOrders from './WaiterOrders';
import "../style/Admin.css";
import { getData } from '../services/get'

function OrdersPage({ setLoading, setError }) {

  const [orders, setOrders] = useState([{
    _id : "6168af6b21c2f84f84270215",
    userId : "6166425c94579e6cf7aa26c9",
    client : "Momo",
    products : [
        {
            productId : "61661c040f0735af81006e31",
            qty : 6
        }
    ]
}, {
  "_id" : "6168af6b21c2f84f84270215",
  "userId" : "6166425c94579e6cf7aa26c9",
  "client" : "Hyuna",
  "products" : [ 
      {
          "productId" : "61661c040f0735af81006e31",
          "qty" : 6
      }
  ]
}]);
  // const [buttonDisplay, setDisplay] = useState('none');

  const showOrders = async () => await getData(setLoading, setOrders, 'orders');
 showOrders().then((res) => console.log(res));

 console.log(orders)

  return (
    <div>
      < WaiterOrders orders={orders}/>
    </div>
  )
}

export default OrdersPage;
