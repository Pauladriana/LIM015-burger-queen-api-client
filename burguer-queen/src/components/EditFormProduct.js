import React from 'react'
import { Link } from 'react-router-dom'

function EditProductForm(props) {

  function handleSubmit(event) {
    event.preventDefault()
    window.location.href = "./";
  }
  return (
    <div className="container">
      <Link to="/admin" className='back'>Atras</Link>
      <h2> Nuevo Producto </h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label for="item">Item:</label><br />
          <input
            type="text"
            className="form-control"
            placeholder={props.item}
            name="item"
            id='item'
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
            placeholder={props.type}
            name="menu"
            id='menu'
          />
        </div>
        <div className="form-group">
          <label for="description">Precio:</label><br />
          <input
            type="text"
            className="form-control"
            placeholder={props.cost}
            name="price"
            id='price'
          />
        </div>


        <button type="submit">Guardar</button>
      </form>
    </div>
  )
}

export default EditProductForm