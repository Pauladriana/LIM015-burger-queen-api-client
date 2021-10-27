import React, { useState } from 'react';
import { createUser } from '../services/post';
import '../style/Admin.css';

function NewUser({ setLoading, setModalMessage }) {
  const [newEmail, setValidEmail] = useState(null);
  const [newPassword, setValidPassword] = useState(null);
  const [typeEmail, setValidationEmail] = useState(null);
  const [typePassword, setValidationPassword] = useState(null);

  const [rol, setRole] = useState({ name: '' });

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
    } else {
      setValidationEmail('La estructura es example@correo');
    }
  }

  function goNewPassword(value) {
    const reg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
    if (reg.test(value) === true) {
      setValidationPassword('');
      setValidPassword(value);
    } else {
      setValidationPassword('La contraseña debe contener mayusculas, numeros y caracteres especiales');
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user.email || !user.password || !user.roles) return setModalMessage({ title: 'Debe ingresar todos los datos' });
    await createUser(user, setLoading, setModalMessage, 'users');
  };

  return (
    <div aria-label="newUser" className="container">
      <div className="optionContent">
        <div className="optionContentHeader">
          <button type="button" onClick={() => { window.location.href = '#/admin/users'; }} className="back">Atrás</button>
          <h2> Nuevo Usuario </h2>
        </div>
        <form onSubmit={handleSubmit} className="formUser">
          <div className="formCnt">
            <div className="form-section">
              <label className="form-label" htmlFor="email">Correo:</label>
              <input
                type="text"
                className="form-input newProductForm"
                placeholder="email"
                name="email"
                id="email"
                onChange={(e) => goNewEmail(e.target.value)}
              />
              <p className="goNewEmail formValidation">{typeEmail}</p>
            </div>
            <div className="form-section">
              <label className="form-label" htmlFor="password">Contraseña:</label>
              <input
                type="text"
                className="form-input newProductForm"
                placeholder="contraseña"
                name="password"
                id="password"
                onChange={(e) => goNewPassword(e.target.value)}
              />
              <p className="goNewPassword formValidation">{typePassword}</p>
            </div>
            <label htmlFor="option" className="form-label">Rol:</label>
            <div className="option-group">
              <div className="option-section">
                <input
                  type="radio"
                  name="option"
                  id="adminOpt"
                  onChange={(e) => (
                    e.target.checked
                      ? setRole({ name: 'administradora' })
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
                      ? setRole({ name: 'mesera' })
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
                  onChange={(e) => (
                    e.target.checked
                      ? setRole({ name: 'cocinera' })
                      : setRole({ name: '' })
                  )}
                />
                <label htmlFor="chefOpt" className="form-options">Cocinera</label>
              </div>
            </div>
          </div>
          <button type="submit" className="userSubmit">Guardar</button>
        </form>
      </div>
    </div>
  );
}

export default NewUser;
