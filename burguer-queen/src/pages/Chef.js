import React, { Component } from 'react';
import Cookies from 'universal-cookie';

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
                <h1>Chef</h1>
                <button onClick={() => this.cerrarSesion()}>Cerrar Sesión</button>
            </div>
        );
    }
}

export default Chef;
