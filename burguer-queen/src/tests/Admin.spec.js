/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom';
import Cookies from 'universal-cookie';
import { render, screen, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import Admin from '../pages/Admin';
import Users from '../pages/Users';
import NewUser from '../pages/Newuser';
import NewProduct from '../pages/Newproduct';

const cookies = new Cookies();

beforeEach(() => {
  cookies.set('userLogged', {
    email: 'some@algo.com',
    password: 'Abc@12345',
    roles: {
      admin: true,
    },
  });
});

describe('Admin component', () => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNjc2MmViZDMwMDZjNWYzOWNhYWVmOSIsImlhdCI6MTYzNTI1ODQyMiwiZXhwIjoxNjM1MzQ0ODIyfQ.I0giRFvqs_gBF0Or_b5k9_KozpU1frWL4LRluQhx_8E';
  it('Should contain texts', () => {
    const { getByLabelText, getByText } = render(<Admin />);
    expect(getByLabelText('navlogo').textContent).toContain('BQ');
    expect(getByText('Usuarios')).toBeInTheDocument();
    expect(getByText('Productos')).toBeInTheDocument();
    expect(getByText('Órdenes')).toBeInTheDocument();
    expect(getByText('Administradorx').tagName).toBe('H1');
  });

  it('Should exit when click exitIcon', async () => {
    const setLoading = () => false;
    const setModalMessage = () => null;
    const { getByLabelText } = render(<Admin setLoading={setLoading} setModalMessage={setModalMessage} />);
    userEvent.click(getByLabelText('exitIcon'));
    expect(cookies.get('userLogged')).toBe(undefined);
  });
  it('Should redirect to Users', () => {
    const history = createMemoryHistory();
    const route = '/admin/users';
    history.push(route);
    const { getByLabelText } = render(
      <Router history={history}>
        <Users />
      </Router>,
    );
    expect(getByLabelText('users')).toBeInTheDocument();
  });
  it('Should redirect to NewUser', () => {
    const setLoading = () => false;
    const setModalMessage = () => null;
    const { getByText } = render(<Admin setLoading={setLoading} setModalMessage={setModalMessage} />);
    userEvent.click(getByText('Usuarios'));
    userEvent.click(getByText('Crear Usuario'));
    expect(screen.getByLabelText('newUser')).toBeInTheDocument();
  });
  it('Should redirect to EditUser', async () => {
    cookies.set('token', token);
    const setLoading = () => false;
    const setModalMessage = () => null;
    const { getByText, getAllByLabelText } = render(<Admin setLoading={setLoading} setModalMessage={setModalMessage} />);
    userEvent.click(getByText('Usuarios'));
    await waitFor(() => {
      expect(screen.getAllByLabelText('editIcon')).toBeDefined();
    });
    act(() => userEvent.click((getAllByLabelText('editIcon'))[0]));
    expect(window.location.hash).toContain('#/admin/users/edituser');
  });
  it('Should redirect to EditProduct', async () => {
    cookies.set('token', token);
    const setLoading = () => false;
    const setModalMessage = () => null;
    const { getByText, getAllByLabelText } = render(<Admin setLoading={setLoading} setModalMessage={setModalMessage} />);
    userEvent.click(getByText('Productos'));
    await waitFor(() => {
      expect(screen.getAllByLabelText('editIcon')).toBeDefined();
    });
    act(() => userEvent.click((getAllByLabelText('editIcon'))[0]));
    expect(window.location.hash).toContain('#/admin/products/editproduct');
  });
  it('Should redirect to Products', () => {
    const setLoading = () => false;
    const setModalMessage = () => null;
    const { getByText } = render(<Admin setLoading={setLoading} setModalMessage={setModalMessage} />);
    userEvent.click(getByText('Productos'));
    expect(screen.getByLabelText('products')).toBeInTheDocument();
  });
  it('Should redirect to NewProduct', () => {
    const setLoading = () => false;
    const setModalMessage = () => null;
    const { getByText } = render(<Admin setLoading={setLoading} setModalMessage={setModalMessage} />);
    userEvent.click(getByText('Productos'));
    userEvent.click(getByText('Crear Producto'));
    expect(screen.getByLabelText('newProduct')).toBeInTheDocument();
  });
  it('Should redirect to Orders', () => {
    const setLoading = () => false;
    const setModalMessage = () => null;
    const { getByText } = render(<Admin setLoading={setLoading} setModalMessage={setModalMessage} />);
    userEvent.click(getByText('Órdenes'));
    expect(screen.getByLabelText('orders')).toBeInTheDocument();
  });
  it('Should redirect to NewUser', () => {
    const history = createMemoryHistory();
    const route = '/admin/users/newuser';
    history.push(route);
    const { getByLabelText } = render(
      <Router history={history}>
        <NewUser />
      </Router>,
    );
    expect(getByLabelText('newUser')).toBeInTheDocument();
  });
  it('Should redirect to NewProduct', () => {
    const history = createMemoryHistory();
    const route = '/admin/products/newproduct';
    history.push(route);
    const { getByLabelText } = render(
      <Router history={history}>
        <NewProduct />
      </Router>,
    );
    expect(getByLabelText('newProduct')).toBeInTheDocument();
  });
  it('Should redirect to NotFound', async () => {
    cookies.set('userLogged', { roles: { admin: false } });
    const setLoading = () => false;
    const setModalMessage = () => null;
    const { getByLabelText } = render(<Admin setLoading={setLoading} setModalMessage={setModalMessage} />);
    expect(getByLabelText('notFound').tagName).toBe('H3');
  });
});
