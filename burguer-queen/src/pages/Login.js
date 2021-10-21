import React, { useState, useEffect } from 'react';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Cookies from 'universal-cookie';
import '../style/Login.css';
import { signIn } from '../services/post';

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
      } else {
        window.location.href = '#/meserx/neworder';
      }
    }
  }, []);

  const goEmail = () => {
    const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(form.email) === false) {
      setMessages({
        emailMsg: 'La estructura es example@correo',
        passwordMsg: '',
      });
    } else {
      setMessages({
        emailMsg: '',
        passwordMsg: '',
      });
    }
  };
  const goPassword = () => {
    const reg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@.$ %^&*-]).{8,}$/;
    if (reg.test(form.password) === false) {
      setMessages({
        emailMsg: '',
        passwordMsg: 'La contraseña debe contener mayúsculas, números y carácteres especiales',
      });
    } else {
      setMessages({
        emailMsg: '',
        passwordMsg: '',
      });
    }
  };

  return (
    <div className="login-container">
      <div className="login-formContainer">
        <p className="login-title">Iniciar Sesion</p>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <label htmlFor="email" className="form-label"> Correo: </label>
            <input
              type="text"
              id="email"
              className="form-input"
              name="email"
              onChange={handleChange}
              value={form.email}
              onKeyUp={() => goEmail()}
            />
            <p className="goEmail formValidation">{messages.emailMsg}</p>
          </div>
          <div className="form-section">
            <label htmlFor="password" className="form-label">Contraseña:</label>
            <label className="login-form-label-password">
              <input
                type={inputType}
                className="form-input"
                name="password"
                id="password"
                onChange={handleChange}
                onKeyUp={() => goPassword()}
              />
              {inputType === 'password'
                ? <VisibilityOffIcon onClick={() => setInputType('text')} className="login-eye-icon" />
                : <VisibilityIcon onClick={() => setInputType('password')} className="login-eye-icon" />}
            </label>
            <p className="goPassword formValidation">{messages.passwordMsg}</p>
          </div>

          <button className="login-formButton" type="submit">
            Iniciar Sesion
            {' '}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
