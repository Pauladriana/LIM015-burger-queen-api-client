import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import '../style/Admin.css';
import Cookies from 'universal-cookie';
import { getData } from '../services/get';
import { redirectToNotFound } from '../helpers/helpers';

const cookies = new Cookies();

const Products = ({ setModalMessage }) => {
  const [products, setProducts] = useState(null);
  const userLogged = cookies.get('userLogged');

  useEffect(() => {
    let cancel = false;
    if (!userLogged) {
      window.location.href = '#/';
    } else {
      getData('products', cookies.get('token'))
        .then((data) => {
          if (cancel) return;
          setProducts(data);
        });
      return () => {
        cancel = true;
      };
    }
  }, []);

  const showProducts = (products) => products.map((product) => (
    <tr key={product._id}>
      <td>{product.name}</td>
      <td>{product.type}</td>
      <td>{`S/ ${product.price}`}</td>
      <td>
        <CreateIcon
          aria-label="editIcon"
          fontSize="small"
          className="optTable"
          onClick={() => { cookies.remove('product', { path: '/' }); cookies.set('product', product); window.location.href = '#/admin/products/editproduct'; }}
        />
        <DeleteIcon
          fontSize="small"
          className="optTable"
          onClick={() => () => {
            setModalMessage({
              title: '¿Está Seguro de eliminar este producto?',
              body: 'Al removerse no podrá volver a recuperarlo más tarde.',
              button: 'Eliminar',
              id: product._id,
              path: 'products',
            });
          }}
        />
      </td>
    </tr>
  ));

  return (
    <div aria-label="products" className="container">
      {!(cookies.get('userLogged')).roles.admin
        ? redirectToNotFound()
        : (
          <div className="optionContent">
            <div className="tableCnt">
              <table>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Menú</th>
                    <th>Precio</th>
                  </tr>
                </thead>
                <tbody>
                  {!products
                    ? <tr />
                    : showProducts(products)}
                </tbody>
              </table>
            </div>
            <div className="linkAdmin"><Link to="/admin/products/newproduct">Crear Producto</Link></div>
          </div>
        )}
    </div>
  );
};

export default Products;
