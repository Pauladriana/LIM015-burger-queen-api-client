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

  const handleChange = e => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!product.name || !product.type || !product.price) return setModalMessage('No ingresó ningún dato.');
    return await createData(product, setLoading, setModalMessage, 'products');
  }
  return (
    <div className="container">
      <button onClick={()=> {window.location.href='#/admin/products'}} className='back'>Atrás</button>
      <h2> Nuevo Producto </h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="item">Item:</label><br />
          <input
            type="text"
            className="form-control"
            placeholder="nombre de producto"
            name="name"
            id='item'
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="menu">Menu:</label><br />
          <input
            type="text"
            className="form-control"
            placeholder="Desayuno o Diario"
            name="type"
            id='menu'
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Precio:</label><br />
          <input
            type="number"
            className="form-control"
            placeholder="S/"
            name="price"
            id='price'
            onChange={handleChange}
          />
        </div>


        <button type="submit">Guardar</button>
      </form>
    </div>
  )
}

export default ProductForm