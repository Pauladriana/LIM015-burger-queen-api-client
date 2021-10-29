import React from 'react';
import {
  HashRouter, NavLink, Switch, Route,
} from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Cookies from 'universal-cookie';
import '../style/Orders.css';
import ChefOrders from './ChefOrders';
import { close, redirectToNotFound } from '../helpers/helpers';
import Chefdelivering from './Chefdelivering';

const cookies = new Cookies();

const Chef = ({ setLoading, setModalMessage }) => {
  return (
    <HashRouter>
      {(cookies.get('userLogged')).roles.name === 'cocinera' || (cookies.get('userLogged')).roles.admin
        ? (
          <div aria-label="chef" className="chefContainer">
            <div className="navContainer">
              <NavLink to="/" aria-label="navlogo" className="navlogo">BQ</NavLink>
              <nav className="nav">
                <NavLink to="/chef/pendingorders" activeClassName="active" className="navlink" aria-label="pending-link">Ordenes Pendientes</NavLink>
                <div className="navLine" />
                <NavLink to="/chef/deliveringorders" activeClassName="active" className="navlink" aria-label="delivering-link">Ordenes Listas</NavLink>
              </nav>
              {(cookies.get('userLogged')).roles.admin
                ? <AccountCircleIcon fontSize="medium" onClick={() => { window.location.href = '#/admin/users'; }} />
                : <div />}
              <ExitToAppIcon fontSize="medium" onClick={() => close()} aria-label="logout" />
            </div>
            <Switch>
              <Route
                exact
                path="/chef/pendingorders"
                component={() => (
                  <ChefOrders setLoading={setLoading} setModalMessage={setModalMessage} />
                )}
              />
              <Route
                exact
                path="/chef/deliveringorders"
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
