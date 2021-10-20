import React from 'react';
import {
  HashRouter, NavLink, Switch, Route, useRouteMatch,
} from 'react-router-dom';
import Cookies from 'universal-cookie';
import '../style/Orders.css';
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
              <p className="logo">BQ</p>
              <nav>
                <NavLink to={`${url}/pendingorders`} activeClassName="active" className="chef-navlink">Ordenes Pendientes</NavLink>
                <NavLink to={`${url}/deliveringorders`} activeClassName="active" className="chef-navlink">Ordenes Listas</NavLink>
              </nav>
              <button type="button" onClick={() => close()}> Cerrar Sesión</button>
            </div>
            <div>
              <Switch>
                <Route
                  exact
                  path={`${path}/pendingorders`}
                  component={() => (
                    <div className="chef-ordersContainer">
                      <h1>Ordenes Pendientes</h1>
                      <ChefOrders setLoading={setLoading} setModalMessage={setModalMessage} />
                    </div>
                  )}
                />
                <Route
                  exact
                  path={`${path}/deliveringorders`}
                  component={() => (
                    <div className="chef-ordersContainer">
                      <h1>Ordenes Listas</h1>
                      <Chefdelivering setLoading={setLoading} setModalMessage={setModalMessage} />
                    </div>
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
