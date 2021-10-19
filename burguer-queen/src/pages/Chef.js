import React from 'react';
import {
  HashRouter, NavLink, Switch, Route, useRouteMatch,
} from 'react-router-dom';
import Cookies from 'universal-cookie';
import ChefOrders from './ChefOrders';
import { close, redirectToNotFound } from '../helpers/helpers';
import Chefdelivering from './Chefdelivering';

const cookies = new Cookies();

const Chef = ({ setLoading, setModalMessage }) => {
  const { path, url } = useRouteMatch();
  return (
    <HashRouter>
      {(cookies.get('userLogged')).roles.name === 'cocinera'
        ? (
          <div>
            <div className="chefHeader">
              <img alt="logo" className="chefHeaderLogo" />
              <nav>
                <li>
                  <NavLink to={`${url}/pendingorders`} activeClassName=".active">Ordenes Pendientes</NavLink>
                  <NavLink to={`${url}/deliveringorders`} activeClassName=".active">Ordenes Listas</NavLink>
                </li>
              </nav>
              <button type="button" onClick={() => close()}> Cerrar Sesión</button>
            </div>
            <h1>Ordenes</h1>
            <div>
              <Switch>
                <Route
                  exact
                  path={`${path}/pendingorders`}
                  component={() => (
                    <ChefOrders setLoading={setLoading} setModalMessage={setModalMessage} />
                  )}
                />
                <Route
                  exact
                  path={`${path}/deliveringorders`}
                  component={() => (
                    <Chefdelivering setLoading={setLoading} setModalMessage={setModalMessage} />
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

export default Chef;
