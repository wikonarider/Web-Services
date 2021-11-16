import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { postPurchase, removeCart } from '../../redux/actions';
import { paypal } from '../../redux/actions/index';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { makeStyles } from '@material-ui/core/styles';

import CheckoutCard from '../CheckoutDetail/CheckoutCard/CheckoutCard';
import s from './CheckoutDetail.module.css';

// import s from './CheckoutPopOver/checkoutDetail.module.css';

const useStyles = makeStyles((theme) => ({
  querie: {
    [theme.breakpoints.down('xs')]: {
      alignItems: 'center !important',
    },
  },
}));

export default function CheckoutDetail() {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const total = [];

  const handleBuyPaypal = () => {
    let prices = [];
    let services = [];
    let tittles = [];
    // let quantities = 1;

    setLoading(!loading);

    cart.map(async (c) => {
      prices.push(c.price);
      services.push(c.id);
      tittles.push(c.title);

      dispatch(removeCart(c.id));
    });
    dispatch(
      paypal({
        servicesId: services,
        totalPrice: prices,
        title: tittles,
        quantity: 1,
      })
    );
  };
  const handleBuyClick = () => {
    let prices = [];
    let services = [];
    let tittles = [];
    // let quantities = 1;

    setLoading(!loading);

    cart.map(async (c) => {
      prices.push(c.price);
      services.push(c.id);
      tittles.push(c.title);

      dispatch(removeCart(c.id));
    });
    dispatch(
      postPurchase({
        servicesId: services,
        totalPrice: prices,
        title: tittles,
        quantity: 1,
      })
    );

    //setTimeout(() => {}, 1000);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        {cart.length > 0 &&
          cart.map((item, index) => {
            total.push(item.price);
            return (
              <CheckoutCard
                key={index}
                title={item.title}
                img={item.img}
                price={item.price}
                id={item.id}
              />
            );
          })}
      </Box>
      <Paper
        sx={{ p: 2, margin: 'auto', maxWidth: 1000, flexGrow: 1, mb: 2, mt: 2 }}
      >
        <Grid container spacing={2} sx={{ gap: 1 }}>
          <Grid item xs={12} sm container>
            <Grid
              container
              direction="column"
              spacing={1}
              alignItems="flex-end"
              className={classes.querie}
            >
              {loading && <div className={s.spinner}></div>}
            
            {!loading?
              <Grid
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                }}
              >
                <Grid
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                  }}
                >
                  <Typography
                    variant="h5"
                    color="text.primary"
                    textAlign="start"
                  >
                    TOTAL:
                    {total.length > 0 && (
                      <Typography gutterBottom variant="h4" component="div">
                        {total.reduce((a, b) => a + b, 0)} $
                      </Typography>
                    )}
                  </Typography>
                </Grid>
                <Grid
                  item
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gridGap: '1rem',
                  }}
                >
                  {total.length > 0 ? (
                    <Button
                      color="secondary"
                      variant="contained"
                      size="large"
                      onClick={handleBuyClick}
                    >
                      BUY WITH MERCADO PAGO
                    </Button>
                  ) : (
                    <Button variant="contained" size="large" disabled>
                      BUY WITH MERCADO PAGO
                    </Button>
                  )}
                  {total.length > 0 ? (
                    <Button
                      color="secondary"
                      variant="contained"
                      size="large"
                      onClick={handleBuyPaypal}
                      fullWidth
                    >
                      BUY WITH PAYPAL
                    </Button>
                  ) : (
                    <Button variant="contained" size="large" disabled>
                      BUY WITH PAYPAL
                    </Button>
                  )}
              
                </Grid>
              </Grid>
              : null }
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
