import React from 'react';
import {
  HashRouter, NavLink, Switch, Route, useRouteMatch,
} from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
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
      {(cookies.get('userLogged')).roles.name === 'cocinera' || (cookies.get('userLogged')).roles.admin
        ? (
          <div className="chefContainer">
            <div className="navContainer">
              <p role="banner" className="navlogo">BQ</p>
              <nav className="nav">
                <NavLink to={`${url}/pendingorders`} activeClassName="active" className="navlink">Ordenes Pendientes</NavLink>
                <div className="navLine" />
                <NavLink to={`${url}/deliveringorders`} activeClassName="active" className="navlink">Ordenes Listas</NavLink>
              </nav>
              <ExitToAppIcon fontSize="medium" onClick={() => close()} />
            </div>
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
        )
        : redirectToNotFound()}
    </HashRouter>
  );
};

export default Chef;
