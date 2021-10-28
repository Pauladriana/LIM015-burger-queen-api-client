import React, { useEffect } from 'react';
import {
  NavLink,
} from 'react-router-dom';
import '../style/Routes.css';

const Admin = () => {
  useEffect(() => {
  }, []);

  return (
    <div aria-label="admin" className="adminContainer">
      <div className="navContainer">
        <NavLink to="/" aria-label="navlogo" className="navlogo">BQ</NavLink>
        <nav className="nav">
          <NavLink to="/" activeClassName="active" className="navlink">Inicio</NavLink>
          <NavLink to="/login" activeClassName="active" className="navlink">Iniciar Sesión</NavLink>
        </nav>
      </div>
      <div className="landingBodyContainer">
        <h1 className="landingTitle">Bienvenidx a Burger Queen</h1>
      </div>
    </div>
  );
};
export default Admin;
