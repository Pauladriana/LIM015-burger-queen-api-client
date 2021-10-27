import React, { useEffect } from 'react';
import {
  NavLink,
} from 'react-router-dom';
import '../style/Admin.css';

const Admin = () => {
  useEffect(() => {
  }, []);

  return (
    <div aria-label="admin" className="adminContainer">
      <div className="navContainer">
        <NavLink to="/" aria-label="navlogo" className="navlogo">BQ</NavLink>
        <nav className="nav">
          <NavLink to="/login" activeClassName="active" className="navlink">Iniciar Sesión</NavLink>
        </nav>
      </div>
      <div className="adminBodyContainer">
        <h2>Hola</h2>
      </div>
    </div>
  );
};
export default Admin;
