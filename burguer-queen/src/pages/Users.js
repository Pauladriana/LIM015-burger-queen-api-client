import React, { useState, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
// import ModalRemove from '../components/Modalremove';
import '../style/Admin.css';
import { getData } from '../services/get';
import edit from '../media/pencil.png';
import remove from '../media/close.png';
import Cookies from 'universal-cookie';
import { redirectToNotFound } from '../helpers/helpers';

const cookies = new Cookies();

function Users({ setLoading, setModalMessage }) {
  const { url } = useRouteMatch();
  // const [modalOpen, setModalOpen] = useState(false);
  const [users, setUsers] = useState(null);
  // const [id, setId] = useState(null);

  const userLogged = cookies.get('userLogged');
  useEffect(() => {
    if (!userLogged) return window.location.href = "#/";
  }, []);


  useEffect(() => {
    let cancel = false;
    getData('users', cookies.get('token'))
      .then((users) => {
        if (cancel) return;
        setUsers(users);
      });
    return () => {
      cancel = true;
    }
  }, []);
 
  const showUsers = (users) => users.map((user) => (
    <tr key={user._id}>
      <td >{user.email}</td>
      <td >{user.roles.name}</td>
      <td >{user._id}</td>
      <td ><img src={edit} alt='pencil' className='optTable' onClick={() => { cookies.set('user', user); window.location.href = '#/admin/users/editUser' }} /><img src={remove} alt='close' className='optTable' onClick={() => {
        // setId(user._id);
        setModalMessage({
         title:'¿Está Seguro de eliminar este usuario?',
         body:'Al removerse no podrá volver a recuperarlo.',
         button:'Eliminar',
         id: user._id,
         path: 'users',
        })
      }} /></td>
    </tr>
  ));
  
  return (
    <div>
      {!(cookies.get('userLogged')).roles.admin
        ? redirectToNotFound()
        : <div className='OptionContent'>
          <div className='tableCnt'>
            <h2>Usuarios</h2>
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
                {!users
                  ? <div></div>
                  : showUsers(users)}
              </tbody>
            </table>
          </div>
          <Link to={`${url}/newuser`}>Crear Usuario</Link>
          {/* {modalOpen && <ModalRemove setLoading={setLoading} setOpenModal={setModalOpen} setModalMessage={setModalMessage} path='users' id={id} />} */}
        </div>
      }
    </div>
  )
}

export default Users;