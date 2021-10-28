import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import '../style/Admin.css';
import Cookies from 'universal-cookie';
import { getData } from '../services/get';
import { redirectToNotFound } from '../helpers/helpers';

const cookies = new Cookies();

function Users({ setModalMessage }) {
  const [users, setUsers] = useState(null);

  const userLogged = cookies.get('userLogged');

  useEffect(() => {
    let cancel = false;
    if (!userLogged) {
      window.location.href = '#/';
    } else {
      getData('users', cookies.get('token'))
        .then((users) => {
          if (cancel) return;
          setUsers(users);
        });
      return () => {
        cancel = true;
      };
    }
  }, []);
  const showUsers = (users) => users.map((user) => (
    <tr key={user._id}>
      <td>{user.email}</td>
      <td>{user.roles.name}</td>
      <td className="tableIdContent">{user._id}</td>
      <td>
        <CreateIcon
          aria-label="editIcon"
          fontSize="small"
          className="optTable"
          onClick={() => { cookies.remove('user', { path: '/' }); cookies.set('user', user); window.location.href = '#/admin/users/edituser'; }}
        />
        <DeleteIcon
          fontSize="small"
          className="optTable"
          onClick={() => {
            if (user._id === userLogged._id) return setModalMessage({ title: 'No puede eliminar su propio usuario.' });
            return setModalMessage({
              title: '¿Está Seguro de eliminar este usuario?',
              body: 'Al removerse no podrá volver a recuperarlo más tarde.',
              button: 'Eliminar',
              id: user._id,
              path: 'users',
            });
          }}
        />
      </td>
    </tr>
  ));

  return (
    <div aria-label="users" className="container">
      {!(cookies.get('userLogged')).roles.admin
        ? redirectToNotFound()
        : (
          <div className="optionContent">
            <div className="tableCnt">
              <table>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Rol</th>
                    <th className="tableIdContent">Id</th>
                  </tr>
                </thead>
                <tbody>
                  {!users
                    ? <tr />
                    : showUsers(users)}
                </tbody>
              </table>
            </div>
            <div className="linkAdmin"><Link to="/admin/users/newuser">Crear Usuario</Link></div>
          </div>
        )}
    </div>
  );
}

export default Users;
