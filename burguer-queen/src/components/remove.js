import React from "react";
import "../style/remove.css";

function Modal({ setOpenModal }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="title">
          <h1>Seguro de eliminar?</h1>
        </div>
        <div className="body">
          <p>Al removerse no podra recuperarse luego</p>
        </div>
        <div className="footer">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Cancelar
          </button>
          <button>Eliminar</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;