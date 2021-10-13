import React, {useState} from 'react';
import { Link } from 'react-router-dom';

import Cookies from 'universal-cookie';
import { updateData } from '../services/put';

const cookies = new Cookies();

const EditProductForm = ({setLoading, setError}) => {
  const product = cookies.get('product');
  const {_id, name, type, price, image} = cookies.get('product');
  const [productToEdit, setProductToEdit] = useState(product);

  const handleChange = e => {
    setProductToEdit({
      ...productToEdit,
      [e.target.name]: e.target.value,
    });
  };

  function handleSubmit(event) {
    event.preventDefault();
    updateData(productToEdit, setLoading, setError,'products', _id ,'./');
    cookies.remove('product');
    console.log(cookies.get('product'));
  }
  return (
    <div className="container">
      <Link to="/admin" className='back'>Atrás</Link>
      <h2> Editar Producto </h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label for="item">Nombre:</label><br />
          <input
            type="text"
            className="form-control"
            placeholder={name}
            name="name"
            id='item'
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label for="menu">Menú:</label><br />
          <input
            type="text"
            className="form-control"
            placeholder={type}
            name="type"
            id='type'
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label for="description">Precio:</label><br />
          <input
            type="text"
            className="form-control"
            placeholder={price}
            name="price"
            id='price'
            onChange={handleChange}
          />
        </div>
        <button type="submit">Guardar</button>
      </form>
    </div>
  )
};

export default EditProductForm;