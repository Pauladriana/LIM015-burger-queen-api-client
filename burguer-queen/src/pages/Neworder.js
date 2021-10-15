import React, { useEffect, useState } from 'react';
import Breakfast from '../components/Breakfast';
import Diary from '../components/Diary';

export default function NewOrder({ setLoading, setModalMessage }) {
  const [menu, setMenu] = useState('breakfast');
  const [order, setOrden] = useState(null);

  const showOrder = (order) => order.map(product => (
    <ul key={product._id}>
      <li>{product.name}</li>
      <li>{product.price}</li>
    </ul>
  ));

  useEffect(() => {


  }, []);

  return (
    <div className='waiterContainer'>
      <section className='waiterHeader'>
        <div>
          <button onClick={() => { setMenu('breakfast') }} >Desayuno</button>
          <button onClick={() => { setMenu('diary') }}>Diario</button>
        </div>
        <input className='waiterInput' placeholder='Nombre Cliente' />
      </section>

      <section className='waiterBody'>
        <div className='waiterProductsSection'>
          {menu === 'breakfast'
            ? <Breakfast />
            : <Diary />
          }
        </div>

        <div className='waiterOrderSection'>
          <h3 className='waiterOrderTitle'>Orden</h3>
          <div className='waiterOrderTab'>
            {!order
              ? <div></div>
              : showOrder(order)
            }
          </div>
        </div>
      </section>
    </div>
  );
}
