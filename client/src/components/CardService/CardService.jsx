import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { Typography, CardActionArea } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCart } from "../../redux/actions/index";
import { useSelector } from "react-redux";
import { deleteFavs, addFavs } from "../../utils/favs";
import { getUserInfo } from "../../redux/actions/index";

const IMG_TEMPLATE =
  "https://codyhouse.co/demo/squeezebox-portfolio-template/img/img.png";

function CardService({ service }) {
  const cart = useSelector((state) => state.cart);
  const favs = useSelector((state) => state.user.servicesFavs);
  const cookie = useSelector((state) => state.cookie);
  const dispatch = useDispatch();
  const [added, setAdded] = useState(false);
  const [favState, setFavState] = useState(false);

  const { title, img, price, id, userId, ratingService } = service;
  const rating = ratingService ? ratingService : 5;
  const fixedTitle = title
    ? title.length > 40
      ? `${title.substring(0, 40)}...`
      : title
    : null;

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
    <Card sx={{ width: 345, height: 420, textDecoration: "none" }}>
      <CardActionArea component={Link} to={`/services/${id}`}>
        <CardHeader title={fixedTitle} sx={{ pb: "0", height: "64px" }} />
        <Rating
          name="read-only"
          value={rating}
          precision={0.5}
          readOnly
          sx={{ p: "8px" }}
        />

        <CardMedia
          component="img"
          height="194"
          image={img ? img : IMG_TEMPLATE}
          alt={title}
          sx={{ objectFit: "cover" }}
        />
        <Typography variant="h5" component="div" sx={{ p: "5px" }}>
          {`$${price ? price : 0}`}
        </Typography>
      </CardActionArea>

      <CardActions disableSpacing>
        <IconButton
          onClick={handleFavs}
          aria-label="add to favorites"
          sx={
            cookie && cookie.split("=")[1] !== userId ? {} : { display: "none" }
          }
        >
          <FavoriteIcon color={favState ? "error" : ""} />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>

        <IconButton
          onClick={handleClick}
          color={!added ? "primary" : "success"}
          aria-label="add to shopping cart"
          sx={{ ml: "auto" }}
        >
          <AddShoppingCartIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default CardService;
