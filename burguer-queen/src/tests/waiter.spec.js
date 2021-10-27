/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import '@testing-library/jest-dom';
import Cookies from 'universal-cookie';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import Waiter from '../pages/Waiter';

const cookies = new Cookies();
cookies.set('userLogged', {
  email: 'mesera@test.com',
  roles: {
    admin: false,
    name: 'mesera',
  },
});
test('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Waiter />, div);
});
test('Rendering new order', () => {
  const setLoading = () => false;
  const setModalMessage = () => null;
  const history = createMemoryHistory();
  const route = '/meserx';
  history.push(route);
  const { getByLabelText } = render(<Waiter setLoading={setLoading} setModalMessage={setModalMessage} />);
  userEvent.click(getByLabelText('new-order'));
  expect(window.location.href).toContain('/meserx/neworder');
});
test('Rendering all orders', () => {
  const setLoading = () => false;
  const setModalMessage = () => null;
  const history = createMemoryHistory();
  const route = '/meserx';
  history.push(route);
  const { getByLabelText } = render(<Waiter setLoading={setLoading} setModalMessage={setModalMessage} />);
  userEvent.click(getByLabelText('all-order'));
  expect(window.location.href).toContain('/meserx/allorders');
});
test('Logout button on Waiter page', () => {
  const history = createMemoryHistory();
  const route = '/meserx';
  history.push(route);
  const setLoading = () => false;
  const setModalMessage = () => null;
  const { getByLabelText } = render(<Waiter setLoading={setLoading} setModalMessage={setModalMessage} />);
  userEvent.click(getByLabelText('logout'));
  expect(window.location.href).toContain('/#');
});
