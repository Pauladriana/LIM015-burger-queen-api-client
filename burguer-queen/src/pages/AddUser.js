import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import UserInfo from '../components/Usertype';
import UserForm from '../components/Newuser';
import "../style/Admin.css";
import logo from '../media/LOGOBQO.png';


const cookies = new Cookies();

class AddUser extends Component {
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
        <UserForm />
      </div>
    )
  }
}

export default AddUser
