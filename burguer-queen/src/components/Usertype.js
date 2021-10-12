import React from 'react';
import "../style/Admin.css";
import userPhoto from '../media/man.png';

function UserInfo() {
  return(
    <div>
        <h1>Administrador</h1>
        <div class='userData'>
          <img src={ userPhoto} alt='' className='userPhoto' />
          <p><b>Ana Perez</b></p>
          <p>admin@localhost.com</p>
        </div>
    </div>
  )
}

export default UserInfo;