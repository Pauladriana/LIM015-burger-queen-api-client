import * as React from 'react';
import {
  NavLink, Switch, Route, useRouteMatch, HashRouter,
} from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Cookies from 'universal-cookie';
import { close, redirectToNotFound } from '../helpers/helpers';
import WaiterNewOrder from './Waiterneworder';
import AllOrders from './AllOrders';
import '../style/Waiter.css';

const cookies = new Cookies();

const Waiter = ({ setLoading, setModalMessage }) => {
  const { path, url } = useRouteMatch();

  return (
    <HashRouter>
      {(cookies.get('userLogged')).roles.name === 'mesera' || (cookies.get('userLogged')).roles.admin
        ? (
          <div aria-label="waiter" className="waiterContainer">
            <div className="navContainer">
              <p role="banner" className="navlogo">BQ</p>
              <nav className="nav">
                <NavLink className="navlink" to={`${url}/neworder`} activeClassName="active">Generar Orden</NavLink>
                <div className="navLine" />
                <NavLink className="navlink" to={`${url}/allorders`} activeClassName="active">Ver Órdenes</NavLink>
              </nav>
              <ExitToAppIcon fontSize="medium" onClick={() => close()} />
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
