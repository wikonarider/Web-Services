import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteFavs, addFavs } from "../../utils/favs";
import { getUserInfo, addCart } from "../../redux/actions/index";
import { addServiceOrder } from "../../utils/orders";
import { useHistory } from "react-router";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import EditIcon from "@mui/icons-material/Edit";
import Rating from "@mui/material/Rating";
import Alert from "@mui/material/Alert";

import ShareServiceModal from "./ShareServiceModal";

const IMG_TEMPLATE =
  "https://codyhouse.co/demo/squeezebox-portfolio-template/img/img.png";

function CardService({ service, related, route }) {
  const history = useHistory();

  const cart = useSelector((state) => state.cart);
  const favs = useSelector((state) => state.user.servicesFavs);
  const cookie = useSelector((state) => state.cookie);
  const dispatch = useDispatch();
  const [added, setAdded] = useState(false);
  const [favState, setFavState] = useState(false);

  const [modal, setModal] = useState(false);

  const { title, img, price, id, userId, rating } = service;

  const fixedTitle = title
    ? title.length > 40
      ? `${title.substring(0, 40)}...`
      : title
    : null;

  const fixedTitleRelated = title
    ? title.length > 30
      ? `${title.substring(0, 30)}...`
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
      if (cookie) {
        addServiceOrder(id)
          .then((data) => console.log(data))
          .catch((e) => console.log(e.response.data.message));
      }
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

  function handleModal(e) {
    setModal(true);
  }

  //--------HANDLE EDIT CLICK -------------------

  const handleEditClick = () => {
    history.push(`/editservice/${id}`);
  };

  const cardStyle = { width: 345, height: 420, textDecoration: "none" };
  const relatedCardStyle = { width: 172, height: 210, textDecoration: "none" };

  return (
    <div>
      <Card sx={related ? relatedCardStyle : cardStyle}>
        <CardActionArea component={Link} to={`/services/${id}`}>
          <CardHeader
            title={related ? fixedTitleRelated : fixedTitle}
            sx={
              related
                ? { pb: "0", height: "32px", marginBottom: "18px" }
                : { pb: "0", height: "64px" }
            }
            titleTypographyProps={related && { variant: "body" }}
          />

          {!related && (
            <Rating
              name="read-only"
              value={Number(rating)}
              precision={0.5}
              readOnly
              sx={{ p: "8px" }}
            />
          )}

          <CardMedia
            component="img"
            height={related ? "97" : "194"}
            image={img ? img : IMG_TEMPLATE}
            alt={title}
            sx={{ objectFit: "cover" }}
          />
          <Typography
            variant={related ? "subtitle1" : "h5"}
            component="div"
            sx={{ p: "5px" }}
          >
            {`$${price ? price : 0}`}
          </Typography>
        </CardActionArea>

        {!related && (
          <CardActions disableSpacing>
            <IconButton
              onClick={handleFavs}
              aria-label="add to favorites"
              sx={cookie && cookie !== userId ? {} : { display: "none" }}
            >
              <FavoriteIcon color={favState ? "error" : ""} />
            </IconButton>
            <IconButton aria-label="share" onClick={(e) => handleModal(e)}>
              <ShareIcon />
            </IconButton>
            {/*----------- service disable -------------*/}
            {!service.avaliable ? (
              <Alert severity="error" sx={{ ml: "auto" }}>
                Service disable
              </Alert>
            ) : null}
            {/* ------------------------------------- */}
            {/*----------- EDIT ICON -----------------  */}
            {cookie && cookie === userId && route === "account" ? (
              <IconButton onClick={handleEditClick} sx={{ ml: "auto" }}>
                <EditIcon />
              </IconButton>
            ) : null}

            {/* ------------------------------------- */}
            <IconButton
              onClick={handleClick}
              color={!added ? "primary" : "secondary"}
              aria-label="add to shopping cart"
              sx={
                cart && cookie !== userId ? { ml: "auto" } : { display: "none" }
              }
            >
              <AddShoppingCartIcon />
            </IconButton>
          </CardActions>
        )}
      </Card>
      <ShareServiceModal modal={modal} setModal={setModal} serviceId={id} />
    </div>
  );
}

export default CardService;
