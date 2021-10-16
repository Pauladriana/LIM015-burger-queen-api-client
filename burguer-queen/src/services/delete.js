import { helpHttp } from '../helpers/helpHttp';
import Cookies from 'universal-cookie';

const { del } = helpHttp();
const url = 'https://bq-lab-2021.herokuapp.com/';
const cookies = new Cookies();

export const deleteData = (setLoading, setModalMessage, path, id, route) => {
  console.log(id);
  setLoading(true);
    const token = cookies.get('token');
    return del(`${url}${path}/${id}`, { 
      headers: { 'Authorization': `Bearer ${token}` },
    })
      .then((data) => {
        setLoading(false);
        setModalMessage({body: '¡Producto eliminado!'});
      })
      .catch(() => setModalMessage('Upss!!! hubo un error en el sistema, por favor inténtelo nuevamente.'))
  };
