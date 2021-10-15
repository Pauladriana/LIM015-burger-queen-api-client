import React, { useState, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import Modal from '../components/remove';
import '../style/Admin.css';
import edit from '../media/pencil.png';
import remove from '../media/close.png';
import Cookies from 'universal-cookie';
import { getData } from '../services/get';

const cookies = new Cookies();

const Products = ({ setLoading, setError }) => {
  let { url } = useRouteMatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [id, setId] = useState(null);
  const [products, setProducts] = useState(null);

  useEffect(() => {
    let cancel = false;
    getData(setLoading, 'products', cookies.get('token'))
      .then((data) => {
        if (cancel) return;
        setProducts(data);
      });
    return () => {
      cancel = true;
    }
  }, []);

  const showProducts = (products) => products.map((product) => (
    <tr key={product._id}>
      <td>{product.name}</td>
      <td>{product.type}</td>
      <td>{`S/ ${product.price}`}</td>
      <td><img src={edit} alt='' className='optTable' onClick={() => { cookies.set('product', product); window.location.href = '#/admin/products/editproduct' }} /><img src={remove} alt='' className='optTable' onClick={() => {
        setModalOpen(true);
        setId(product._id);
      }} /></td>
    </tr>
  ));


  return (
    <div className='OptionContent'>
      <div className='tableCnt'>
        <h2>Productos</h2>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Menu</th>
              <th>Precio</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {!products
              ? <div></div>
              : showProducts(products)}
          </tbody>
        </table>
      </div>
      <Link to={`${url}/newproduct`}>Crear Producto</Link>
      {modalOpen && <Modal setLoading={setLoading} setOpenModal={setModalOpen} setError={setError} id={id} path='products' />}
    </div>
  )
}

export default Products;