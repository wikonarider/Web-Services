import React from 'react';
import CartItem from './CartItem';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
function CartList({ cart }) {
  return (
    <Box sx={{ mt: '75px' }}>
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
