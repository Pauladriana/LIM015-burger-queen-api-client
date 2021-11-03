import React, { useState, useEffect } from 'react';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Cookies from 'universal-cookie';
import {
  HashRouter,
  NavLink,
} from 'react-router-dom';
import '../style/Login.css';
import { signIn } from '../services/post';
import { goEmail, goPassword } from '../helpers/helpers';

const cookies = new Cookies();

const Login = ({ setLoading, setModalMessage }) => {
  const [inputType, setInputType] = useState('password');

  const initialForm = {
    email: '',
    password: '',
  };
  const [form, setForm] = useState(initialForm);
  const [messages, setMessages] = useState({
    emailMsg: '',
    passwordMsg: '',
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      return setModalMessage({
        title: 'No ingresó correo o contraseña.',
        body: 'Inténtelo nuevamente',
      });
    }
    await signIn(form, setLoading, setModalMessage);
  };

  useEffect(() => {
    if (cookies.get('userLogged')) {
      if ((cookies.get('userLogged')).roles.admin) {
        window.location.href = '#/admin/users';
      } else if ((cookies.get('userLogged')).roles.name === 'cocinera') {
        window.location.href = '#/chef/pendingorders';
      } else {
        window.location.href = '#/meserx/neworder';
      }
    }
  }, []);

  return (
    <div className="home">
      <div className="navContainer">
        <HashRouter>
          <NavLink to="/" aria-label="navlogo" className="navlogo">BQ</NavLink>
          <nav className="nav">
            <NavLink to="/" className="navlink">Inicio</NavLink>
            <div className="navLine" />
            <NavLink to="/login" className="navlink">Iniciar Sesión</NavLink>
          </nav>
        </HashRouter>
      </div>
      <div aria-label="login" className="login-container">
        <div className="login-formContainer">
          <p role="heading" aria-level="1" className="login-title">Iniciar Sesión</p>
          <form aria-label="form" className="login-form" onSubmit={handleSubmit}>
            <div className="form-section">
              <label aria-label="email" htmlFor="email" className="form-label"> Correo: </label>
              <input
                aria-label="emailInput"
                type="text"
                id="email"
                className="form-input"
                name="email"
                value={form.email}
                onChange={(e) => { handleChange(e); goEmail(form.email, setMessages); }}
              />
              <p className="goEmail formValidation">{messages.emailMsg}</p>
            </div>
            <div className="form-section">
              <label aria-label="password" htmlFor="password" className="form-label">Contraseña:</label>
              <input
                aria-label="passwordInput"
                type={inputType}
                className="form-input"
                name="password"
                id="password"
                onChange={(e) => { handleChange(e); goPassword(form.password, setMessages); }}
              />
              {inputType === 'password'
                ? <VisibilityOffIcon onClick={() => setInputType('text')} aria-label="iconOpen" className="login-eye-icon" />
                : <VisibilityIcon onClick={() => setInputType('password')} aria-label="iconClose" className="login-eye-icon" />}
              <p className="goPassword formValidation">{messages.passwordMsg}</p>
            </div>

            <button aria-label="iniciarSesion" className="login-formButton" type="submit">
              Iniciar Sesión
              {' '}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
