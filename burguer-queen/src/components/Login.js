import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import '../style/Login.css';
import logo from '../media/logo1.svg';
import { signIn } from '../services/fetch';

const cookies = new Cookies();

const Login = ({setLoading, setError}) => {
    const initialForm = {
        email: '',
        password: ''
    };
    const [form, setForm] = useState(initialForm);
    // eslint-disable-next-line no-unused-vars
    const [token, setToken] = useState(null);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!form.email || !form.password) return setError('No ingresó correo o contraseña');
        return await signIn( form, setLoading, setError, setToken);
    };
    
    useEffect(() => {
        if(cookies.get('token')){
            console.log(cookies.get('token'));
            window.location.href="./admin";
        }
    }, []); 

        return (
            <div className='container'>
                <div className='header'>
                    <div className='logo'>
                        <img src={logo} alt='Logo'/>
                    </div>
                    <div className='title'>Iniciar Sesión</div>
                </div>
                <div className='formContainer'>
                    <form className='form' onSubmit={handleSubmit}>
                        <div className='form-section'>
                        <label className='form-label'> Correo: </label>
                        <input 
                        type='text' className='form-input' name='email' onChange={handleChange} value={form.email}/>
                        </div>
                        <div className='form-section'>
                        <label className='form-label'>Contraseña: </label>
                        <input 
                        type='password' className='form-input' name='password' onChange={handleChange}/>
                        </div>

                        <button className='formButton' type='submit'>Iniciar Sesion </button>
                    </form>
                </div>
            </div>
        );
}

export default Login;