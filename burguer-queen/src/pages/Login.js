import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import "../style/Login.css";
import logo from "../media/logo1.svg";
import { signIn } from "../services/fetch";

const cookies = new Cookies();

const Login = ({ setLoading, setError }) => {
  const initialForm = {
    email: "",
    password: "",
  };
  const [form, setForm] = useState(initialForm);
  const [messages, setMessages] = useState({
    emailMsg: "",
    passwordMsg: "",
  });
  // eslint-disable-next-line no-unused-vars
  const [token, setToken] = useState(null);

  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.email || !form.password) return setError("No ingresó correo o contraseña");
    return await signIn(form, setLoading, setError, setToken);
  };

  useEffect(() => {
    if (cookies.get("token")) {
      console.log(cookies.get("token"));
      window.location.href = "./admin";
    }
  }, []);

  const goEmail = () => {
    const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(form.email) === false) {
      setMessages({
        emailMsg: "La estructura es example@correo",
        passwordMsg: "",
      });
    } else {
      setMessages({
        emailMsg: "",
        passwordMsg: "",
      });
    }
  };
  const goPassword = () => {
    const reg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
    if (reg.test(form.password) === false) {
      setMessages({
        emailMsg: "",
        passwordMsg: "La contraseña debe contener mayusculas, numeros y caracteres especiales",
      });
    } else {
      setMessages({
        emailMsg: "",
        passwordMsg: "",
      });
    }
  };

  return (
    <div className='login-container'>
      <div className='login-header'>
        <div className='login-logo'>
          <img className='login-img' src={logo} alt='Logo' />
        </div>
        <div className='login-title'>Iniciar Sesión</div>
      </div>
      <div className='login-formContainer'>
        <form className='login-form' onSubmit={handleSubmit}>
          <div className='login-form-section'>
            <label className='login-form-label'> Correo: </label>
            <input
              type='text'
              className='login-form-input'
              name='email'
              onChange={handleChange}
              value={form.email}
              onKeyUp={() => goEmail()}
            />
            <p className='goEmail'>{messages.emailMsg}</p>
          </div>
          <div className='login-form-section'>
            <label className='login-form-label'>Contraseña: </label>
            <input
              type='password'
              className='login-form-input'
              name='password'
              onChange={handleChange}
              onKeyUp={() => goPassword()}
            />
            <p className='goPassword'>{messages.passwordMsg}</p>
          </div>

          <button className='login-formButton' type='submit'>
            Iniciar Sesion{" "}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
