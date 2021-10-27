import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import { styled } from '@mui/material/styles';
import SearchIcon from '@material-ui/icons/Search';
import { getData } from '../services/get';
import '../style/Waiter.css';

const cookies = new Cookies();

const Breakfast = ({
  productsOrder, setProductsOrder, setQtyChange, setSum, sum,
}) => {
  const [products, setProducts] = useState(null);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    let cancel = false;
    getData('products', cookies.get('token'))
      .then((products) => {
        if (cancel) return;
        const breakfastProducts = products.filter((p) => p.type.toLowerCase() === 'desayuno');
        setProducts(breakfastProducts);
      });
    return () => {
      cancel = true;
    };
  }, []);

  const addProduct = (product) => {
    setSum(product.price + sum);
    const arrayOfId = productsOrder.map((p) => p._id);
    if (arrayOfId.indexOf(product._id) !== -1) {
      const p = productsOrder[(arrayOfId.indexOf(product._id))];
      p.qty += 1;
      setQtyChange(true);
      return setProductsOrder(productsOrder);
    }
    return setProductsOrder([...productsOrder, { ...product, qty: 1 }]);
  };

  const showProducts = (products) => products.map((product) => (
    <div key={product._id} className="waiterProductCard" onClick={() => addProduct(product)}>
      <div className="waiterProductCardText">
        <h3>{product.name}</h3>
        <span>{product.price}</span>
      </div>
      <div className="waiterProductCardImage">
        <img className="waiterImgCard" src={product.image} alt="food" />
      </div>
    </div>
  ));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    position: 'absolute',
    height: '100%',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
  }));

  const handleChange = (e) => {
    setSearchValue((e.target.value).toLowerCase());
  };

  const showFilterProducts = (products) => {
    if (searchValue) {
      const productsFilter = products.filter((p) => p.name.toLowerCase().includes(searchValue));
      return showProducts(productsFilter);
    }
    return showProducts(products);
  };

  return (
    <div>
      <div className="searchContent">
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <div className="waiterSearchInputContent">
          <input
            className="waiterSearchInput"
            autoComplete="string"
            placeholder="Buscar…"
            aria-label="search"
            value={searchValue}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="waiterProductsContainer">
        {products
          ? showFilterProducts(products)
          : <div />}
      </div>
    </div>
  );
};

export default Breakfast;
