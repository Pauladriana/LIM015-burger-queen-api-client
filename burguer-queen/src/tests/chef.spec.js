/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import '@testing-library/jest-dom';
import Cookies from 'universal-cookie';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import Chef from '../pages/Chef';

const cookies = new Cookies();
cookies.set('userLogged', {
  email: 'chef@test.com',
  roles: {
    admin: false,
    name: 'cocinera',
  },
});
test('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Chef />, div);
});
test('Rendering pending orders', () => {
  const setLoading = () => false;
  const setModalMessage = () => null;
  const history = createMemoryHistory();
  const route = '/chef';
  history.push(route);
  const { getByLabelText } = render(<Chef setLoading={setLoading} setModalMessage={setModalMessage} />);
  userEvent.click(getByLabelText('pending-link'));
  expect(window.location.href).toContain('/chef/pendingorders');
});
test('Rendering delivering orders', () => {
  const setLoading = () => false;
  const setModalMessage = () => null;
  const history = createMemoryHistory();
  const route = '/chef';
  history.push(route);
  const { getByLabelText } = render(<Chef setLoading={setLoading} setModalMessage={setModalMessage} />);
  userEvent.click(getByLabelText('delivering-link'));
  expect(window.location.href).toContain('/chef/deliveringorders');
});
test('Logout button on Chef page', () => {
  const history = createMemoryHistory();
  const route = '/chef';
  history.push(route);
  const setLoading = () => false;
  const setModalMessage = () => null;
  const { getByLabelText } = render(<Chef setLoading={setLoading} setModalMessage={setModalMessage} />);
  userEvent.click(getByLabelText('logout'));
  expect(window.location.href).toContain('/#');
});
