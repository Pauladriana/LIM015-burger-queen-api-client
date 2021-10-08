import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from '../components/Login';
import Admin from '../components/Admin';
import Waiter from '../components/Waiter';
import Chef from '../components/Chef';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route exact path="/admin" component={Admin}/>
        <Route exact path="/waiter" component={Waiter}/>
        <Route exact path="/chef" component={Chef}/>
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
