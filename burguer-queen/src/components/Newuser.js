import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {createUser} from '../services/post';
import "../style/Admin.css";

function UserForm(setLoading, setError) {
  const [newEmail, setValidEmail] = useState(null);
  const [newPassword, setValidPassword] = useState(null);
  const [typeEmail, setValidationEmail] = useState(null);
  const [typePassword, setValidationPassword] = useState(null);

  const [rol, setRole] = useState({name: ''});

  const user = {
    email: newEmail,
    password: newPassword,
    roles: rol,
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    // if (!user.email || !user.password || !user.roles) return setError('Debe ingresar todos los datos');
    return await createUser(user, setLoading, setError, 'users');
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
              type="text"
              className="form-control"
              placeholder="email"
              name='email'
              id='email'
              onChange={(e) => goNewEmail(e.target.value)}
            />
            <br />
            <p className='goNewEmail'>{typeEmail}</p>
            <br />
          </div>
          <div className="form-group">
            <label for="password">Contraseña:</label><br />
            <input
              type="text"
              className="form-control"
              placeholder="contraseña"
              name="password"
              id='password'
              onChange={(e) => goNewPassword(e.target.value) }
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
              onChange={(e) => {
                e.target.checked
                  ? setRole({name: 'administradora'})
                  : setRole({name: ''});
              }}
            />
            <label for="adminOpt">Administradora</label><br />
            <input
              type="radio"
              className="form-optl"
              name="opt"
              id="waiterOpt"
              onChange={(e) => {
                e.target.checked
                  ? setRole({name: 'mesera'})
                  : setRole({name: ''});
              }}
            />
            <label for="waiterOpt">Mesera</label><br />
            <input
              type="radio"
              className="form-opt"
              name="opt"
              id="chefOpt"
              onChange={(e) => {
                e.target.checked
                  ? setRole({name: 'cocinera'})
                  : setRole({name: ''});
              }}
            />
            <label for="chefOpt">Cocinera</label><br />
          </div>
        </div>
        <button type="submit" className='userSubmit'>Guardar</button>
      </form>
    </div>
  )
}

export default UserForm