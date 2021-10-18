import React, { useState } from 'react';
import { Switch, Route, HashRouter } from 'react-router-dom';
import Login from '../pages/Login';
import Admin from '../pages/Admin';
import Error404 from '../pages/Error404';
import Waiter from '../pages/Waiter';
import Chef from '../pages/Chef';
import Loader from '../components/Loader';
import Modals from '../components/Modals';

const Routes = () => {
  const [modalMessage, setModalMessage] = useState(null);
  const [loading, setLoading] = useState(null);

  return (
    <HashRouter>
      {loading && <Loader />}
      {modalMessage && <Modals setLoading={setLoading} modalMessage={modalMessage} setModalMessage={setModalMessage} />}
      <Switch>
        <Route
          exact
          path="/"
          component={() => (
            <Login setLoading={setLoading} setModalMessage={setModalMessage} />
          )}
        />
        <Route
          path="/admin"
          component={() => (
            <Admin setLoading={setLoading} setModalMessage={setModalMessage} />)}
        />
        <Route
          path="/meserx"
          component={() => (
            <Waiter setLoading={setLoading} setModalMessage={setModalMessage} />)}
        />
        <Route
          exact
          path="/chef"
          component={() => (
            <Chef setLoading={setLoading} setModalMessage={setModalMessage} />)}
        />
        <Route path="*"><Error404 /></Route>
      </Switch>
    </HashRouter>
  );
};

export default Routes;
