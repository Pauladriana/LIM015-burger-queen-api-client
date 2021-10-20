import React, { useEffect } from 'react';
import {
  NavLink, Switch, Route, useRouteMatch, HashRouter,
} from 'react-router-dom';
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
          <div>
            <div>
              <div className="header">
                <p className="logo">BQ</p>
                <nav>
                  <NavLink to={`${url}/users`} activeClassName="active" className="navlink">Usuarios</NavLink>
                  <NavLink to={`${url}/products`} activeClassName="active" className="navlink">Productos</NavLink>
                  <NavLink to={`${url}/allorders`} activeClassName="active" className="navlink">Órdenes</NavLink>
                </nav>
                <button type="button" onClick={() => close()}>Cerrar Sesión</button>
              </div>
              <div>
                <div>
                  <h1>Administradorx</h1>
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
          </div>
        )}
      ;
    </HashRouter>
  );
};
export default Admin;
