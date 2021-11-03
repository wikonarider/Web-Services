import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFavs, addFavs } from '../../utils/favs';
import { getUserInfo, addCart } from '../../redux/actions/index';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Rating from '@mui/material/Rating';
import DetailService from '../DetailService/DetailService';

const IMG_TEMPLATE =
  'https://codyhouse.co/demo/squeezebox-portfolio-template/img/img.png';

function CardService({ service }) {
  const cart = useSelector((state) => state.cart);
  const favs = useSelector((state) => state.user.servicesFavs);
  const cookie = useSelector((state) => state.cookie);
  const dispatch = useDispatch();
  const [added, setAdded] = useState(false);
  const [favState, setFavState] = useState(false);
  const [open, setOpen] = React.useState(false); //Estado para abrir DetailService modal
  const { title, img, price, id, userId, rating } = service;

  const fixedTitle = title
    ? title.length > 40
      ? `${title.substring(0, 40)}...`
      : title
    : null;

  //Funciones para abrir y cerrar DetailService modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // verificar si ya esta en favorito, prende en rojo
  // el boton de favs de las cards del home o lo deja apagado
  useEffect(() => {
    if (cookie) {
      if (favs) {
        const index = favs.findIndex((f) => f.id === id);
        if (index === -1) {
          setFavState(() => false);
        } else {
          setFavState(() => true);
        }
      }
    }
  }, [favs, cookie, id]);

  // para agregarlo o sacarlo del carrito
  useEffect(() => {
    const index = cart.findIndex((s) => s.id === id);
    if (index === -1) {
      setAdded(() => false);
    } else {
      setAdded(() => true);
    }
  }, [cart, id]);

  // onClick del carrito
  const handleClick = () => {
    if (!added) {
      const service = {
        title,
        img,
        price,
        id,
      };
      dispatch(addCart(service));
      setAdded(() => true);
    }
  };

  // onClick del favs
  const handleFavs = async () => {
    try {
      if (cookie) {
        if (favState) {
          await deleteFavs(id);
          setFavState(() => false);
          dispatch(await getUserInfo());
        } else {
          await addFavs(id);
          setFavState(() => true);
          dispatch(await getUserInfo());
        }
      }
    } catch (e) {
      console.log(e.response.data);
    }
  };
  return (
    <Card sx={{ width: 345, height: 420, textDecoration: 'none' }}>
      {/* component={Link} to={`/services/${id}`} */}
      <CardActionArea onClick={handleOpen}>
        <CardHeader title={fixedTitle} sx={{ pb: '0', height: '64px' }} />
        <Rating
          name="read-only"
          value={Number(rating)}
          precision={0.5}
          readOnly
          sx={{ p: '8px' }}
        />

        <CardMedia
          component="img"
          height="194"
          image={img ? img : IMG_TEMPLATE}
          alt={title}
          sx={{ objectFit: 'cover' }}
        />
        <Typography variant="h5" component="div" sx={{ p: '5px' }}>
          {`$${price ? price : 0}`}
        </Typography>
      </CardActionArea>

      <CardActions disableSpacing>
        <IconButton
          onClick={handleFavs}
          aria-label="add to favorites"
          sx={
            cookie && cookie.split('=')[1] !== userId ? {} : { display: 'none' }
          }
        >
          <FavoriteIcon color={favState ? 'error' : ''} />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>

        {/*
        //J0n: no borrar
         <IconButton
          onClick={handleClick}
          color={!added ? "primary" : "success"}
          aria-label="add to shopping cart"
          sx={{ ml: "auto" }}
        > */}
        {}

        <IconButton
          onClick={handleClick}
          color={!added ? 'primary' : 'success'}
          aria-label="add to shopping cart"
          sx={
            cart && cookie.split('=')[1] !== userId
              ? { ml: 'auto' }
              : { display: 'none' }
          }
        >
          <AddShoppingCartIcon />
        </IconButton>
      </CardActions>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
            height: '100%',
            bgcolor: 'background.paper',
            boxShadow: 24,
            overflowY: 'scroll',
            overflowX: 'hidden',
            m: '60px auto',
          }}
        >
          <DetailService closeModal={handleClose} id={id} />
        </Box>
      </Modal>
    </Card>
  );
}

export default CardService;
