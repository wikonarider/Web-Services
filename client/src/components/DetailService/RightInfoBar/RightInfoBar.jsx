import React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import CardActions from "@mui/material/CardActions";
import { AddShoppingCart, Favorite, Share } from "@mui/icons-material";
import CardUser from "../../CardUser/CardUser";
import useMediaQuery from "@mui/material/useMediaQuery";
import MapDetail from "./MapDetail";

export default function RightInfoBar({
  cookie,
  favState,
  service,
  handleFavs,
  handleClick,
  added,
}) {
  let { title, price, description, rating, qualifications, userId, city } =
    service.service;
  const query = useMediaQuery("(max-width: 890px)");

  return (
    <Box
      gridColumn={{ xs: "span 12", sm: "span 12", md: "span 4" }}
      m={{ xs: 0, sm: 2 }}
      p={{ xs: 1, sm: 0, md: 2 }}
      border="solid 1px lightgrey"
      borderRadius="4px"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      sx={query ? { gridArea: "1" } : {}}
      textAlign="center"
    >
      {/* ---- BOTONES FAV SHARE --------------------------- */}
      <Box
        gridColumn="span 12"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        sx={{ mr: "auto" }}
      >
        <Box gridColumn="span 6">
          {cookie && cookie !== userId ? (
            <IconButton
              onClick={handleFavs}
              aria-label="add to favorites"
              sx={
                cookie && cookie !== service.userId ? {} : { display: "none" }
              }
            >
              <Favorite color={favState ? "error" : ""} />
            </IconButton>
          ) : null}
          <IconButton aria-label="share">
            <Share />
          </IconButton>
        </Box>

        <Box gridColumn="span 6"></Box>
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
          {title}
        </Typography>
      </Box>
      <Box
        gridColumn="span 12"
        display="flex"
        flexDirection="row"
        alignItems="center"
        mr="auto"
        pt="15px"
        pb="5px"
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
      <Box gridColumn="span 12" width="100%">
        <CardActions disableSpacing>
          <Typography variant="h5" sx={{}}>
            {" "}
            {`$${price ? price : 0}`}{" "}
          </Typography>
          {cookie && cookie !== userId ? (
            <IconButton
              onClick={handleClick}
              color={!added ? "primary" : "success"}
              aria-label="add to shopping cart"
            >
              <AddShoppingCart />
            </IconButton>
          ) : !cookie ? (
            <IconButton
              onClick={handleClick}
              color={!added ? "primary" : "success"}
              aria-label="add to shopping cart"
            >
              <AddShoppingCart />
            </IconButton>
          ) : null}
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
          Description:
        </Typography>
        <Typography
          variant="subtitle2"
          component="div"
          sx={{
            textAlign: "left",
            maxHeight: "200px",
            overflowY: "auto",
          }}
        >
          {description}
        </Typography>
      </Box>
      {/* ------------------------------------------- */}

      {/* ---------- USER CARD -------------------- */}
      <Box
        gridColumn="span 12"
        mb="auto"
        width="100%"
        sx={{ transform: "scale(0.8)" }}
      >
        <CardUser user={service.user} />
      </Box>
      {/* -------------------------------------- */}

      {/* ---------- Map -------------------- */}
      <Box>
        <MapDetail
          lat={city.name === "Rosario" ? city.lat + 0.2 : city.lat}
          lon={city.lon}
        />
      </Box>
      {/* -------------------------------------- */}
    </Box>
  );
}
