import React from 'react';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
export const close = () => {
  cookies.remove('userLogged', { path: '/' });
  cookies.remove('token', { path: '/' });
  window.location.href = '#/login';
};

export const redirectToNotFound = () => <h3 aria-label="notFound">Not found</h3>;

export const goEmail = (email, setMessages) => {
  const reg = /^\S+@\S+\.\S+$/;
  if (reg.test(email) === false) {
    setMessages({
      emailMsg: 'La estructura es example@correo.com',
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
  const reg = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[.!@#&()–[{}\]:;',?/*~$^+=<>]).{8,}$/;
  if (reg.test(password) === false) {
    setMessages({
      emailMsg: '',
      passwordMsg: 'La contraseña debe contener al menos 8 dígitos entre mayúsculas, números y carácteres especiales.',
    });
  } else {
    setMessages({
      emailMsg: '',
      passwordMsg: '',
    });
  }
};
