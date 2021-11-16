import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link, useHistory } from "react-router-dom";
import ChatIcon from "@mui/icons-material/Chat";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { CardActionArea } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

const IMG_TEMPLATE =
  "https://codyhouse.co/demo/squeezebox-portfolio-template/img/img.png";

export default function CardUser({ user, serviceId }) {
  const cookie = useSelector((state) => state.cookie);  
  const userAccount = useSelector((state) => state.user);


  let { id, userImg, username, name, lastname } = user;
  let fullname = name + " " + lastname;
  const fixedTitle = fullname
    ? fullname.length > 40
      ? `${fullname.substring(0, 40)}...`
      : fullname
    : null;


  let buyer =
    userAccount.servicesBought &&
    userAccount.servicesBought.filter((id) => {
      return id === serviceId;
    }).length > 0;

  return (
    <Card
      sx={{
        height: "minContent",
        textDecoration: "none",
        m: "10px auto 10px auto",
        p: "10px",
        border: "solid 1px lightgrey",
      }}
    >
      <Box
        id={id}
        key={id}
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gap={1}
        sx={{
          m: "5px 0px",
          height: "minContent",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box gridColumn="span 5">
          {/* User imagen */}
          <CardMedia
            component="img"
            image={userImg ? userImg : IMG_TEMPLATE}
            alt={username}
            sx={{
              objectFit: "cover",
              borderRadius: "50%",
              height: "150px",
              width: "150px",
              m: "auto 0px auto 3px",
              alignSelf: "center",
            }}
          />
        </Box>
        <Box
          gridColumn="span 7"
          display="flex"
          flexDirection="column"
          height="100%"
        >
          {/* title */}
          <Box
            gridColumn="span 12"
            display="flex"
            flexDirection="column"
            m="10px auto 40px auto"
          >
            <Typography
              variant="subtitle1"
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
          {/* Button chat profile */}
          <Box
            gridColumn="span 12"
            display="flex"
            flexDirection="row"
            gap="10px"
            pr="15px"
            width="100%"
          >
            {/* chat */}

            {cookie && buyer ? (
              <CardActionArea
                sx={{
                  width: "80px",
                  mt: "auto",
                  transform: "scale(1.3)",
                  display: "flex",
                  gap: "5px",
                }}
              >
                <ChatIcon />

                <Typography variant="caption">Chat</Typography>
              </CardActionArea>
            ) : null}

            {/* Profile */}

            <CardActionArea
              component={Link}
              to={`/users/${id}`}
              sx={{
                width: "80px",
                mt: "auto",
                transform: "scale(1.3)",
                display: "flex",
                gap: "5px",
              }}
            >
              <AccountBoxIcon />
              <Typography variant="caption">Profile</Typography>
            </CardActionArea>
          </Box>
        </Box>
      </Box>
    </Card>
  );
}
