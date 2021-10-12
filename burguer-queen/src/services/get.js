import { helpHttp } from '../helpers/helpHttp';
import Cookies from 'universal-cookie';

const { get } = helpHttp();
const url = 'https://bq-lab-2021.herokuapp.com/';
const cookies = new Cookies();

const token = cookies.get('token');

export const getData = (setLoading, setData, path) => {
  // setLoading(true);
  get(`${url}${path}`, { headers: { 'Authorization': `Bearer ${token}` } })
    .then((data) => {
      //Agregar mensajes de error
      setLoading(false);
      setData(data);
    })
    .catch(err => console.log(err))
};
