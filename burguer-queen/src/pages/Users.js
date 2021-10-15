import React, { useState, useEffect} from 'react';
import { Link, useRouteMatch} from 'react-router-dom';
import Modal from '../components/remove';
import "../style/Admin.css";
import { getData } from '../services/get';
import edit from '../media/pencil.png';
import remove from '../media/close.png';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

function Users( { setLoading, setModalMessage }) {
  let { url } = useRouteMatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [users, setUsers] = useState(null);
  const [id, setId] = useState(null);
  
  useEffect(()=> {
    let cancel = false;
    getData(setLoading, 'users', cookies.get('token'))
      .then((users) => {
        if (cancel) return;
        console.log(users);
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
      <td ><img src={edit} alt='pencil' className='optTable' onClick={() => {cookies.set('user', user); window.location.href = '#/admin/users/editUser'}}/><img src={remove} alt='close' className='optTable' onClick={() => {
        setModalOpen(true);
        setId(user._id);
      }}/></td>
    </tr>
    ));

  return (
    <div className='OptionContent'>
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
      {modalOpen && <Modal setLoading={setLoading}  setOpenModal={setModalOpen} setModalMessage={setModalMessage} path='users' id={id}/>}
    </div>
  )
}

export default Users;