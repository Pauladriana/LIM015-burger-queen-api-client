import React, { useState } from 'react';
import UserInfo from './Usertype';
import Users from './Users';
import Products from './Products';
import "../style/Admin.css";

function AdminPage() {
    const [active, setActive] = useState('UsersCard');
    const [background, setColor] = useState('red');
    const [background2, setColorB] = useState('white');
    const [background3, setColorC] = useState('white');
    
    return (
      <div>
        <UserInfo />
        <div className='buttonAdmin'>
          <button onClick={() => { setActive('UsersCard'); setColor('red'); setColorB('white'); setColorC('white')}} className={background}>Usuarios</button>
          <button onClick={() => { setActive('ProductsCard'); setColorB('red'); setColor('white'); setColorC('white')}} className={background2}>Productos</button>
          <button onClick={() => { setActive('ProductsCard'); setColorB('white'); setColor('white'); setColorC('red')}} className={background3}>Ordenes</button>
        </div>
        <div className='container'>
          {active === 'UsersCard' && <Users />}
          {active === 'ProductsCard' && <Products />}
        </div>
      </div>
    );
}

export default AdminPage;