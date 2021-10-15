import { helpHttp } from '../helpers/helpHttp';

const { get } = helpHttp();
const url = 'https://bq-lab-2021.herokuapp.com/';

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
