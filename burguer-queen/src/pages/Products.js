import React, { useState, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import '../style/Admin.css';
import Cookies from 'universal-cookie';
import edit from '../media/pencil.png';
import remove from '../media/close.png';
import { getData } from '../services/get';
import { redirectToNotFound } from '../helpers/helpers';

const cookies = new Cookies();

const Products = ({ setModalMessage }) => {
  const { url } = useRouteMatch();
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
        <img
          src={edit}
          alt="pencil"
          className="optTable"
          onClick={() => { cookies.remove('product', { path: '/' }); cookies.set('product', product, { path: '/' }); window.location.href = '#/admin/products/editproduct'; }}
        />
        <img
          src={remove}
          alt="remove"
          className="optTable"
          onClick={() => {
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
    <div>
      {!(cookies.get('userLogged')).roles.admin
        ? redirectToNotFound()
        : (
          <div className="OptionContent">
            <div className="tableCnt">
              <h2>Productos</h2>
              <table>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Menu</th>
                    <th>Precio</th>
                  </tr>
                </thead>
                <tbody>
                  {!products
                    ? <div />
                    : showProducts(products)}
                </tbody>
              </table>
            </div>
            <Link to={`${url}/newproduct`}>Crear Producto</Link>
          </div>
        )}
    </div>
  );
};

export default Products;
