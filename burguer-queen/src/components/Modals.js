import React from 'react';
import '../style/Modal.css';
import { deleteData } from '../services/delete';

const Modals = ({ setLoading, modalMessage, setModalMessage }) => {
  const {
    title, body, button, id, path,
  } = modalMessage;
  const closeModal = () => setModalMessage(null);

  const del = async () => await deleteData(setLoading, setModalMessage, path, id, '/admin');

  return (
    <article onClick={() => closeModal()} className="modal is-open">
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button type="button" onClick={() => closeModal()} className="modal-close">x</button>
        <div className="modal-header">
          {title
            ? <h3>{title}</h3>
            : <div />}
        </div>
        <div className="modal-body">
          {body
            ? <p>{body}</p>
            : <div />}
        </div>
        <div className="modal-footer">
          <button type="button" onClick={() => closeModal()}>Cerrar</button>
          {button
            ? <button type="button" onClick={() => del()}>{button}</button>
            : <div />}
        </div>
      </div>
    </article>
  );
};

export default Modals;
