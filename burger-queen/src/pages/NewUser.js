import React, { useState } from 'react';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { createUser } from '../services/post';
import '../style/Admin.css';

function NewUser({ setLoading, setModalMessage }) {
  const [newEmail, setValidEmail] = useState(null);
  const [newPassword, setValidPassword] = useState(null);
  const [typeEmail, setValidationEmail] = useState(null);
  const [typePassword, setValidationPassword] = useState(null);
  const [error, setError] = useState(null);
  const [inputType, setInputType] = useState('password');
  const [rol, setRole] = useState({ name: '' });

  const user = {
    email: newEmail,
    password: newPassword,
    roles: rol,
  };

  function goNewEmail(value) {
    const reg = /^\S+@\S+\.\S+$/;
    if (reg.test(value) === true) {
      setError(null);
      setValidationEmail('');
      setValidEmail(value);
    } else {
      setError('email');
      setValidationEmail('La estructura es example@correo.com');
    }
  }

  function goNewPassword(value) {
    const reg = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[.!@#&()–[{}\]:;',?/*~$^+=<>]).{8,}$/;
    if (reg.test(value) === true) {
      setError(null);
      setValidationPassword('');
      setValidPassword(value);
    } else {
      setError('password');
      setValidationPassword('La contraseña debe contener al menos 8 dígitos entre mayúsculas, números y carácteres especiales.');
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (error === 'email') return setModalMessage({ body: 'La estructura del correo es: example@correo.com' });
    if (error === 'password') return setModalMessage({ body: 'La contraseña debe contener al menos 8 dígitos entre mayúsculas, números y carácteres especiales.' });
    if (!user.email || !user.password || !user.roles.name) return setModalMessage({ title: 'Debe ingresar todos los datos' });
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
                placeholder="example@bq.com"
                name="email"
                id="email"
                onChange={(e) => goNewEmail(e.target.value)}
              />
              <p className="goNewEmail formValidation">{typeEmail}</p>
            </div>
            <div className="form-section">
              <label className="form-label" htmlFor="password">Contraseña:</label>
              <input
                type={inputType}
                className="form-input newProductForm"
                placeholder="contraseña"
                name="password"
                id="password"
                onChange={(e) => goNewPassword(e.target.value)}
              />
              {inputType === 'password'
                ? <VisibilityOffIcon onClick={() => setInputType('text')} aria-label="iconOpen" className="login-eye-icon" />
                : <VisibilityIcon onClick={() => setInputType('password')} aria-label="iconClose" className="login-eye-icon" />}
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
                  onChange={(e) => (
                    e.target.checked
                      ? setRole({ admin: false, name: 'cocinera' })
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
