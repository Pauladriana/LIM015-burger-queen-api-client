import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from '../components/Login';
import Admin from '../pages/Admin';
import AddUser from '../pages/AddUser';
import AddProduct from '../pages/Addproduct';
import Waiter from '../pages/Waiter';
import Chef from '../pages/Chef';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route exact path="/admin" component={Admin}/>
        <Route exact path="/admin/newUser" component={AddUser}/>
        <Route exact path="/admin/newProduct" component={AddProduct}/>
        <Route exact path="/waiter" component={Waiter}/>
        <Route exact path="/chef" component={Chef}/>
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
