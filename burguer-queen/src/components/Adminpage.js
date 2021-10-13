import React, { useState, useEffect } from 'react';
import UserInfo from './Usertype';
import Users from './Users';
import Products from './Products';
import "../style/Admin.css";
import { getData } from '../services/get'

function AdminPage({ setLoading, setError }) {
  const [active, setActive] = useState('UsersCard');
  const [background, setColor] = useState('red');
  const [background2, setColorB] = useState('white');
  const [background3, setColorC] = useState('white');
  const [products, setProducts] = useState(null);
  const [users, setUsers] = useState(null);

  useEffect(() => {
    // showProducts();
    showUsers();
    return () => {
      // setProducts(null);
      setUsers(null);
    };
  }, []);

  const showProducts = async () => await getData(setLoading, setProducts, 'products');
  const showUsers = async () => await getData(setLoading, setUsers, 'users');

  return (
    <div>
      <UserInfo />
      <div className='buttonAdmin'>
        <button onClick={() => { setActive('UsersCard'); setColor('red'); setColorB('white'); setColorC('white'); showUsers()}} className={background}>Usuarios</button>
        <button onClick={() => { setActive('ProductsCard'); setColorB('red');  setColor('white'); setColorC('white'); showProducts()}} className={background2}>Productos</button>
        <button onClick={() => { setActive('OrdersCard'); setColorB('white'); setColor('white'); setColorC('red') }} className={background3}>Ordenes</button>
      </div>
      <div className='container'>
        {active === 'UsersCard' && users && <Users setLoading={setLoading} users={users} setError={setError}/>}
        {active === 'ProductsCard' && products &&<Products setLoading={setLoading} products={products} setError={setError}/>}
      </div>
    </div>
  );
}

export default AdminPage;