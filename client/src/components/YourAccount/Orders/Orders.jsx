import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Share from '@mui/icons-material/Share';
import Rating from '@mui/material/Rating';
import s from './Orders.module.css';
import { Link } from 'react-router-dom';
import ShareServiceModal from '../../CardService/ShareServiceModal';
import { useState } from 'react';

export default function Orders({ service }) {
  const { title, img, price, id, rating } = service;
  const [modal, setModal] = useState(false);

  const IMG_TEMPLATE =
    'https://codyhouse.co/demo/squeezebox-portfolio-template/img/img.png';

  return (
    <Box
      marginTop="3rem"
      display="grid"
      gap={3}
      gridTemplateColumns="repeat(12, 1fr)"
      alignItems="center"
      boxShadow={2}
      sx={{
        borderRadius: 2,
        margin: '1rem',
        padding: '1rem',
      }}
      component={Paper}
      elevation={8}
    >
      <Box
        gridColumn={{ xs: 'span 12', md: 'span 2' }}
        // sx={{ width: 200, height: 140 }}
        component={Link}
        to={`/services/${id}`}
      >
        <img src={img ? img : IMG_TEMPLATE} alt="userImage" className={s.img} />
      </Box>

      <Box
        gridColumn={{ xs: 'span 12', md: 'span 6' }}
        component={Link}
        to={`/services/${id}`}
        sx={{ textDecoration: 'none', color: 'inherit' }}
      >
        <Typography variant="h6" color="primary">
          {title}
        </Typography>
      </Box>

      <Box gridColumn={{ xs: 'span 12', md: 'span 1' }}>
        <Rating
          name="read-only"
          value={Number(rating)}
          precision={0.5}
          readOnly
          sx={{ marginRight: 2 }}
        />
      </Box>

      {/* <Box gridColumn={{ xs: 'span 6', md: 'span 1' }}>
        <Typography>{createdAt.split('T')[0]}</Typography>
      </Box> */}

      <Box gridColumn={{ xs: 'span 6', md: 'span 1' }}>
        <IconButton aria-label="share" onClick={() => setModal(true)}>
          <Share />
        </IconButton>
      </Box>

      <Box gridColumn={{ xs: 'span 12', md: 'span 1' }}>
        <Typography variant="h6">${price}</Typography>
      </Box>
      <ShareServiceModal modal={modal} setModal={setModal} serviceId={id} />
    </Box>
  );
}
