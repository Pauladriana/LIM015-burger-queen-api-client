import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import Breakfast from '../components/Breakfast';
import Diary from '../components/Diary';
import { createOrder } from '../services/post';

const cookies = new Cookies();

const styleOne = {
  fontFamily: 'Cormorant Upright',
  textTransform: 'none',
  fontSize: 16,
  fontWeight: 600,
  lineHeight: 1.75,
  width: 130,
  backgroundColor: '#DCCA87',
  border: '1px solid #DCCA87',
  color: '#0C0B08',
  borderRadius: 0,
  '&:hover': {
    backgroundColor: '#DCCA87',
    color: '#0C0B08',
  },
};
const styleTwo = {
  fontFamily: 'Cormorant Upright',
  textTransform: 'none',
  fontSize: 16,
  width: 130,
  backgroundColor: '#0C0B08',
  color: '#FFFFFF',
  border: '1px solid #DCCA87',
  borderRadius: 0,
  '&:hover': {
    backgroundColor: '#DCCA87',
    border: '1px solid #DCCA87',
    color: '#0C0B08',
  },
};

export default function NewOrder({ setLoading, setModalMessage }) {
  const [menu, setMenu] = useState('breakfast');
  const [productsOrder, setProductsOrder] = useState([]);
  const [name, setName] = useState('');
  const [qtychange, setQtyChange] = useState(null);
  const [sum, setSum] = useState(0);
  const [styleButton1, setStyleButton1] = useState(styleOne);
  const [styleButton2, setStyleButton2] = useState(styleTwo);

  const ColorButton = styled(Button)(styleButton1);
  const ColorButton2 = styled(Button)(styleButton2);

  const removeProduct = (product) => {
    setSum(sum - (Number(product.price) * product.qty));
    const newProductsOrder = productsOrder.filter((p) => p._id !== product._id);
    setProductsOrder([
      ...newProductsOrder,
    ]);
  };
  const showOrder = () => productsOrder.map((product) => (
    <tr key={product._id}>
      <td className="golden">{product.qty}</td>
      <td className="golden">
        {product.name}
      </td>
      <td>
        {`S/. ${product.price}`}
      </td>
      <td>
        <DeleteIcon fontSize="small" onClick={() => removeProduct(product)} />
      </td>
    </tr>
  ));

  useEffect(() => {
    if (!cookies.get('userLogged')) window.location.href = '#/';
  }, []);

  const saveOrder = () => {
    const products = productsOrder.map((p) => ({ productId: p._id, qty: p.qty }));
    return createOrder(name, products, (cookies.get('userLogged'))._id, setLoading, setModalMessage, 'orders');
  };
  return (
    <div className="waiterNewOrderContainer">
      <section className="waiterHeader">
        <div className="waiterHeaderSection1">
          <ColorButton onClick={() => { setMenu('breakfast'); setStyleButton1(styleOne); setStyleButton2(styleTwo); }}>
            Desayuno
          </ColorButton>
          <ColorButton2 onClick={() => { setMenu('diary'); setStyleButton1(styleTwo); setStyleButton2(styleOne); }}>
            Diario
          </ColorButton2>
        </div>
        <div className="waiterHeaderSection2">
          <input className="waiterInput" onChange={(e) => setName(e.target.value)} placeholder="Nombre Cliente" />
        </div>
      </section>

      <section className="waiterBody">
        <div className="waiterProductsSection">
          {menu === 'breakfast'
            ? <Breakfast setLoading={setLoading} productsOrder={productsOrder} setProductsOrder={setProductsOrder} setQtyChange={setQtyChange} setSum={setSum} sum={sum} />
            : <Diary setLoading={setLoading} productsOrder={productsOrder} setProductsOrder={setProductsOrder} setQtyChange={setQtyChange} setSum={setSum} sum={sum} />}
        </div>
        <div className="waiterOrderSection">
          <h3 className="waiterOrderTitle">Orden</h3>
          <div className="waiterOrderTableContainer">
            <table className="waiterOrderTable">
              <thead>
                <tr>
                  <th>Cant.</th>
                  <th>Producto</th>
                  <th>Precio Unit.</th>
                </tr>
              </thead>
              <tbody>
                {(productsOrder !== [] || qtychange)
                  ? showOrder()
                  : <div />}
                <tr>
                  <td className="golden">Total </td>
                  <td />
                  <td className="golden">{`S/.${sum}`}</td>
                </tr>
              </tbody>
            </table>
          </div>
          {(qtychange) ? setQtyChange(null) : false}
          <div className="buttonContainer"><ColorButton onClick={() => saveOrder()}>Guardar</ColorButton></div>
        </div>
      </section>
    </div>
  );
}
