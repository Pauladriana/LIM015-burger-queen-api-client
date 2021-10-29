import { helpHttp } from '../helpers/helpHttp';

const { del } = helpHttp();
const url = 'https://bq-lab-2021.herokuapp.com/';

export const deleteData = (setLoading, setModalMessage, path, id, token) => {
  setLoading(true);
  return del(`${url}${path}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => {
      setLoading(false);
      if (res._id) {
        setModalMessage({ body: '¡Eliminado!' });
        return res;
      }
      setModalMessage({ body: 'Upss!!! hubo un error en el sistema, por favor inténtelo nuevamente.' });
    });
};
