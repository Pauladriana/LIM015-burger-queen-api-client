import React, {useState } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from '../components/Login';
import Admin from '../components/Admin';
import Waiter from '../components/Waiter';
import Chef from '../components/Chef';
import { helpHttp } from '../helpers/helpHttp';
import Loader from '../components/Loader';
import Modals from '../components/Modals';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const Routes = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [token, setToken] = useState(null);

  const { post } = helpHttp();
  const url = 'https://bq-lab-2021.herokuapp.com/';

  const signIn = (data) => {
    setLoading(true);
      post(`${url}auth`, {body : data})
      .then ((data) =>  {
        setLoading(false);
        if (data.message === 'Invalid password') return setError('Contraseña incorrecta');
        if (data.message === `User doesn't exists`) return setError('Usuario no registrado');
        setError(null);
        setToken(data.token);
        cookies.set('token', data.token, {path: "/"});
        window.location.href="./admin";
      })
      .catch(err => console.log(err)) 
  };

  return (
    <BrowserRouter>
      {loading && <Loader/>}
      {error && <Modals msg={error} setError={setError}/>}
      <Switch>
        <Route exact path="/" component={ () => ( 
          <Login 
            signIn={signIn}
            token={token}
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
