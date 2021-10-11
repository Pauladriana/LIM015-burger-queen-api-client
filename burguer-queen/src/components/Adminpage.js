import React, { useState } from 'react';
import UserInfo from './Usertype';
import Users from './Users';
import Products from './Products';
import "../style/Admin.css";

function AdminPage() {
    const [active, setActive] = useState('UsersCard');
    
    return (
      <div>
        <UserInfo />
        <div className='buttonAdmin'>
          <button onClick={() => setActive('UsersCard')}>Usuarios</button>
          <button onClick={() => setActive('ProductsCard')}>Productos</button>
          <button>Ordenes</button>
        </div>
        <div className='container'>
          {active === 'UsersCard' && <Users />}
          {active === 'ProductsCard' && <Products />}
        </div>
      </div>
    );
}

export default AdminPage;