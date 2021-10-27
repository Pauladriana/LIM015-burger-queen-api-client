/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom';
import Cookies from 'universal-cookie';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import Login from '../pages/Login';

const cookies = new Cookies();
cookies.set('userLogged', {
  email: 'some@algo.com',
  password: 'Abc@12345',
  roles: {
    admin: true,
  },
});

describe('Login component', () => {
  it('Should contain texts', () => {
    render(<Login />);
    expect(screen.getByRole('heading').textContent).toContain('Iniciar Sesión');
    expect(screen.getByLabelText('email').textContent).toContain('Correo:');
    expect(screen.getByLabelText('password').textContent).toContain('Contraseña:');
    expect(screen.getByLabelText('iniciarSesion').textContent).toContain('Iniciar Sesión');
  });

  it('calls the onSubmit function', async () => {
    const mockOnSubmit = jest.fn();
    const setLoading = () => false;
    const setModalMessage = () => null;
    const { getByLabelText } = render(<Login onSubmit={mockOnSubmit} setLoading={setLoading} setModalMessage={setModalMessage} />);

    await act(async () => {
      fireEvent.change(getByLabelText('emailInput'), { target: { value: 'some@algo.com' } });
    });
    await act(async () => {
      fireEvent.change(getByLabelText('passwordInput'), { target: { value: 'Abc@12345' } });
    });

    await act(async () => {
      fireEvent.click(getByLabelText('iniciarSesion'));
    });

    expect(typeof mockOnSubmit).toBe('function');
  });
  it('Should fail when email value is "" ', async () => {
    const mockOnSubmit = jest.fn();
    const setLoading = () => false;
    const setModalMessage = () => null;
    const { getByLabelText } = render(<Login onSubmit={mockOnSubmit} setLoading={setLoading} setModalMessage={setModalMessage} />);

    await act(async () => {
      fireEvent.change(getByLabelText('emailInput'), { target: { value: '' } });
    });
    await act(async () => {
      fireEvent.change(getByLabelText('passwordInput'), { target: { value: 'Abc@12345' } });
    });

    await act(async () => {
      fireEvent.click(getByLabelText('iniciarSesion'));
    });

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });
  it('Should change password visibility', async () => {
    const setLoading = () => false;
    const setModalMessage = () => null;
    const { getByLabelText } = render(<Login setLoading={setLoading} setModalMessage={setModalMessage} />);
    userEvent.click(getByLabelText('iconOpen'));
    expect(getByLabelText('passwordInput').type).toBe('text');
    userEvent.click(getByLabelText('iconClose'));
    expect(getByLabelText('passwordInput').type).toBe('password');
  });
});
