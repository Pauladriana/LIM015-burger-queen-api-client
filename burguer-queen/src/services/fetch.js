import { helpHttp } from '../helpers/helpHttp';
import Cookies from 'universal-cookie';

const { post } = helpHttp();
const url = 'https://bq-lab-2021.herokuapp.com/';
const cookies = new Cookies();

export const signIn = (data, setLoading, setError, setToken) => {
    setLoading(true);
      return post(`${url}auth`, {body : data})
      .then ((data) =>  {
        setLoading(false);
        if (data.message === 'Invalid password') return setError('Contraseña incorrecta.');
        if (data.message === `User doesn't exists`) return setError('Usuario no registrado.');
        setError(null);
        setToken(data.token);
        cookies.set('token', data.token, {path: "/"});
        window.location.href="./admin";
      })
      .catch(err => console.log(err)) 
};

export const createUser = (data, setLoading, setError) => {
  setLoading(true);
    return post(`${url}auth`, {body : data})
    .then ((data) =>  {
      setLoading(false);
      if (data.message === 'Invalid password') return setError('Contraseña incorrecta.');
      if (data.message === `User doesn't exists`) return setError('Usuario no registrado.');
      setError(null);
      cookies.set('token', data.token, {path: "/"});
      window.location.href="./admin";
    })
    .catch(err => console.log(err)) 
};
