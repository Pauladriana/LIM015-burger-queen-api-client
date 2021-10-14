import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from './remove';
import "../style/Admin.css";
import edit from '../media/pencil.png';
import remove from '../media/close.png';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

function Users( { setLoading, users, setError }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [id, setId] = useState(null);

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
              <td >{user.email}</td>
              <td >{user.roles.name}</td>
              <td >{user._id}</td>
              <td ><img src={edit} alt='' className='optTable' onClick={() => {cookies.set('user', user); window.location.href = '/admin/editUser'}}/><img src={remove} alt='' className='optTable' onClick={() => {
                setModalOpen(true);
                setId(user._id);
              }}/></td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Link to="/admin/newUser">Crear Usuario</Link>
      {modalOpen && <Modal setLoading={setLoading}  setOpenModal={setModalOpen} setError={setError} path='users' id={id}/>}
    </div>
  )
}

export default Users;