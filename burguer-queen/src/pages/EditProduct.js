import React, { useState, useEffect } from 'react';

import Cookies from 'universal-cookie';
import { updateData } from '../services/put';

const cookies = new Cookies();

const EditProductForm = ({ setLoading, setModalMessage }) => {
  const product = cookies.get('product');
  const {
    _id, name, type, price, image,
  } = cookies.get('product');

  const [productToEdit, setProductToEdit] = useState(product);

  useEffect(() => {
    if (!cookies.get('userLogged')) {
      window.location.href = '#/';
    }
  }, []);

  const handleChange = (e) => {
    setProductToEdit({
      ...productToEdit,
      [e.target.name]: e.target.value,
    });
  };

  function handleSubmit(event) {
    event.preventDefault();
    if (!productToEdit) return setModalMessage({ title: 'Debe ingresar al menos un campo' });
    updateData(productToEdit, setLoading, setModalMessage, 'products', _id);
  }
  return (
    <div aria-label="editProduct" className="container">
      <div className="optionContent">
        <div className="optionContentHeader">
          <button type="button" onClick={() => { window.location.href = '#/admin/products'; }} className="back">Atrás</button>
          <h2> Editar Producto </h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="formCnt">
            <div className="form-section">
              <label className="form-label" htmlFor="name">Nombre:</label>
              <input
                type="text"
                className="form-input newProductForm"
                placeholder={name}
                name="name"
                id="name"
                onChange={handleChange}
              />
            </div>
            <div className="form-section">
              <label className="form-label" htmlFor="type">Menú:</label>
              <input
                type="text"
                className="form-input newProductForm"
                placeholder={type}
                name="type"
                id="type"
                onChange={handleChange}
              />
            </div>
            <div className="form-section">
              <label className="form-label" htmlFor="price">Precio:</label>
              <input
                type="text"
                className="form-input newProductForm"
                placeholder={price}
                name="price"
                id="price"
                onChange={handleChange}
              />
            </div>
            <div className="form-section">
              <label className="form-label" htmlFor="urlImage">Cambiar Imagen</label>
              <input
                placeholder={image}
                type="text"
                className="form-input newProductForm"
                name="image"
                id="urlImage"
                onChange={handleChange}
              />
            </div>
          </div>
          <button type="submit" className="userSubmit">Guardar</button>
        </form>
      </div>
    </div>
  );
};

export default EditProductForm;
