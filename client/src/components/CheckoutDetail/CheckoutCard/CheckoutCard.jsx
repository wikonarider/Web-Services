import React from 'react';
import { useDispatch } from 'react-redux';

import { removeCart } from '../../../redux/actions';
import CheckoutPopOver from '../CheckoutPopOver/CheckoutPopOver';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Button from '@mui/material/Button';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { styled } from '@mui/material/styles';

export default function CheckoutCard({ title, img, price, id }) {
  const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  });

  const dispatch = useDispatch();

  const handleOnClink = () => {
    dispatch(removeCart(id));
  };

  return (
    <Paper
      sx={{ p: 2, margin: 'auto', maxWidth: 1000, flexGrow: 1, mb: 3, mt: 3 }}
    >
      <Grid
        container
        spacing={2}
        sx={{ gap: 1 }}
        direction="row"
        alignItems="center"
        justify="center"
      >
        <Grid item>
          <ButtonBase sx={{ width: 128, height: 140 }}>
            <Img alt="complex" src={img} />
          </ButtonBase>
        </Grid>
        <Grid
          item
          xs={12}
          sm
          container
          justifyContent="space-around"
          alignItems="stretch"
        >
          <Grid
            item
            xs
            container
            direction="column"
            spacing={2}
            direction="column"
            alignItems="center"
            justify="center"
          >
            <Grid item xs>
              <Typography variant="body2" color="text.secondary">
                ID: {id}
              </Typography>
              <Typography gutterBottom variant="h5" component="div">
                {title}
              </Typography>
            </Grid>
            <Grid item>
              <Button
                color="secondary"
                variant="text"
                size="small"
                endIcon={<DeleteOutlinedIcon />}
                sx={{ textTransform: 'none' }}
                onClick={handleOnClink}
              >
                <CheckoutPopOver />
              </Button>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="span">
              ${price}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
