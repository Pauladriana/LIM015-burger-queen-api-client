import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const Login = ({signIn, token, setError}) => {
    const initialForm = {
        email: '',
        password: ''
    }
    const [form, setForm] = useState(initialForm);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!form.email || !form.password) return setError('No ingresó correo o contraseña');
        return signIn(form);
    };
    
    useEffect(() => {
        if(cookies.get('token')){
            console.log(cookies.get('token'));
            window.location.href="./admin";
        }
    }, []); 

        return (
            <div className='principalCnt'>
                <div className='secondCnt'>
                    <form className='form' onSubmit={handleSubmit}>
                        <label> Correo: </label>
                        <br />
                        <input 
                        type='text' className='form-control' name='email' onChange={handleChange} value={form.email}/>
                        <br />
                        <label>Contraseña: </label>
                        <br />
                        <input 
                        type='password' className='form-control' name='password' onChange={handleChange}/>
                        <br />
                        <button className='btn btn-login' type='submit'>Iniciar Sesion </button>
                    </form>
                </div>
            </div>
        );

}

export default Login;