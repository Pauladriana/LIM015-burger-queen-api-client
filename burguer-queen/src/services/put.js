import { helpHttp } from '../helpers/helpHttp';

const { put } = helpHttp();
const url = 'https://bq-lab-2021.herokuapp.com/';

export const updateData = (data, setLoading, setModalMessage, path, id, token) => {
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
    .then((res) => {
      setLoading(false);
      if (res._id) {
        setModalMessage({ title: '¡Producto actualizado exitosamente!' });
        return res;
      }
      return setModalMessage({ body: 'Upss!!! hubo un error en el sistema, por favor inténtelo nuevamente.' });
    });
};

export const updateUser = (data, setLoading, setModalMessage, path, id, token) => {
  setLoading(true);
  return put(`https://bq-lab-2021.herokuapp.com/${path}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
    body: data,
  })
    .then((res) => {
      console.log(res);
      setLoading(false);
      if (res._id) {
        setModalMessage({ title: '!Usuario actualizado exitosamente!' });
        return res;
      }
      setModalMessage({ body: 'Upss!!! hubo un error en el sistema, por favor inténtelo nuevamente.' });
    });
};

export const updateOrder = (path, id, status, setModalMessage, orderMessage, token) => {
  return put(`${url}${path}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
    body: {
      status,
    },
  })
    .then((res) => {
      if (res._id) {
        setModalMessage({ title: orderMessage });
        return res;
      }
      setModalMessage({ body: 'Upss!!! hubo un error en el sistema, por favor inténtelo nuevamente.' });
    });
};
