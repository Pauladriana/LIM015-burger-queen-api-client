import React from 'react';
import '../style/remove.css';
import { deleteData } from '../services/delete';

function ModalRemove({
  setLoading, setOpenModal, setModalMessage, path, id,
}) {
  const del = async () => { await deleteData(setLoading, setModalMessage, path, id, '/admin'); };

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="title">
          <h1>¿Está Seguro de eliminar este producto?</h1>
        </div>
        <div className="body">
          <p>Al removerse no podra recuperarse luego</p>
        </div>
        <div className="footer">
          <button
            type="button"
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Cancelar
          </button>
          <button type="button" onClick={() => del()}>Eliminar</button>
        </div>
      </div>
    </div>
  );
}

export default ModalRemove;
