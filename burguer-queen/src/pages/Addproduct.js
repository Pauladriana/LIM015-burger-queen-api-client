import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import UserInfo from '../components/Usertype';
import ProductForm from '../components/Newproduct';
import '../style/Admin.css';
import logo from '../media/LOGOBQO.png';


const cookies = new Cookies();

class AddProduct extends Component {
  cerrarSesion = () => {
    cookies.remove('token', { path: '/' });
    console.log(cookies.get('token'));
    window.location.href = './';
  }
  componentDidMount() {
    console.log(cookies.get('token'));
    if (!cookies.get('token')) {
      window.location.href = './';
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
          <button>Usuarios</button>
          <button className='red'>Productos</button>
          <button>Ordenes</button>
        </div>
        </div>
        <ProductForm setLoading={this.props.setLoading} setError={this.props.setError}/>
      </div>
    )
  }
}

export default AddProduct
