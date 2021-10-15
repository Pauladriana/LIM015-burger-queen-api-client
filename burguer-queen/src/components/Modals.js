import React from 'react';
import '../style/Modal.css';

const Modals = ({ modalMessage, setModalMessage}) => {
    const closeModal = () => {
        setModalMessage(null);
    };
    return (
        <article onClick={() => closeModal()}className={'modal is-open'}>
            <div className='modal-container' onClick={ e => { e.stopPropagation()}}>
                <button onClick={() => closeModal()} className="modal-close">x</button>
                <div className='modal-body'>
                    <p>{modalMessage}</p>
                </div>
            </div>
        </article>
    );
};

export default Modals;
