import { connect } from "react-redux";
import { getUserFavs } from "../../redux/actions";
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
import { handleFav } from "../../utils/buttonHandlers";
import { useDispatch } from "react-redux";
import { addCart } from "../../redux/actions/index";
import { useSelector } from "react-redux";

const IMG_TEMPLATE =
  "https://codyhouse.co/demo/squeezebox-portfolio-template/img/img.png";

const theme = {
  favorite: {
    1: { color: "red" },
    0: { color: "grey" },
  },
};

function CardService({ service, favs, getUserFavs }) {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [added, setAdded] = useState(false);

  const { title, img, price, id } = service;
  const rating = 5;
  const fixedTitle = title
    ? title.length > 40
      ? `${title.substring(0, 40)}...`
      : title
    : null;

  useEffect(() => {
    const index = cart.findIndex((s) => s.id === id);
    if (index === -1) {
      setAdded(() => false);
    } else {
      setAdded(() => true);
    }
  }, [cart, id]);

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
          onClick={async () => {
            let fav = favs.find((s) => s.serviceId === id) ? true : false;
            console.log(fav);
            await handleFav(fav, id);
            getUserFavs(document.cookie.split("=")[1]);
          }}
          aria-label="add to favorites"
        >
          <FavoriteIcon
            sx={
              favs.find((f) => f.serviceId === id)
                ? theme.favorite["1"]
                : theme.favorite["0"]
            }
          />
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

const mapStatetoProps = (state) => {
  return {
    favs: state.favs,
  };
};

export default connect(mapStatetoProps, { getUserFavs })(CardService);
