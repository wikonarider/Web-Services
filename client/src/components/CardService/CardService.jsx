import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { Typography , CardActionArea } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";

const IMG_TEMPLATE =
  "https://codyhouse.co/demo/squeezebox-portfolio-template/img/img.png";

function CardService({ service }) {
  const { title, img, price, id } = service;
  const rating = 5;
  return (
    <Card sx={{ width: 345, height: 420, textDecoration: 'none' }}>
      
      <CardActionArea component={Link} to={`/services/${id}`}>
      <CardHeader 
      title={title} 
      sx={{ pb: "0", height: "64px" }} 
      />
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
        <IconButton onClick={() => {}} aria-label="add to favorites">
          <FavoriteIcon sx={{}} />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>

        <IconButton
          onClick={() => {}}
          color={!false ? "primary" : "success"}
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
