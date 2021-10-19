import Cookies from 'universal-cookie';
import { helpHttp } from '../helpers/helpHttp';
import { getUserLogged } from './get';

const { post } = helpHttp();
const url = 'https://bq-lab-2021.herokuapp.com/';
const cookies = new Cookies();

export const signIn = async (data, setLoading, setModalMessage) => {
  setLoading(true);
  console.log(data.email);
  try {
    // obteniendo el token o los mensajes de error de la API
    const response = await post(`${url}auth`, { body: data });
    setLoading(false);
    console.log(response);
    // manejo mensajes de error
    if (response.err && response.message === 'Invalid password') return setModalMessage({ title: 'Contraseña incorrecta.', body: 'Inténtelo nuevamente' });
    if (response.err && response.message === 'User doesn\'t exists') return setModalMessage({ title: 'Usuario no registrado.', body: 'Inténtelo nuevamente' });
    if (response.err) return setModalMessage({ body: 'Upss!!! hubo un error en el sistema, por favor inténtelo nuevamente.' });
    setModalMessage(null);
    cookies.remove('token', { path: '/' });
    cookies.set('token', response.token, { path: '/' });
    // Redireccionamiento de acuerdo al perfil
    const user = await getUserLogged(`users/${data.email}`, response.token);
    cookies.remove('userLogged', { path: '/' });
    cookies.set('userLogged', user, { path: '/' });
    if (user.roles.admin) {
      window.location.hash = '#/admin/users';
    } else if (user.roles.name === 'mesera') {
      window.location.hash = '#/meserx/neworder';
    } else if (user.roles.name === 'cocinera') {
      window.location.hash = '#/chef/pendingorders';
    }
  } catch (err) {
    console.log(err);
    setLoading(false);
    setModalMessage({ body: 'Upss!!! hubo un error en el sistema, por favor inténtelo nuevamente.' });
  }
};

export const createData = (data, setLoading, setModalMessage, path) => {
  setLoading(true);
  const {
    name, type, price, image,
  } = data;
  post(`${url}${path}`, {
    headers: { Authorization: `Bearer ${cookies.get('token')}` },
    body: {
      name,
      type,
      price: Number(price),
      image,
    },
  })
    .then((data) => {
      setLoading(false);
      console.log(data);
      setModalMessage({ title: 'Producto creado exitosamente.' });
    })
    .catch(() => setModalMessage({ body: 'Upss!!! hubo un error en el sistema, por favor inténtelo nuevamente.' }));
};

export const createUser = (data, setLoading, setModalMessage, path) => {
  const { email, password, roles } = data;
  const token = cookies.get('token');
  setLoading(true);
  post(`${url}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
    body: {
      email,
      password,
      roles,
    },
  })
    .then((response) => {
      console.log(response);
      setLoading(false);
      if (response.err && response.message === `User with email: ${data.email} already exists`) {
        return setModalMessage({
          title: `Usuario con email: ${data.email} ya se encuentra registrado`,
        });
      }
      setModalMessage({ title: 'Usuario creado exitosamente' });
    })
    .catch(() => setModalMessage({ body: 'Upss!!! hubo un error en el sistema, por favor inténtelo nuevamente.' }));
};

export const createOrder = (client, products, userId, setLoading, setModalMessage, path) => {
  setLoading(true);
  const token = cookies.get('token');
  post(`${url}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
    body: {
      userId,
      client,
      products,
    },
  })
    .then((data) => {
      setLoading(false);
      console.log(data);
      if (data.err && data.status === 400) return setModalMessage({ title: 'Ups!! no puede crear una orden vacía' });
      setModalMessage({ title: 'Orden creada exitósamente' });
    })
    .catch((err) => {
      console.log(err);
      setModalMessage({ body: 'Upss!!! hubo un error en el sistema, por favor inténtelo nuevamente.' });
    });
};
