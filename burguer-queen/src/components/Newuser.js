import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import "../style/Admin.css";

function UserForm() {
  const [newEmail, setValidEmail] = useState('');
  const [newPassword, setValidPassword] = useState('');
  const [typeEmail, setValidationEmail] = useState('');
  const [typePassword, setValidationPassword] = useState('');

  function goNewEmail(value) {
    const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(value) === true) {
      setValidationEmail('');
      setValidEmail(value);
      console.log(newEmail)
    }
    else {
      setValidationEmail('La estructura es example@correo');
    }
  }

  function goNewPassword(value) {
    const reg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
    if (reg.test(value) === true) {
      setValidationPassword('');
      setValidPassword(value);
      console.log(newPassword)
    }
    else {
      setValidationPassword('La contraseña debe contener mayusculas, numeros y caracteres especiales');
    }
  }

  function handleSubmit(event) {
    event.preventDefault()
    window.location.href = "./";
  }
  return (
    <div className="container">
      <Link to="/admin" className='back'>Atras</Link>
      <h2> Nuevo Usuario </h2>
      <form onSubmit={handleSubmit} className='formUser'>
        <div className='formCnt'>
          <div className="form-group">
            <label for="email">Correo:</label><br />
            <input
              type="email"
              className="form-control"
              placeholder="email"
              name="email"
              id='email'
              onChange={e => goNewEmail(e.target.value)}
            />
            <br />
            <p className='goNewEmail'>{typeEmail}</p>
            <br />
          </div>
          <div className="form-group">
            <label for="password">Contraseña:</label><br />
            <input
              type="password"
              className="form-control"
              placeholder="contraseña"
              name="password"
              id='password'
              onChange={e => goNewPassword(e.target.value)}
            />
            <br />
            <p className='goNewPassword'>{typePassword}</p>
            <br />
          </div>
          <span>Rol:</span>
          <div className="opt-group">
            <input
              type="radio"
              className="form-opt"
              name="opt"
              id="adminOpt"
            />
            <label for="adminOpt">Administrador</label><br />
            <input
              type="radio"
              className="form-optl"
              name="opt"
              id="waiterOpt"
            />
            <label for="waiterOpt">Mesero</label><br />
            <input
              type="radio"
              className="form-opt"
              name="opt"
              id="chefOpt"
            />
            <label for="chefOpt">Cocinero</label><br />
          </div>
        </div>
        <button type="submit" className='userSubmit'>Guardar</button>
      </form>
    </div>
  )
}

export default UserForm