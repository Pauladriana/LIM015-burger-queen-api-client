import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { getData } from '../services/get';
import '../style/Waiter.css';

const cookies = new Cookies();

const Diary = ({
  productsOrder, setProductsOrder, setQtyChange, setSum, sum,
}) => {
  const [products, setProducts] = useState(null);
  const [searchValue, setSearchValue] = useState(null);

  useEffect(() => {
    let cancel = false;
    getData('products', cookies.get('token'))
      .then((products) => {
        if (cancel) return;
        const diaryProducts = products.filter((p) => p.type === 'Diario');
        setProducts(diaryProducts);
      });
    return () => { cancel = true; };
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

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(2),
      width: '90%',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
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
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          autoFocus="true"
          placeholder="Buscar…"
          inputProps={{ 'aria-label': 'search' }}
          value={searchValue}
          onChange={handleChange}
        />
      </Search>
      <div className="waiterProductsContainer">
        {products
          ? showFilterProducts(products)
          : <div />}
      </div>
    </div>
  );
};

export default Diary;
