import * as React from 'react';
import {
  NavLink, Switch, Route, useRouteMatch, HashRouter,
} from 'react-router-dom';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Cookies from 'universal-cookie';
import { close, redirectToNotFound } from '../helpers/helpers';
import WaiterNewOrder from './Waiterneworder';
import AllOrders from './AllOrders';
import '../style/Waiter.css';
import bqLogo from '../media/bq-logo.svg';

const cookies = new Cookies();

const Waiter = ({ setLoading, setModalMessage }) => {
  const { path, url } = useRouteMatch();

  return (
    <HashRouter>
      {(cookies.get('userLogged')).roles.name === 'mesera' || (cookies.get('userLogged')).roles.admin
        ? (
          <div className="waiterContainer">
            <div className="waiterNavContainer">
              {/* <p role="banner" className="logo">BQ</p> */}
              <img role="banner" src={bqLogo} alt="logo" className="waiterHeaderLogo" />
              <nav className="waiterNav">
                <NavLink className="waiterNavLink" to={`${url}/neworder`} activeClassName="waiterNavLinkActive">Generar Orden</NavLink>
                <div className="waiterLine" />
                <NavLink className="waiterNavLink" to={`${url}/allorders`} activeClassName="waiterNavLinkActive">Ver Órdenes</NavLink>
              </nav>
              <ExitToAppIcon onClick={() => close()} />
            </div>
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
        )
        : redirectToNotFound()}
    </HashRouter>
  );
};

export default Waiter;
