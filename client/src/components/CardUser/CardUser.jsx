import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import ChatIcon from "@mui/icons-material/Chat";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ListAltIcon from "@mui/icons-material/ListAlt";
import IconButton from "@mui/material/IconButton";

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
        p: "0px",
        border: "solid 1px lightgrey",
      }}
    >
      <Box
        id={id}
        key={id}
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gap={1}
        sx={{ m: "5px 0px" }}
      >
        <Box gridColumn="span 4">
          <CardMedia
            component="img"
            image={userImg ? userImg : IMG_TEMPLATE}
            alt={username}
            sx={{
              objectFit: "cover",
              borderRadius: "50%",
              height: "100%",
              width: "auto",
              m: "auto 0px auto 3px",
              alignSelf: "center",
            }}
          />
        </Box>

        <Box gridColumn="span 8" display="flex" flexDirection="column">
          <Box gridColumn="span 12" display="flex" flexDirection="column">
            <Typography
              variant="h6"
              sx={{
                height: "minContent",
                textAlign: "left",
              }}
            >
              {fixedTitle}
            </Typography>
            <Typography
              variant="subtitle2"
              component="p"
              sx={{ textAlign: "left" }}
            >
              {username}
            </Typography>
          </Box>
          <Box gridColumn="span 12" display="flex" flexDirection="column">
            <CardActions disableSpacing>
              <IconButton
                aria-label="add to favorites"
                sx={{ m: "0px auto 0px auto", p: "0px" }}
              >
                <ChatIcon sx={{}} />
                <Typography variant="caption">Chat</Typography>
              </IconButton>
              <IconButton
                aria-label="share"
                sx={{ m: "0px auto 0px auto", p: "0px" }}
                component={Link}
                to={`/users/${id}`}
              >
                <AccountBoxIcon />
                <Typography variant="caption">Profile</Typography>
              </IconButton>

              {/* <IconButton
                aria-label="More services"
                sx={{ m: "0px auto 0px auto", p: "0px" }}
              >
                <ListAltIcon />
                <Typography variant="caption"> Services</Typography>
              </IconButton> */}
            </CardActions>
          </Box>
        </Box>
      </Box>
    </Card>
  );
}
