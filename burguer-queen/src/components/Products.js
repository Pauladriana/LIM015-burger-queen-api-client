import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from './remove';
import '../style/Admin.css';
import edit from '../media/pencil.png';
import remove from '../media/close.png';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const Products = ({ setLoading, products , setError}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [id, setId] = useState(null);

  return (
  <div className='OptionContent'>
    <div className='tableCnt'>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Menu</th>
            <th>Precio</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr>
              <td>{product.name}</td>
              <td>{product.type}</td>
              <td>{`S/ ${product.price}`}</td>
              <td><img src={edit} alt='' className='optTable' onClick={() => {cookies.set('product', product); window.location.href = '/admin/editProduct'}} /><img src={remove} alt='' className='optTable' onClick={() => {
                setModalOpen(true);
                setId(product._id);
              }} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <Link to='/admin/newProduct'>Agregar Producto</Link>
    {modalOpen && <Modal setOpenModal={setModalOpen} setError={setError} path='products' id={id}/>}
  </div>
)
}

export default Products;