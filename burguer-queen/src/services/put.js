import { helpHttp } from '../helpers/helpHttp';
import Cookies from 'universal-cookie';

const { put } = helpHttp();
const url = 'https://bq-lab-2021.herokuapp.com/';
const cookies = new Cookies();

export const updateData = (data, path, id, route) => {
    const token = cookies.get('token');
    const {name, price, type, image} = data;
    // setLoading(true);
    return put(`${url}${path}/${id}`, { 
      headers: { 'Authorization': `Bearer ${token}` },
      body: {
          name,
          price: parseInt(price),
          type,
          image,
      },
    })
      .then((data) => {
        console.log(data);
        window.location.href = route;
        // setLoading(false);
        //Agregar mensajes de éxito y error
      })
      .catch(err => console.log(err))
  };

  export const updateUser = (data, path, id, route) => {
    const token = cookies.get('token');
    const {email, password, roles} = data;
    // setLoading(true);
    return put(`${url}${path}/${id}`, { 
      headers: { 'Authorization': `Bearer ${token}` },
      body: {
          email,
          password,
          roles,
      },
    })
      .then((data) => {
        console.log(data);
        window.location.href = route;
        // setLoading(false);
        //Agregar mensajes de éxito y error
      })
      .catch(err => console.log(err))
  };