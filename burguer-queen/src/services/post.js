import { helpHttp } from '../helpers/helpHttp';
import Cookies from 'universal-cookie';

const { post } = helpHttp();
const url = 'https://bq-lab-2021.herokuapp.com/';
const cookies = new Cookies();

export const signIn = (data, setLoading, setError) => {
  setLoading(true);
  return post(`${url}auth`, { body: data })
    .then(data => {
      setLoading(false);
      if (data.message === 'Invalid password') return setError('Contraseña incorrecta.');
      if (data.message === `User doesn't exists`) return setError('Usuario no registrado.');
      setError(null);
      cookies.remove('token');
      cookies.set('token', data.token, { path: '/' });
      window.location.href = './admin';
    })
    .catch(err => console.log(err));
};

export const createData = (data, setLoading, setError, path) => {
  setLoading(true);
  const {name, type, price, image} = data;
  const token = cookies.get('token');
  post(`${url}${path}`, { 
    headers: { 'Authorization': `Bearer ${token}` },
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
      setError('Producto creado exitosamente.');
      //setLoading(false);
      // window.location.href = './';
      //Agregar mensajes de exito y error
    })
    .catch(err => console.log(err))
};

export const createUser = (data, setLoading, setError, path) => {
  const {email, password, roles} = data;
  const token = cookies.get('token');
  // setLoading(true);
  post(`${url}${path}`, {
    headers: { 'Authorization': `Bearer ${token}` },
    body: {
      email,
      password,
      roles,
    }
  })
    .then((data) => {
      console.log(data);
      window.location.href = './';
      // setLoading(false);
      //Agregar mensajes de exito y error
    })
    .catch(err => console.log(err))
};
