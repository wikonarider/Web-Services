import React from 'react';
import CartItem from './CartItem';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';

function CartList({ cart, route }) {
  const query = useMediaQuery('(max-width: 820px)');
  return (
    <Box sx={{ mt: query && route === 'home' ? '150px' : '75px' }}>
      <List>
        {cart &&
          cart.map((s) => (
            <CartItem
              key={`${s.title}_${s.id}`}
              title={s.title}
              price={s.price}
              img={s.img}
              id={s.id}
            />
          ))}
      </List>
    </Box>
  );
}

export default CartList;
