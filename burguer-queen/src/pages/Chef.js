import React from 'react';
import Cookies from 'universal-cookie';
import ChefOrders from './ChefOrders';

const cookies = new Cookies();

const Chef = () => {
  const cerrarSesion = () => {
    cookies.remove('token', { path: '/' });
    console.log(cookies.get('token'));
    window.location.href = './';
  };

  return (
    <div>
      <button type="button" onClick={() => cerrarSesion()}>Cerrar Sesión</button>
      <h1>Ordenes</h1>
      <ChefOrders />
    </div>
  );
};

export default Chef;
