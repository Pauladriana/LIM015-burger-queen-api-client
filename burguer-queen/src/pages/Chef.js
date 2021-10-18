import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import ChefOrders from './ChefOrders';

const cookies = new Cookies();

class Chef extends Component {
    cerrarSesion = () => {
        cookies.remove('token', { path: "/" });
        console.log(cookies.get('token'));
        window.location.href = './';
      }

    render () {
        return (
            <div>
                
                <button onClick={() => this.cerrarSesion()}>Cerrar Sesión</button>
                <h1>Ordenes</h1>
                <ChefOrders />
            </div>
        );
    }
}

export default Chef;
