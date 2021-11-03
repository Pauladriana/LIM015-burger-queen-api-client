import React, { useEffect } from 'react';
import {
  NavLink, Switch, Route, HashRouter,
} from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ChairAltIcon from '@mui/icons-material/ChairAlt';
import KitchenIcon from '@mui/icons-material/Kitchen';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Cookies from 'universal-cookie';
import '../style/Admin.css';
import { close, redirectToNotFound } from '../helpers/helpers';
import Users from './Users';
import Products from './Products';
import AllOrders from './AllOrders';
import NewUser from './NewUser';
import EditUser from './EditUser';
import NewProduct from './NewProduct';
import EditProduct from './EditProduct';

const cookies = new Cookies();

const Admin = ({ setLoading, setModalMessage }) => {
  const userLogged = cookies.get('userLogged');

  useEffect(() => {
    if (!userLogged) window.location.href = '#/';
  }, []);

  return (
    <HashRouter aria-label="admin">
      {(!userLogged.roles.admin)
        ? redirectToNotFound()
        : (
          <div aria-label="admin" className="adminContainer">
            <div className="navContainer">
              <NavLink to="/" aria-label="navlogo" className="navlogo">BQ</NavLink>
              <nav className="nav">
                <NavLink to="/admin/users" aria-label="usuarios" activeClassName="active" className="navlink">Usuarios</NavLink>
                <div className="navLine" />
                <NavLink to="/admin/products" activeClassName="active" className="navlink">Productos</NavLink>
                <div className="navLine" />
                <NavLink to="/admin/allorders" activeClassName="active" className="navlink">Órdenes</NavLink>
              </nav>
              <ChairAltIcon fontSize="medium" onClick={() => { window.location.href = '#/meserx/neworder'; }} />
              <KitchenIcon fontSize="medium" onClick={() => { window.location.href = '#/chef/pendingorders'; }} />
              <ExitToAppIcon aria-label="exitIcon" fontSize="medium" onClick={() => close()} />
            </div>
            <div className="adminBodyContainer">
              <div className="adminCard">
                <h1 className="adminH1">Administradorx</h1>
                <div className="userData">
                  <AccountCircleIcon fontSize="large" alt="avatar" className="userPhoto" />
                  <p><b>{userLogged.roles.name}</b></p>
                  <p className="userDataEmail">{userLogged.email}</p>
                </div>
              </div>
              <Switch>
                <Route
                  exact
                  path="/admin/users"
                  component={() => (
                    <Users setLoading={setLoading} setModalMessage={setModalMessage} />
                  )}
                />
                <Route
                  path="/admin/users/newuser"
                  component={() => (
                    <NewUser setLoading={setLoading} setModalMessage={setModalMessage} />
                  )}
                />
                <Route
                  path="/admin/users/edituser"
                  component={() => (
                    <EditUser setLoading={setLoading} setModalMessage={setModalMessage} />
                  )}
                />
                <Route
                  exact
                  path="/admin/products"
                  component={() => (
                    <Products setLoading={setLoading} setModalMessage={setModalMessage} />
                  )}
                />
                <Route
                  path="/admin/products/newproduct"
                  component={() => (
                    <NewProduct setLoading={setLoading} setModalMessage={setModalMessage} />
                  )}
                />
                <Route
                  path="/admin/products/editproduct"
                  component={() => (
                    <EditProduct setLoading={setLoading} setModalMessage={setModalMessage} />
                  )}
                />
                <Route
                  exact
                  path="/admin/allorders"
                  component={() => (
                    <div className="adminAllOrdersContainer">
                      <AllOrders setLoading={setLoading} setModalMessage={setModalMessage} />
                    </div>
                  )}
                />
              </Switch>
            </div>
          </div>
        )}
      ;
    </HashRouter>
  );
};
export default Admin;
