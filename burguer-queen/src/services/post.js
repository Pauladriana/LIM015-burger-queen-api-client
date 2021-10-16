import { helpHttp } from '../helpers/helpHttp';
import Cookies from 'universal-cookie';
import { getUserLogged } from './get'

const { post } = helpHttp();
const url = 'https://bq-lab-2021.herokuapp.com/';
const cookies = new Cookies();

export const signIn = (data, setLoading, setModalMessage) => {
  const email = data.email;
  setLoading(true);
  return post(`${url}auth`, { body: data })
    .then(data => {
      setLoading(false);
      if (data.message === 'Invalid password') return setModalMessage('Contraseña incorrecta.');
      if (data.message === `User doesn't exists`) return setModalMessage('Usuario no registrado.');
      setModalMessage(null);
      const token = data.token;
      cookies.remove('token', { path: '/' });
      cookies.set('token', data.token, { path: '/' });
      return getUserLogged(`users/${email}`, token);
    }).then((res) => {
      cookies.remove('userLogged', { path: '/' });
      cookies.set('userLogged', res, { path: '/' });
      if (res.roles.admin) {
        window.location.hash = '#/admin/users';
      } else if (res.roles.name === 'mesera') {
        window.location.hash = '#/meserx/neworder';
      } else if (res.roles.name === 'cocinera') {
        window.location.hash = '#/chef';
      }
    })
    .catch(err => setModalMessage('Upss!!! hubo un error en el sistema, por favor inténtelo nuevamente.'));
};

export const createData = (data, setLoading, setModalMessage, path) => {
  setLoading(true);
  const { name, type, price, image } = data;
  post(`${url}${path}`, {
    headers: { 'Authorization': `Bearer ${cookies.get('token')}` },
    body: {
      name,
      type,
      price: parseInt(price),
      image,
    }
  })
    .then((data) => {
      setLoading(false);
      console.log(data);
      setModalMessage('Producto creado exitosamente.');
    })
    .catch(err => setModalMessage('Upss!!! hubo un error en el sistema, por favor inténtelo nuevamente.'))
};

export const createUser = (data, setLoading, setModalMessage, path) => {
  const { email, password, roles } = data;
  const token = cookies.get('token');
  setLoading(true);
  post(`${url}${path}`, {
    headers: { 'Authorization': `Bearer ${token}` },
    body: {
      email,
      password,
      roles,
    }
  })
    .then((data) => {
      setLoading(false);
      console.log(data);
      setModalMessage('Usuario creado exitosamente');
    })
    .catch(err => setModalMessage('Upss!!! hubo un error en el sistema, por favor inténtelo nuevamente.'))
};

export const createOrder = (client, products, userId, setLoading, setModalMessage, path) => {
  setLoading(true);
  const token = cookies.get('token');
  post(`${url}${path}`, {
    headers: { 'Authorization': `Bearer ${token}` },
    body: {
      userId,
      client,
      products,
    }
  })
    .then((data) => {
      console.log(data);
      setLoading(false);
      setModalMessage('Orden creada exitosamente');
    })
    .catch(err => setModalMessage('Upss!!! hubo un error en el sistema, por favor inténtelo nuevamente.'))
};
