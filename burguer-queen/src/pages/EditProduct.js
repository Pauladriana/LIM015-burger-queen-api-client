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
    <div className="container">
      <button type="button" onClick={() => { window.location.href = '#/admin/products'; }} className="back">Atrás</button>
      <h2> Editar Producto </h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nombre:</label>
          <br />
          <input
            type="text"
            className="form-control"
            placeholder={name}
            name="name"
            id="name"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="type">Menú:</label>
          <br />
          <input
            type="text"
            className="form-control"
            placeholder={type}
            name="type"
            id="type"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Precio:</label>
          <br />
          <input
            type="text"
            className="form-control"
            placeholder={price}
            name="price"
            id="price"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="urlImage">Cambiar Imagen</label>
          <br />
          <input
            type="file"
            accept="image/*"
            className="form-control"
            name="image"
            id="urlImage"
            onChange={handleChange}
          />
        </div>
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default EditProductForm;
