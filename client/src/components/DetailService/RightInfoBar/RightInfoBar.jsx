import React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import CardActions from "@mui/material/CardActions";
import { AddShoppingCart, Favorite, Share, Close } from "@mui/icons-material";
import CardUser from "../../CardUser/CardUser";

export default function RightInfoBar({
  cookie,
  favState,
  handleClose,
  service,
  handleFavs,
  handleClick,
  added,
}) {
  let { title, price, description, rating, qualifications } = service.service;

  return (
    <Box
      gridColumn={{ xs: "span 12", sm: "span 12", md: "span 4" }}
      m={{xs:0, sm:2}}
      p={{ xs: 0, sm: 0, md: 2 }}
      border="solid 1px lightgrey"
    >
      {/* ---- BOTONES FAV SHARE CLOSE---------------------- */}
      <Box
        gridColumn="span 12"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
      >
        <Box gridColumn="span 6">
          <IconButton
            onClick={handleFavs}
            aria-label="add to favorites"
            sx={cookie && cookie !== service.userId ? {} : { display: "none" }}
          >
            <Favorite color={favState ? "error" : ""} />
          </IconButton>
          <IconButton aria-label="share">
            <Share />
          </IconButton>
        </Box>

        <Box gridColumn="span 6">
          {/* () => handleClose() */}
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </Box>
      </Box>
      {/* -------------------------------------- */}

      {/* -----------TITLE QUALIFICATION--------------------- */}
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
      </Box>
      <Box
        gridColumn="span 12"
        display="flex"
        flexDirection="row"
        justifyContent="left"
      >
        <Rating
          name="read-only"
          value={Number(rating)}
          precision={0.5}
          readOnly
          sx={{}}
        />
        <Typography variant="subtitle 1" sx={{ ml: "10px" }}>
          {qualifications
            ? qualifications.length === 1
              ? ` ${qualifications.length} opinion`
              : ` ${qualifications.length} opinions`
            : "0 opiniones"}
        </Typography>
      </Box>
      {/* -------------------------------------------- */}

      {/* -------------- PRICE - CART ------------------------ */}
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
            onClick={handleClick}
            color={!added ? "primary" : "success"}
            aria-label="add to shopping cart"
            sx={{ ml: "auto" }}
          >
            <AddShoppingCart />
          </IconButton>
        </CardActions>
      </Box>
      {/* ---------------------------------------- */}

      {/* -------------- DESCRIPTION ----------- */}
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
      {/* ------------------------------------------- */}

      {/* ---------- USER CARD -------------------- */}
      <Box gridColumn="span 12">
        <CardUser user={service.user} />
      </Box>
      {/* -------------------------------------- */}
    </Box>
  );
}
