import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Share from "@mui/icons-material/Share";
import Rating from "@mui/material/Rating";
import s from "./Orders.module.css";
import { Link } from "react-router-dom";

export default function Orders({ service }) {
  const { title, img, price, id, rating, createdAt } = service;

  const IMG_TEMPLATE =
    "https://codyhouse.co/demo/squeezebox-portfolio-template/img/img.png";

  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(12, 1fr)"
      alignItems="center"
      boxShadow={1}
      sx={{ borderRadius: 2 }}
    >
      <Box
        gridColumn={{ xs: "span 12", md: "span 2" }}
        sx={{ width: 200, height: 100 }}
        component={Link}
        to={`/services/${id}`}
      >
        <img src={img ? img : IMG_TEMPLATE} alt='userImage' className={s.img} />
      </Box>

      <Box
        gridColumn={{ xs: "span 12", md: "span 6" }}
        component={Link}
        to={`/services/${id}`}
        sx={{ textDecoration: "none", color: "black" }}
      >
        <Typography variant="h6">{title}</Typography>
      </Box>

      <Box gridColumn={{ xs: "span 12", md: "span 1" }}>
        <Rating
          name="read-only"
          value={Number(rating)}
          precision={0.5}
          readOnly
          sx={{ marginRight: 2 }}
        />
      </Box>

      <Box gridColumn={{ xs: "span 6", md: "span 1" }}>
        <Typography>{createdAt.split("T")[0]}</Typography>
      </Box>

      <Box gridColumn={{ xs: "span 6", md: "span 1" }}>
        <IconButton aria-label="share">
          <Share />
        </IconButton>
      </Box>

      <Box gridColumn={{ xs: "span 12", md: "span 1" }}>
        <Typography variant="h6">${price}</Typography>
      </Box>
    </Box>
  );
}
