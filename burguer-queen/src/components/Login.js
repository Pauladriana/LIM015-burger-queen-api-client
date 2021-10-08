import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';

const url = 'https://bq-lab-2021.herokuapp.com/';
const cookies = new Cookies();

class Login extends Component {
    state = {
        form:{
            username: '',
            password:'',
        }
    };
    handleChange = async (e) => {
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
    };
    
    iniciarSesion = () => {
        axios.post(`${url}auth`, {email: this.state.form.username, password: this.state.form.password})
        .then((res) => res.data)
        .then((res) => {
          if (res.token) {
            cookies.set('token', res.token, {path: "/"});
          }
          window.location.href="./admin";
        })
        .catch((rej) => console.log('error aquí',rej.message))
    };

    componentDidMount() {
        if(cookies.get('token')){
            console.log(cookies.get('token'));
            window.location.href="./admin";
        }
    }

    render () {
        return (
            <div className='principalCnt'>
                <div className='secondCnt'>
                    <div className='form' >
                        <label> Usuario: </label>
                        <br />
                        <input 
                        type='text' className='form-control' name='username' onChange={this.handleChange}/>
                        <br />
                        <label>Contraseña: </label>
                        <br />
                        <input 
                        type='password' className='form-control' name='password' onChange={this.handleChange}/>
                        <br />
                        <button className='btn btn-login' onClick={() => this.iniciarSesion()}>Iniciar Sesion </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;