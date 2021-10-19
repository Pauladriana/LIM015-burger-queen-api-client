import React from 'react';
import {
  NavLink, Switch, Route, useRouteMatch, HashRouter,
} from 'react-router-dom';
import Cookies from 'universal-cookie';
import { close, redirectToNotFound } from '../helpers/helpers';
import '../style/Waiter.css';
import WaiterNewOrder from './Waiterneworder';
import AllOrders from './AllOrders';

const cookies = new Cookies();

const Waiter = ({ setLoading, setModalMessage }) => {
  const { path, url } = useRouteMatch();
  return (
    <HashRouter>
      {(cookies.get('userLogged')).roles.name === 'mesera'
        ? (
          <div>
            <div className="waiterHeader">
              <img alt="logo" className="waiterHeaderLogo" />
              <nav>
                <li>
                  <NavLink to={`${url}/neworder`} activeClassName=".active">Generar Orden</NavLink>
                  <NavLink to={`${url}/allorders`} activeClassName=".active">Ver Órdenes</NavLink>
                </li>
              </nav>
              <button type="button" onClick={() => close()}> Cerrar Sesión</button>
            </div>
            <div>
              <Switch>
                <Route
                  path={`${path}/neworder`}
                  component={() => (
                    <WaiterNewOrder setLoading={setLoading} setModalMessage={setModalMessage} />
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
        )
        : redirectToNotFound()}
    </HashRouter>
  );
};

export default Waiter;
