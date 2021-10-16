import React from 'react';
import '../style/Modal.css';
import {deleteData} from '../services/delete';

const Modals = ({setLoading,  modalMessage, setModalMessage }) => {
 let {title, body, button, id, path} = modalMessage;
  const closeModal = () => setModalMessage(null);

  const del = async () => await deleteData(setLoading, setModalMessage, path, id, '/admin');

  return (
    <article onClick={() => closeModal()} className={'modal is-open'}>
      <div className='modal-container' onClick={e => { e.stopPropagation() }}>
        <button onClick={() => closeModal()} className="modal-close">x</button>
        <div className='modal-header'>
          {title
            ? <h3>{title}</h3>
            : <div></div>
          }
        </div>
        <div className='modal-body'>
          {body
            ? <p>{body}</p>
            : <div></div>
          }
        </div>
        <div className='modal-footer'>
          <button onClick={() => closeModal()}>Cerrar</button>
          {button
            ? <button onClick={() => del()}>{button}</button>
            : <div></div>
          }
        </div>
      </div>
    </article>
  );
};

export default Modals;
