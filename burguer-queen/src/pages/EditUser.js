import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import '../style/Admin.css';
import { updateUser } from '../services/put';

const cookies = new Cookies();

const EditUser = ({ setLoading, setModalMessage }) => {
  const [newEmail, setValidEmail] = useState(null);
  const [newPassword, setValidPassword] = useState(null);
  const [typeEmail, setValidationEmail] = useState(null);
  const [typePassword, setValidationPassword] = useState(null);

  useEffect(() => {
    if (!cookies.get('userLogged')) {
      window.location.href = '#/';
    }
  }, []);

  const {
    _id, email, roles, password,
  } = cookies.get('user');

  const [editedRol, setRole] = useState(roles);

  const userToEdit = {
    email: (newEmail || email),
    password: (newPassword || password),
    roles: (editedRol || roles),
  };

  function goNewEmail(value) {
    const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(value) === true) {
      setValidationEmail('');
      setValidEmail(value);
      console.log(newEmail);
    } else {
      setValidationEmail('La estructura es example@correo');
    }
  }

  function goNewPassword(value) {
    const reg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!.@$ %^&*-]).{8,}$/;
    if (reg.test(value) === true) {
      setValidationPassword('');
      setValidPassword(value);
      console.log(newPassword);
    } else {
      setValidationPassword('La contraseña debe contener mayusculas, numeros y caracteres especiales');
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    updateUser(userToEdit, setLoading, setModalMessage, 'users', _id);
  }
  return (
    <div className="container">
      <button type="button" onClick={() => { window.location.href = '#/admin/users'; }} className="back">Atrás</button>
      <h2> Editar Usuario </h2>
      <form onSubmit={handleSubmit} className="formUser">
        <div className="formCnt">
          <div className="form-group">
            <label htmlFor="email">Correo:</label>
            <br />
            <input
              type="email"
              className="form-control"
              placeholder={email}
              name="email"
              id="email"
              onChange={(e) => goNewEmail(e.target.value)}
            />
            <br />
            <p className="goNewEmail">{typeEmail}</p>
            <br />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <br />
            <input
              type="password"
              className="form-control"
              name="password"
              id="password"
              onChange={(e) => goNewPassword(e.target.value)}
            />
            <br />
            <p className="goNewPassword">{typePassword}</p>
            <br />
          </div>
          <span>Rol:</span>
          <div className="opt-group">
            <input
              type="radio"
              className="form-opt"
              name="opt"
              id="adminOpt"
              onChange={(e) => (
                e.target.checked
                  ? setRole({ admin: true, name: 'administradora' })
                  : setRole({ name: '' })
              )}
            />
            <label htmlFor="adminOpt">Administradora</label>
            <br />
            <input
              type="radio"
              className="form-optl"
              name="opt"
              id="waiterOpt"
              onChange={(e) => (
                e.target.checked
                  ? setRole({ admin: false, name: 'mesera' })
                  : setRole({ name: '' })
              )}
            />
            <label htmlFor="waiterOpt">Mesera</label>
            <br />
            <input
              type="radio"
              className="form-opt"
              name="opt"
              id="chefOpt"
              onChange={(e) => (e.target.checked
                ? setRole({ admin: false, name: 'cocinera' })
                : setRole({ name: '' })
              )}
            />
            <label htmlFor="chefOpt">Cocinera</label>
            <br />
          </div>
        </div>
        <button type="submit" className="userSubmit">Guardar</button>
      </form>
    </div>
  );
};

export default EditUser;
