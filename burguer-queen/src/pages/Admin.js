import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import AdminPage from '../components/Adminpage';
import "../style/Admin.css";
import logo from '../media/LOGOBQO.png';


const cookies = new Cookies();

class Admin extends Component {
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
        < AdminPage />
      </div>
    )
  }
}

export default Admin;
