import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import OrdersPage from '../components/OrdersPage'

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
                <OrdersPage setLoading={this.props.setLoading} setError={this.props.setError}/>
                <button onClick={() => this.cerrarSesion()}>Cerrar Sesión</button>
            </div>
        );
    }
}

export default Waiter;