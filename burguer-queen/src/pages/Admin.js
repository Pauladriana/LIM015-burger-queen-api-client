import React, { useEffect } from 'react';
import {
  NavLink, Switch, Route, useRouteMatch, HashRouter,
} from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Cookies from 'universal-cookie';
import userPhoto from '../media/man.png';
import '../style/Admin.css';
import { close, redirectToNotFound } from '../helpers/helpers';
import Users from './Users';
import Products from './Products';
import AllOrders from './AllOrders';
import NewUser from './Newuser';
import EditUser from './Edituser';
import Newproduct from './Newproduct';
import EditProduct from './Editproduct';

const cookies = new Cookies();

const Admin = ({ setLoading, setModalMessage }) => {
  const { path, url } = useRouteMatch();
  const userLogged = cookies.get('userLogged');

  useEffect(() => {
    if (!userLogged) window.location.href = '#/';
  }, []);

  return (
    <HashRouter>
      {(!userLogged.roles.admin)
        ? redirectToNotFound()
        : (
          <div className="adminContainer">
            <div className="navContainer">
              <p className="navlogo">BQ</p>
              <nav className="nav">
                <NavLink to={`${url}/users`} activeClassName="active" className="navlink">Usuarios</NavLink>
                <div className="navLine" />
                <NavLink to={`${url}/products`} activeClassName="active" className="navlink">Productos</NavLink>
                <div className="navLine" />
                <NavLink to={`${url}/allorders`} activeClassName="active" className="navlink">Órdenes</NavLink>
              </nav>
              <ExitToAppIcon fontSize="medium" onClick={() => close()} />
            </div>
            <div className="adminBodyContainer">
              <div className="adminCard">
                <h1 className="adminH1">Administradorx</h1>
                <div className="userData">
                  <img src={userPhoto} alt="" className="userPhoto" />
                  <p><b>{userLogged.roles.name}</b></p>
                  <p>{userLogged.email}</p>
                </div>
              </div>
              <Switch>
                <Route
                  exact
                  path={`${path}/users`}
                  component={() => (
                    <Users setLoading={setLoading} setModalMessage={setModalMessage} />
                  )}
                />
                <Route
                  path={`${path}/users/newuser`}
                  component={() => (
                    <NewUser setLoading={setLoading} setModalMessage={setModalMessage} />
                  )}
                />
                <Route
                  path={`${path}/users/edituser`}
                  component={() => (
                    <EditUser setLoading={setLoading} setModalMessage={setModalMessage} />
                  )}
                />
                <Route
                  exact
                  path={`${path}/products`}
                  component={() => (
                    <Products setLoading={setLoading} setModalMessage={setModalMessage} />
                  )}
                />
                <Route
                  path={`${path}/products/newproduct`}
                  component={() => (
                    <Newproduct setLoading={setLoading} setModalMessage={setModalMessage} />
                  )}
                />
                <Route
                  path={`${path}/products/editproduct`}
                  component={() => (
                    <EditProduct setLoading={setLoading} setModalMessage={setModalMessage} />
                  )}
                />
                <Route
                  exact
                  path={`${path}/allorders`}
                  component={() => (
                    <AllOrders setLoading={setLoading} setModalMessage={setModalMessage} />
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
