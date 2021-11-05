import React, { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CartList from './CartList';
import { useSelector } from 'react-redux';
import CheckoutBtn from '../CheckoutDetail/CheckoutBtn/CheckoutBtn';

import { useDispatch } from 'react-redux';
import { removeCart } from '../../redux/actions';

function Cart() {
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [openCart, setOpenCart] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(() => {
      let count = 0;
      cart &&
        cart.forEach((s) => {
          count += s.price;
        });
      return count;
    });
  }, [cart]);

  const handleCart = () => {
    setOpenCart((prev) => !prev);
  };

  // console.log(user);
  // console.log(cart);
  //lógica para eliminar items del carro si el usuario los eligió sin loguearse pero se loguéa y eran de él

  if (user.servicesOwn && user.servicesOwn.length > 0) {
    const intersection = user.servicesOwn.filter((x) =>
      cart.map((y) => y.id).includes(x.id)
    );
    if (intersection.length > 0) {
      intersection.map((item) => dispatch(removeCart(item.id)));
    }
  }

  return (
    <Box>
      <IconButton onClick={handleCart}>
        <Badge color="secondary" badgeContent={cart.length}>
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
      <Drawer anchor="right" open={openCart}>
        <CartList cart={cart} />
        <Divider sx={{ marginTop: 'auto', width: '370px' }} />
        <Typography
          variant="h4"
          component="div"
          gutterBottom
          sx={{ ml: 'auto', mr: 'auto' }}
        >
          {`Total $${total ? total : 0}`}
        </Typography>
        <CheckoutBtn />
      </Drawer>
    </Box>
  );
}

export default Cart;
