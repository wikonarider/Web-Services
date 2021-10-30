import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { handleFav } from "../../utils/buttonHandlers";
import {
  Box,
  CardMedia,
  Typography,
  Rating,
  CardActions,
  IconButton,
} from "@mui/material";
import { AddShoppingCart, Favorite, Share, Close } from "@mui/icons-material";

export default function DetailService({ id }) {
  let [service, setService] = useState({ service: {}, user: {} });
  let [fav, setFav] = useState(false);

  let history = useHistory();

  //componentDidMount para traer la información del servicio por id
  useEffect(() => {
    axios(`http://localhost:3001/services/${id}`).then((response) => {
      setService({ ...service, ...response.data });
    });

    axios(`http://localhost:3001/favs?id=${id}`).then((response) => {
      setFav(response.data);
    });
    // eslint-disable-next-line
  }, []);

  const theme = {
    favorite: {
      1: { color: "red" },
      0: { color: "grey" },
    },
  };

  const handleClose = () => {
    history.goBack();
  };

  const IMG_TEMPLATE =
    "https://codyhouse.co/demo/squeezebox-portfolio-template/img/img.png";

  let { img, title, price, description, rating, qualifications } =
    service.service;

  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(12, 1fr)"
      gap={2}
      p={2}
      border="solid 1px lightgrey"
      maxWidth="80%"
      m="auto"
    >
      <Box gridColumn="span 8" p={2}>
        <CardMedia
          component="img"
          image={img ? img : IMG_TEMPLATE}
          height="400"
          alt={id}
          sx={{ objectFit: "cover" }}
        />
      </Box>

      <Box gridColumn="span 4" m={2} p={2} border="solid 1px lightgrey">
        <Box
          gridColumn="span 12"
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
        >
          <Box gridColumn="span 6">
            <IconButton
              onClick={async () => {
                let newFavState = await handleFav(fav, id);
                setFav(newFavState);
              }}
              aria-label="add to favorites"
            >
              <Favorite sx={fav ? theme.favorite["1"] : theme.favorite["0"]} />
            </IconButton>
            <IconButton aria-label="share">
              <Share />
            </IconButton>
          </Box>

          <Box gridColumn="span 6">
            <IconButton onClick={() => handleClose()}>
              <Close />
            </IconButton>
          </Box>
        </Box>

        <Box
          gridColumn="span 12"
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
          alignContent="start"
        >
          <Typography variant="h5" sx={{ width: "100%", textAlign: "left" }}>
            {" "}
            {title}{" "}
          </Typography>
          <Rating
            name="read-only"
            value={Number(rating)}
            precision={0.5}
            readOnly
            sx={{}}
          />
          {qualifications
            ? `${qualifications.length} opiniones`
            : "0 opiniones"}
        </Box>

        <Box
          gridColumn="span 12"
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
          alignContent="start"
        >
          <CardActions disableSpacing>
            <Typography variant="h5" sx={{}}>
              {" "}
              {`$${price ? price : 0}`}{" "}
            </Typography>
            <IconButton
              onClick={() => {}}
              color={!false ? "primary" : "success"}
              aria-label="add to shopping cart"
              sx={{}}
            >
              <AddShoppingCart />
            </IconButton>
          </CardActions>
        </Box>

        <Box gridColumn="span 12">
          <Typography
            variant="subtitle1"
            component="div"
            sx={{ textAlign: "left" }}
          >
            {" "}
            Description:{" "}
          </Typography>
          <Typography
            variant="subtitle2"
            component="div"
            sx={{ textAlign: "left" }}
          >
            {" "}
            {description}{" "}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
