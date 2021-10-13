import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../style/Admin.css";
import edit from '../media/pencil.png';
import remove from '../media/close.png';
import Modal from "./remove";

function Users( { setLoading, users }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className='OptionContent'>
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
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.email}</td>
              <td>{user.roles.name}</td>
              <td>{user._id}</td>
              <td><img src={edit} alt='' className='optTable' onClick={() => window.location.href = '/admin/editUser'} /><img src={remove} alt='' className='optTable' onClick={() => {
          setModalOpen(true);
        }}/></td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Link to="/admin/newUser">Crear Usuario</Link>
      {modalOpen && <Modal setOpenModal={setModalOpen} />}
    </div>
  )
}

export default Users;