import React from 'react';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
export const close = () => {
  cookies.remove('userLogged', { path: '/' });
  cookies.remove('token', { path: '/' });
  window.location.href = '#/';
};

export const redirectToNotFound = () => <h3> Not found </h3>;
