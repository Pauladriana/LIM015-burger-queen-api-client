import { close } from '../helpers/helpers';
import '../style/Waiter.css';
import { NavLink, Switch, Route, useRouteMatch, HashRouter } from 'react-router-dom';
import NewOrder from '../components/NewOrder';
import AllOrders from '../components/AllOrders';

const Waiter = ({setLoading, setModalMessage}) => {
  let { path, url } = useRouteMatch();
  console.log(path);
  console.log(url);
  return (
    <HashRouter>
      <div className='waiterHeader'>
        <img alt='logo' className='waiterHeaderLogo' />
        <nav>
          <li>
            <NavLink to={`${url}/neworder`} activeClassName='.active'>Generar Orden</NavLink>
            <NavLink to={`${url}/allorders`} activeClassName='.active'>Ver Ordenes</NavLink>
          </li>
        </nav>
        <button onClick={() => close()}> Cerrar Sesión</button>
      </div>
      <div>
        <Switch>
          <Route path={`${path}/neworder`} component={NewOrder}/>
          <Route path={`${path}/allorders`} component={AllOrders}/>
        </Switch>
      </div>
    </HashRouter>
  )
}

export default Waiter;