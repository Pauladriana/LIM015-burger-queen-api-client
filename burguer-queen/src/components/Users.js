import React from 'react';
import { Link } from 'react-router-dom'
import "../style/Admin.css";

function Users() {
  return (
    <div class='OptionContent'>
      <div className='tableCnt'>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Rol</th>
              <th>Id</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Paquita Martinez</td>
              <td>Mesera</td>
              <td>654fygfyeslsmjjjfuufu</td>
              <td>E</td>
            </tr>
            <tr>
              <td>Federica Salas</td>
              <td>Cocinera</td>
              <td>3546846548csuhriyg</td>
              <td>E</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Link to="/admin/newUser">Crear Usuario</Link>
    </div>
  )
}

export default Users;