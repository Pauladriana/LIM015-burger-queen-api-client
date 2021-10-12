import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import UserInfo from '../components/Usertype';
import EditProductForm from '../components/EditFormProduct';
import "../style/Admin.css";
import logo from '../media/LOGOBQO.png';
import { updateData } from '../services/put';

const cookies = new Cookies();

class EditProduct extends Component {


  cerrarSesion = () => {
    cookies.remove('token', { path: "/" });
    console.log(cookies.get('token'));
    window.location.href = './';
  }
  componentDidMount() {
    console.log(cookies.get('token'));
    if (!cookies.get('token')) {
      window.location.href = "./";
    }
  }
  render() {
    return (
      <div>
        <div className='header'>
          <img src={logo} alt='' className='logo' />
          <button onClick={() => this.cerrarSesion()}>Cerrar Sesión</button>
        </div>
        <div>
          <UserInfo />
          <div className='buttonAdmin'>
            <button className='red'>Usuarios</button>
            <button>Productos</button>
            <button>Ordenes</button>
          </div>
        </div>
        <EditProductForm
        item='Cafe Americano'
        descr='Cafe y agua'
        type='Desayuno'
        cost='S/5'
        />
      </div>
    )
  }
}

export default EditProduct