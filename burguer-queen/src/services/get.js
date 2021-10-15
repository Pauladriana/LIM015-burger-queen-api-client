import { helpHttp } from '../helpers/helpHttp';
import Cookies from 'universal-cookie';

const { get } = helpHttp();
const url = 'https://bq-lab-2021.herokuapp.com/';
const cookies = new Cookies();

const token = cookies.get('token');

export const getData = (setLoading, path, token) => {
  return get(`${url}${path}`, { headers: { 'Authorization': `Bearer ${token}` } })
    // .then((data) => {
    //   setLoading(false);
    //   // setData(data);
    //   return data;
    // })
    // .catch(err => console.log(err))
};

export const getUserLogged = (path, token) => {
  // setLoading(true);
  console.log(token);
  return get(`${url}${path}`, { headers: { 'Authorization': `Bearer ${token}` } })
    .then((data) => {
      //Agregar mensajes de error
      // setData(data);
      console.log(data);
      return data
    })
    .catch(err => console.log(err))
};