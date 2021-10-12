import React, {useState } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from '../components/Login';
import Admin from '../components/Admin';
import Waiter from '../components/Waiter';
import Chef from '../components/Chef';
import Loader from '../components/Loader';
import Modals from '../components/Modals';

const Routes = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  
  return (
    <BrowserRouter>
      {loading && <Loader/>}
      {error && <Modals msg={error} setError={setError}/>}
      <Switch>
        <Route exact path="/" component={ () => ( 
          <Login 
            setLoading={setLoading}
            setError={setError}/>
          )} 
        />
        <Route exact path="/admin" component={Admin}/>
        <Route exact path="/waiter" component={Waiter}/>
        <Route exact path="/chef" component={Chef}/>
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
