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
    .then(() => {
      setLoading(false);
      setModalMessage({ title: '¡Producto actualizado exitosamente!' });
    })
    .catch((err) => {
      console.info(err);
      setModalMessage({ body: 'Upss!!! hubo un error en el sistema, por favor inténtelo nuevamente.' });
    });
};

export const updateUser = (data, setLoading, setModalMessage, path, id) => {
  const token = cookies.get('token');
  setLoading(true);
  return put(`${url}${path}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
    body: data,
  })
    .then(() => {
      setLoading(false);
      setModalMessage({ title: '!Usuario actualizado exitosamente!' });
    })
    .catch((err) => {
      console.info(err);
      setModalMessage({ body: 'Upss!!! hubo un error en el sistema, por favor inténtelo nuevamente.' });
    });
};

export const updateOrder = (path, id, status, setModalMessage, orderMessage) => {
  const token = cookies.get('token');
  return put(`${url}${path}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
    body: {
      status,
    },
  })
    .then(() => {
      setModalMessage({ title: orderMessage });
    })
    .catch((err) => {
      console.info(err);
      setModalMessage({ body: 'Upss!!! hubo un error en el sistema, por favor inténtelo nuevamente.' });
    });
};
