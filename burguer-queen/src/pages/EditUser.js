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
    } else {
      setValidationEmail('La estructura es example@correo');
    }
  }

  function goNewPassword(value) {
    const reg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!.@$ %^&*-]).{8,}$/;
    if (reg.test(value) === true) {
      setValidationPassword('');
      setValidPassword(value);
    } else {
      setValidationPassword('La contraseña debe contener mayusculas, numeros y caracteres especiales');
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    updateUser(userToEdit, setLoading, setModalMessage, 'users', _id);
  }
  return (
    <div aria-label="editUser" className="container">
      <div className="optionContent">
        <div className="optionContentHeader">
          <button type="button" onClick={() => { window.location.href = '#/admin/users'; }} className="back">Atrás</button>
          <h2> Editar Usuario </h2>
        </div>
        <form onSubmit={handleSubmit} className="formUser">
          <div className="formCnt">
            <div className="form-section">
              <label className="form-label" htmlFor="email">Correo:</label>
              <input
                type="email"
                className="form-input newProductForm"
                placeholder={email}
                name="email"
                id="email"
                onChange={(e) => goNewEmail(e.target.value)}
              />
              <p className="goNewEmail formValidation">{typeEmail}</p>
            </div>
            <div className="form-section">
              <label className="form-label" htmlFor="password">Contraseña:</label>
              <input
                type="password"
                className="form-input newProductForm"
                name="password"
                id="password"
                onChange={(e) => goNewPassword(e.target.value)}
              />
              <p className="goNewPassword formValidation">{typePassword}</p>
              <br />
            </div>
            <span htmlFor="option" className="form-label">Rol:</span>
            <div className="option-group">
              <div className="option-section">
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
                <label htmlFor="adminOpt" className="form-options">Administradora</label>
              </div>
              <div className="option-section">
                <input
                  type="radio"
                  className="form-options"
                  name="opt"
                  id="waiterOpt"
                  onChange={(e) => (
                    e.target.checked
                      ? setRole({ admin: false, name: 'mesera' })
                      : setRole({ name: '' })
                  )}
                />
                <label htmlFor="waiterOpt" className="form-options">Mesera</label>
              </div>
              <div className="option-section">
                <input
                  type="radio"
                  className="form-options"
                  name="opt"
                  id="chefOpt"
                  onChange={(e) => (e.target.checked
                    ? setRole({ admin: false, name: 'cocinera' })
                    : setRole({ name: '' })
                  )}
                />
                <label className="form-options" htmlFor="chefOpt">Cocinera</label>
              </div>
            </div>
          </div>
          <button type="submit" className="userSubmit">Guardar</button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
