import React, { useEffect } from 'react';
import { NavLink, Switch, Route, useRouteMatch, HashRouter } from 'react-router-dom';
import Cookies from 'universal-cookie';
import userPhoto from '../media/man.png';
import '../style/Admin.css';
import logo from '../media/LOGOBQO.png';
import { close } from '../helpers/helpers';
import Users from './Users';
import Products from './Products';
import AllOrders from './AllOrders';
import NewUser from './Newuser';
import EditUser from './EditUser';
import Newproduct from './Newproduct';
import EditProduct from './EditProduct';

const cookies = new Cookies();

const Admin = ({ setLoading, setError }) => {
  let { path, url } = useRouteMatch();
  console.log(url);

  useEffect(() => {
    if (!cookies.get('userLogged')) {
      window.location.href = "#/";
    }
  }, []);

  return (
    <HashRouter>
      <div className='header'>
        <img src={logo} alt='' className='logo' />
        <nav>
          <NavLink to={`${url}/users`} activeClassName='red'>Usuarios</NavLink>
          <NavLink to={`${url}/products`} activeClassName='red'>Productos</NavLink>
          <NavLink to={`${url}/orders`} activeClassName='red'>Órdenes</NavLink>
        </nav>
        <button onClick={() => close()}>Cerrar Sesión</button>
      </div>
      <div>
        <div>
          <h1>Administradora</h1>
          <div className='userData'>
            <img src={userPhoto} alt='' className='userPhoto' />
            <p><b>Ana Perez</b></p>
            <p>admin@localhost.com</p>
          </div>
        </div>
        <Switch>
          <Route exact path={`${path}/users`} component={Users} />
          <Route path={`${path}/users/newuser`} component={NewUser} />
          <Route path={`${path}/users/edituser`} component={EditUser} />
          <Route exact path={`${path}/products`} component={Products} />
          <Route path={`${path}/products/newproduct`} component={Newproduct} />
          <Route path={`${path}/products/editproduct`} component={EditProduct} />
          <Route exact path={`${path}/orders`} component={AllOrders} />
        </Switch>
      </div>
    </HashRouter>
  )
}

export default Admin;
