import React, { useState } from 'react';
import { createData } from '../services/post';

const ProductForm = ({ setLoading, setModalMessage }) => {
  const initialProduct = {
    name: '',
    type: '',
    price: '',
    image: '',
  };
  const [product, setProduct] = useState(initialProduct);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!product.name || !product.type || !product.price) return setModalMessage({ body: 'Los campos nombre, menú y precio son obligatorios.' });
    await createData(product, setLoading, setModalMessage, 'products');
  };
  return (
    <div className="container">
      <button type="button" onClick={() => { window.location.href = '#/admin/products'; }} className="back">Atrás</button>
      <h2> Nuevo Producto </h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nombre:</label>
          <br />
          <input
            type="text"
            className="form-control"
            placeholder="nombre de producto"
            name="name"
            id="name"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="menu">Menu:</label>
          <br />
          <input
            type="text"
            className="form-control"
            placeholder="Desayuno o Diario"
            name="type"
            id="menu"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Precio:</label>
          <br />
          <input
            type="number"
            className="form-control"
            placeholder="S/"
            name="price"
            id="price"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="urlImage">Agregar Imagen</label>
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

export default ProductForm;
