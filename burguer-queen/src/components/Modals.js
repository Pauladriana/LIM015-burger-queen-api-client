import React from 'react';
import Cookies from 'universal-cookie';
import '../style/Modal.css';
import { deleteData } from '../services/delete';
import { updateOrder } from '../services/put';

const cookies = new Cookies();

const Modals = ({ setLoading, modalMessage, setModalMessage }) => {
  const {
    title, body, button, button2, id, path,
  } = modalMessage;
  const closeModal = () => setModalMessage(null);
  const del = async () => await deleteData(setLoading, setModalMessage, path, id, cookies.get('token'));

  const update = async () => await updateOrder(path, id, 'canceled', setModalMessage, 'Orden cancelada', cookies.get('token'));

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
          <button type="button" className="modal-cancel" onClick={() => closeModal()}>Cerrar</button>
          {button
            ? <button type="button" className="modal-remove" onClick={() => del()}>{button}</button>
            : <div />}
          {button2
            ? <button type="button" className="modal-update" onClick={() => update()}>{button2}</button>
            : <div />}
        </div>
      </div>
    </article>
  );
};

export default Modals;
