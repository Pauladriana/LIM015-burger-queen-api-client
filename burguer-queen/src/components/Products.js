import React from 'react';
import { Link } from 'react-router-dom'
import "../style/Admin.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Products() {
  return (
    <div class='OptionContent'>
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
          <tr>
            <td>Cafe Americano</td>
            <td>Desayuno</td>
            <td>S/5</td>
            <td><FontAwesomeIcon icon="check-square" color="green" className='icon'/></td>
          </tr>
          <tr>
            <td>Cafe con leche</td>
            <td>Desayuno</td>
            <td>S/7</td>
            <td>E</td>
          </tr>
          <tr>
            <td>Sandwich de jamon y queso</td>
            <td>Desayuno</td>
            <td>S/10</td>
            <td>E</td>
          </tr>
          <tr>
            <td>Jugo de frutas natural</td>
            <td>Desayuno</td>
            <td>S/7</td>
            <td>E</td>
          </tr>
          <tr>
            <td><b>Hamburguesas</b></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Hamburguesa Simple</td>
            <td>Dia</td>
            <td>S/10</td>
            <td>E</td>
          </tr>
          <tr>
            <td>Hamburguesa Doble</td>
            <td>Dia</td>
            <td>S/15</td>
            <td>E</td>
          </tr>
          <tr>
            <td><b>Acompañamientos</b></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Papas fritas</td>
            <td>Dia</td>
            <td>S/5</td>
            <td>E</td>
          </tr>
          <tr>
            <td>Aros de cebolla</td>
            <td>Dia</td>
            <td>S/5</td>
            <td>E</td>
          </tr>
          <tr>
            <td><b>Para tomar</b></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Agua 500ml</td>
            <td>Dia</td>
            <td>S/5</td>
            <td>E</td>
          </tr>
          <tr>
            <td>Agua 750ml</td>
            <td>Dia</td>
            <td>S/7</td>
            <td>E</td>
          </tr>
          <tr>
            <td>Bebida/gaseosa 500ml</td>
            <td>Dia</td>
            <td>S/7</td>
            <td>E</td>
          </tr>
          <tr>
            <td>Bebida/gaseosa 750ml</td>
            <td>Dia</td>
            <td>S/10</td>
            <td>E</td>
          </tr>
        </tbody>
      </table>
      </div>
      <Link to="/admin/newProduct">Agregar Producto</Link>
    </div>
  )
}

export default Products;