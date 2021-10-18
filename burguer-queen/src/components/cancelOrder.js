import React from 'react';
import '../style/remove.css';
import { deleteData } from '../services/delete';

function Cmodal({
  setLoading, setOpenModal, setError, path, id,
}) {
  const del = async () => await deleteData(setLoading, setError, path, id);

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="title">
          <h1>¿Está Seguro de eliminar esta orden?</h1>
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

export default Cmodal;
