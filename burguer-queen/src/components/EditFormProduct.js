import React, {useState} from 'react';
import { Link } from 'react-router-dom';

import Cookies from 'universal-cookie';
import { updateData } from '../services/put';

const cookies = new Cookies();

function EditProductForm(props) {
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
    updateData(productToEdit,'products', _id ,'./');
    cookies.remove('product');
    console.log(cookies.get('product'));
  }
  return (
    <div className="container">
      <Link to="/admin" className='back'>Atras</Link>
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
          <label for="description">Descripcion:</label><br />
          <input
            type="text"
            className="form-control"
            placeholder={props.descr}
            name="description"
            id='description'
          />
        </div>
        <div className="form-group">
          <label for="menu">Menu:</label><br />
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
}

export default EditProductForm