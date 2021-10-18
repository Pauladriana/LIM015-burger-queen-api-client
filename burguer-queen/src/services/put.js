import { helpHttp } from '../helpers/helpHttp';
import Cookies from 'universal-cookie';

const { put } = helpHttp();
const url = 'https://bq-lab-2021.herokuapp.com/';
const cookies = new Cookies();

export const updateData = (data, setLoading, setError, path, id, route) => {
    const token = cookies.get('token');
    const {name, price, type, image} = data;
    setLoading(true);
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
        setLoading(false);
        // console.log(data);
        cookies.set('product', data);
        setError('¡Producto actualizado exitosamente!');
        // window.location.href = route;
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


  export const updateOrder = (data, path, id, status) => {
    const token = cookies.get('token');
    console.log(id);
    console.log(typeof id);
    const {userId, client} = data;
    // setLoading(true);
    return put(`${url}${path}/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` },
      body: {
        userId,
        client,
        status: status,
      },
    })
      .then((data) => {
        console.log(data);
        // setLoading(false);
        //Agregar mensajes de éxito y error
      })
      .catch(err => console.log(err))
  };