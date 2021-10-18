import Cookies from 'universal-cookie';
import { helpHttp } from '../helpers/helpHttp';

const { put } = helpHttp();
const url = 'https://bq-lab-2021.herokuapp.com/';
const cookies = new Cookies();

export const updateData = (data, setLoading, setModalMessage, path, id) => {
  const token = cookies.get('token');
  const {
    name, price, type, image,
  } = data;
  setLoading(true);
  return put(`${url}${path}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
    body: {
      name,
      price: Number(price),
      type,
      image,
    },
  })
    .then((data) => {
      setLoading(false);
      cookies.set('product', data);
      setModalMessage({ title: '¡Producto actualizado exitosamente!' });
    })
    .catch((err) => console.log(err));
};

export const updateUser = (data, setLoading, setModalMessage, path, id) => {
  const token = cookies.get('token');
  setLoading(true);
  return put(`${url}${path}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
    body: data,
  })
    .then((data) => {
      setLoading(false);
      console.log(data);
      console.log(cookies.get('user'));
      setModalMessage({ title: '!Usuario actualizado exitosamente!' });
    })
    .catch((err) => console.log(err));
};
