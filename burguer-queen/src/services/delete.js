import { helpHttp } from '../helpers/helpHttp';
import Cookies from 'universal-cookie';

const { del } = helpHttp();
const url = 'https://bq-lab-2021.herokuapp.com/';
const cookies = new Cookies();

export const deleteData = (setLoading, setError, path, id, route) => {
  setLoading(true);
    const token = cookies.get('token');
    return del(`${url}${path}/${id}`, { 
      headers: { 'Authorization': `Bearer ${token}` },
    })
      .then((data) => {
        setLoading(false);
        console.log(data);
        setError('¡Producto eliminado!');
        // window.location.href = route;
      })
      .catch(err => console.log(err))
  };
