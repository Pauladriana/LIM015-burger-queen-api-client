import React from 'react';
import '../style/Modal.css';
import { deleteData } from '../services/delete';
import { updateOrder } from '../services/put';

const Modals = ({ setLoading, modalMessage, setModalMessage }) => {
  const {
    title, body, button, button2, id, path,
  } = modalMessage;
  const closeModal = () => setModalMessage(null);

  const del = async () => await deleteData(setLoading, setModalMessage, path, id, '/admin');

  const update = async () => await updateOrder(path, id, 'canceled', setModalMessage, 'Orden cancelada');

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
          {button2
            ? <button type="button" onClick={() => update()}>{button2}</button>
            : <div />}
        </div>
      </div>
    </article>
  );
};

export default Modals;
