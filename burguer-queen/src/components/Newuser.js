import React from 'react';
import { Link } from 'react-router-dom'
import "../style/Admin.css";

function UserForm() {
  function handleSubmit(event) {
    event.preventDefault()
    window.location.href="./";
  }
  return (
    <div className="container">
      <Link to="/admin" className='back'>Atras</Link>
      <h2> Nuevo Usuario </h2>
      <form onSubmit={handleSubmit} className='formUser'>
        <div className="form-group">
          <label for="email">Correo:</label><br />
          <input
            type="email"
            className="form-control"
            placeholder="email"
            name="email"
            id='email'
          />
        </div>
        <div className="form-group">
        <label for="password">Contraseña:</label><br />
          <input
            type="password"
            className="form-control"
            placeholder="contraseña"
            name="password"
            id='password'
          />
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

        <button type="submit" className='userSubmit'>Guardar</button>
      </form>
    </div>
  )
}

export default UserForm