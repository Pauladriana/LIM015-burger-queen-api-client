import React, { useEffect, useState } from 'react';
import Breakfast from './Breakfast';
import Diary from './Diary';

export default function NewOrder({ setLoading, setModalMessage }) {
  const [menu, setMenu] = useState('breakfast');
  const [order, setOrden] = useState(true);

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
            ? <Breakfast/>
            : <Diary/>
          }
        </div>

        <div className='waiterOrderSection'>
          <h3 className='waiterTitle'>Orden</h3>
          <div>
          {

          }
          </div>
        </div>
      </section>
    </div>
  );
}
