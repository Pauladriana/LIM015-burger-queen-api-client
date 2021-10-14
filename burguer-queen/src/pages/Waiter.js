import React, { Component } from 'react';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Waiter extends Component {
    cerrarSesion = () => {
        cookies.remove('token', { path: "/" });
        window.location.href = './';
      }

    render () {
        return (
            <div>
                <h1>Waiter</h1>
                <button onClick={() => this.cerrarSesion()}>Cerrar Sesión</button>
            </div>
        );
    }
}

export default Waiter;