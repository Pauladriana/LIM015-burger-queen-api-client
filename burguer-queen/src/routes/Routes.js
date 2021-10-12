import React, {useState } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from '../pages/Login';
import Admin from '../pages/Admin';
import AddUser from '../pages/AddUser';
import EditUser from '../pages/EditUser';
import EditProduct from '../pages/EditProduct';
import AddProduct from '../pages/Addproduct';
import Waiter from '../pages/Waiter';
import Chef from '../pages/Chef';
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
        <Route exact path="/admin" component={() => (
          <Admin
            setLoading={setLoading}
            setError={setError}
          />)
        }/>
        <Route exact path="/admin/newUser" component={AddUser}/>
        <Route exact path="/admin/editUser" component={EditUser}/>
        <Route exact path="/admin/editProduct" component={() => (
          <EditProduct
            setLoading={setLoading}
          />
          )
        }/>
        <Route exact path="/admin/newProduct" component={ () => (
          <AddProduct setLoading={setLoading} setError={setError}/>
        )
        }/>
        <Route exact path="/waiter" component={Waiter}/>
        <Route exact path="/chef" component={Chef}/>
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
