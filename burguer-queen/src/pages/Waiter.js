import * as React from 'react';
import {
  NavLink, Switch, Route, HashRouter,
} from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Cookies from 'universal-cookie';
import { close, redirectToNotFound } from '../helpers/helpers';
import WaiterNewOrder from './Waiterneworder';
import AllOrders from './AllOrders';
import '../style/Waiter.css';

const cookies = new Cookies();

const Waiter = ({ setLoading, setModalMessage }) => {
  return (
    <HashRouter>
      {(cookies.get('userLogged')).roles.name === 'mesera' || (cookies.get('userLogged')).roles.admin
        ? (
          <div aria-label="waiter" className="waiterContainer">
            <div className="navContainer">
              <p role="banner" className="navlogo">BQ</p>
              <nav className="nav">
                <NavLink className="navlink" to="/meserx/neworder" activeClassName="active" aria-label="new-order">Generar Orden</NavLink>
                <div className="navLine" />
                <NavLink className="navlink" to="/meserx/allorders" activeClassName="active" aria-label="all-order">Ver Órdenes</NavLink>
              </nav>
              {(cookies.get('userLogged')).roles.admin
                ? <AccountCircleIcon fontSize="medium" onClick={() => { window.location.href = '#/admin/users'; }} />
                : <div />}
              <ExitToAppIcon fontSize="medium" onClick={() => close()} aria-label="logout" />
            </div>
            <Switch>
              <Route
                path="/meserx/neworder"
                component={() => (
                  <WaiterNewOrder setLoading={setLoading} setModalMessage={setModalMessage} />
                )}
              />
              <Route
                exact
                path="/meserx/allorders"
                component={() => (
                  <AllOrders setLoading={setLoading} setModalMessage={setModalMessage} />
                )}
              />
            </Switch>
          </div>
        )
        : redirectToNotFound()}
    </HashRouter>
  );
};

export default Waiter;
