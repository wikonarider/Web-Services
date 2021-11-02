import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";

import { Typography, CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";
import ChatIcon from "@mui/icons-material/Chat";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { IconButton } from "@mui/material";

const IMG_TEMPLATE =
  "https://codyhouse.co/demo/squeezebox-portfolio-template/img/img.png";

export default function CardUser({ user }) {
  let { id, userImg, username, name, lastname } = user;
  let fullname = name + " " + lastname;

  const fixedTitle = fullname
    ? fullname.length > 40
      ? `${fullname.substring(0, 40)}...`
      : fullname
    : null;

  return (
    <Card
      sx={{
        width: "90%",
        height: "minContent",
        textDecoration: "none",
        m: "10px auto 10px auto",
        p: "5px",
        border: "solid 1px lightgrey",
      }}
    >
      <CardActionArea component={Link} to={`/users/${id}`}>
        <CardMedia
          component="img"
          height="194"
          image={userImg ? userImg : IMG_TEMPLATE}
          alt={username}
          sx={{
            objectFit: "cover",
            borderRadius: "50%",
            height: "auto",
            width: "60%",
            m: "auto",
          }}
        />
        <CardHeader
          title={fixedTitle}
          sx={{ p: "5px 0px 0px 0px", height: "minContent" }}
        />
        <Typography variant="subtitle2" component="p" sx={{}}>
          {username}
        </Typography>
      </CardActionArea>

      <CardActions disableSpacing>
        {/* <IconButton aria-label="add to favorites">
          <ChatIcon sx={{}} />
          <Typography variant="caption">Chat</Typography>
        </IconButton> */}
        <IconButton aria-label="share" sx={{ m: "0px auto 0px auto" }}>
          <AccountBoxIcon />
          <Typography variant="caption">Profile</Typography>
        </IconButton>

        <IconButton aria-label="More services" sx={{ m: "0px auto 0px auto" }}>
          <ListAltIcon />
          <Typography variant="caption"> Services</Typography>
        </IconButton>
      </CardActions>
    </Card>
  );
}
