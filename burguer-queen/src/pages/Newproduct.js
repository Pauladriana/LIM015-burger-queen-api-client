import React, { useState } from 'react';
import { createData } from '../services/post';

const NewProduct = ({ setLoading, setModalMessage }) => {
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
    <div aria-label="newProduct" className="container">
      <div className="optionContent">
        <div className="optionContentHeader">
          <button type="button" onClick={() => { window.location.href = '#/admin/products'; }} className="back">Atrás</button>
          <h2> Nuevo Producto </h2>
        </div>
        <form onSubmit={handleSubmit} className="formUser">
          <div className="formCnt">
            <div className="form-section">
              <label className="form-label" htmlFor="name">Nombre:</label>
              <input
                type="text"
                className="form-input newProductForm"
                placeholder="Nombre de producto"
                name="name"
                id="name"
                onChange={handleChange}
              />
            </div>
            <div className="form-section">
              <label className="form-label" htmlFor="menu">Menu:</label>
              <input
                type="text"
                className="form-input newProductForm"
                placeholder="Desayuno o Diario"
                name="type"
                id="menu"
                onChange={handleChange}
              />
            </div>
            <div className="form-section">
              <label className="form-label" htmlFor="description">Precio:</label>
              <input
                type="number"
                className="form-input newProductForm"
                placeholder="S/"
                name="price"
                id="price"
                onChange={handleChange}
              />
            </div>
            <div className="form-section">
              <label className="form-label" htmlFor="urlImage">Agregar URL de Imagen</label>
              <input
                type="text"
                placeholder="https://imagen.com"
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

export default NewProduct;
