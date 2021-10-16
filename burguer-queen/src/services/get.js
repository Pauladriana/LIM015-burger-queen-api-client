import { helpHttp } from '../helpers/helpHttp';

const { get } = helpHttp();
const url = 'https://bq-lab-2021.herokuapp.com/';

export const getData = (path, token) => get(`${url}${path}?limit=0`, { 
  headers: { 'Authorization': `Bearer ${token}`},
});

export const getUserLogged = (path, token) => {
  console.log(token);
  return get(`${url}${path}`, { headers: { 'Authorization': `Bearer ${token}` } })
    .then((data) => {;
      console.log(data);
      return data
    })
    .catch(err => console.log(err))
};
