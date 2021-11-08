import React from 'react';
import { useSelector } from 'react-redux';

import Button from '@mui/material/Button';

import { Link } from 'react-router-dom';

export default function CheckoutBtn() {
  const cookie = useSelector((state) => state.cookie);

  return (
    <>
      {cookie && cookie.length > 0 ? (
        <Link to="/checkout" style={{ textDecoration: 'none' }}>
          <Button
            color="secondary"
            variant="contained"
            disabled={false}
            type="submit"
            sx={{ width: 1 }}
          >
            Checkout
          </Button>
        </Link>
      ) : (
        <Button variant="contained" disabled={true}>
          You need to be logged in
        </Button>
      )}
    </>
  );
}
