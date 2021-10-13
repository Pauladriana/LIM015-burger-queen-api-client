import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import UserInfo from '../components/Usertype';
import EditProductForm from '../components/EditFormProduct';
import "../style/Admin.css";
import logo from '../media/LOGOBQO.png';

const cookies = new Cookies();
class EditProduct extends Component {
  close = () => {
    cookies.remove('token', { path: '/' });
    window.location.href = './';
  }
  componentDidMount() {
    if (!cookies.get('token')) {
      window.location.href = './';
    }
  }
  render() {
    return (
      <div>
        <div className='header'>
          <img src={logo} alt='' className='logo' />
          <button onClick={() => this.close()}>Cerrar Sesión</button>
        </div>
        <div>
          <UserInfo />
          <div className='buttonAdmin'>
            <button className='red'>Usuarios</button>
            <button>Productos</button>
            <button>Ordenes</button>
          </div>
        </div>
        <EditProductForm setLoading={this.props.setLoading} setError={this.props.setError}/>
      </div>
    )
  }
}

export default EditProduct