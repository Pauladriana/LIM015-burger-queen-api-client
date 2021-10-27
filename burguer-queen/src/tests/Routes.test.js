/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import '@testing-library/jest-dom';
import Cookies from 'universal-cookie';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Routes from '../routes/Routes';
import Login from '../pages/Login';
import Admin from '../pages/Admin';
import Waiter from '../pages/Waiter';
import Chef from '../pages/Chef';
import Error404 from '../pages/Error404';

const cookies = new Cookies();
cookies.set('userLogged', {
  email: 'admin@test.com',
  roles: {
    admin: true,
  },
});

test('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Routes />, div);
});
test('rendering Admin component', () => {
  const history = createMemoryHistory();
  const route = '/admin';
  history.push(route);
  render(
    <Router history={history}>
      <Admin />
    </Router>,
  );

  expect(screen.getByLabelText('admin')).toBeInTheDocument();
});

test('rendering Login component', () => {
  const history = createMemoryHistory();
  const route = '/';
  history.push(route);
  render(
    <Router history={history}>
      <Login />
    </Router>,
  );

  expect(screen.getByLabelText('login')).toBeInTheDocument();
});

test('rendering Waiter component', () => {
  const history = createMemoryHistory();
  const route = '/meserx';
  history.push(route);
  render(
    <Router history={history}>
      <Waiter />
    </Router>,
  );

  expect(screen.getByLabelText('waiter')).toBeInTheDocument();
});

test('rendering Chef component', () => {
  const history = createMemoryHistory();
  const route = '/chef';
  history.push(route);
  render(
    <Router history={history}>
      <Chef />
    </Router>,
  );

  expect(screen.getByLabelText('chef')).toBeInTheDocument();
});

test('rendering Error404 component', () => {
  const history = createMemoryHistory();
  const route = 'fail';
  history.push(route);
  render(
    <Router history={history}>
      <Error404 />
    </Router>,
  );

  expect(screen.getByLabelText('notFound')).toBeInTheDocument();
});
