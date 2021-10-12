import { helpHttp } from '../helpers/helpHttp';
import Cookies from 'universal-cookie';

const { del } = helpHttp();
const url = 'https://bq-lab-2021.herokuapp.com/';
const cookies = new Cookies();

export const deleteData = (setError, path, id, route) => {
    const token = cookies.get('token');
    // setLoading(true);
    return del(`${url}${path}/${id}`, { 
      headers: { 'Authorization': `Bearer ${token}` },
    })
      .then((data) => {
        console.log(data);
        window.location.href = route;
        // setLoading(false);
        //Agregar mensajes de éxito y error
      })
      .catch(err => console.log(err))
  };
