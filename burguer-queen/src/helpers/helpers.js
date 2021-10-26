import React from 'react';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
export const close = () => {
  cookies.remove('userLogged', { path: '/' });
  cookies.remove('token', { path: '/' });
  window.location.href = '#/';
};

export const redirectToNotFound = () => <h3 aria-label="notFound">Not found</h3>;

export const goEmail = (email, setMessages) => {
  const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (reg.test(email) === false) {
    setMessages({
      emailMsg: 'La estructura es example@correo',
      passwordMsg: '',
    });
  } else {
    setMessages({
      emailMsg: '',
      passwordMsg: '',
    });
  }
};
export const goPassword = (password, setMessages) => {
  const reg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@.$ %^&*-]).{8,}$/;
  if (reg.test(password) === false) {
    setMessages({
      emailMsg: '',
      passwordMsg: 'La contraseña debe contener mayúsculas, números y carácteres especiales',
    });
  } else {
    setMessages({
      emailMsg: '',
      passwordMsg: '',
    });
  }
};
