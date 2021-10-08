import React, { Component } from 'react';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Admin extends Component {
    cerrarSesion = ()=>{
        cookies.remove('token', {path: "/"});
        console.log(cookies.get('token'));
        window.location.href = './';
    }
    componentDidMount() {
        console.log(cookies.get('token'));
        if(!cookies.get('token')){
            window.location.href="./";
        }
    }
    render () {
        return (
            <div>
                <h1>Admin</h1>
                <br />
                <button onClick={()=>this.cerrarSesion()}>Cerrar Sesión</button>
            </div>
        );
    }
}

export default Admin;
