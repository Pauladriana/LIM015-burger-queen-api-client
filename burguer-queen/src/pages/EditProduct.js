import React, { useState } from 'react';

import Cookies from 'universal-cookie';
import { updateData } from '../services/put';

const cookies = new Cookies();

const EditProductForm = ({ setLoading, setModalMessage }) => {
  const product = cookies.get('product');
  const {
    _id, name, type, price, image,
  } = cookies.get('product');
  const [productToEdit, setProductToEdit] = useState(product);

  const handleChange = (e) => {
    setProductToEdit({
      ...productToEdit,
      [e.target.name]: e.target.value,
    });
  };

  function handleSubmit(event) {
    event.preventDefault();
    updateData(productToEdit, setLoading, setModalMessage, 'products', _id);
    cookies.remove('product');
    console.log(cookies.get('product'));
  }
  return (
    <div className="container">
      <button type="button" onClick={() => { window.location.href = '#/admin/products'; }} className="back">Atrás</button>
      <h2> Editar Producto </h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="item">Nombre:</label>
          <br />
          <input
            type="text"
            className="form-control"
            placeholder={name}
            name="name"
            id="item"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="menu">Menú:</label>
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
          <label htmlFor="description">Precio:</label>
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
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default EditProductForm;
