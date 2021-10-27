import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SearchBar from "../SearchBar/SearchBar";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";


export default function Nav() {
  const history = useHistory();

  const routeChange = () => {
    let path = "/carrito";
    history.push(path);
  };


  //cheque si el usuario esta logeado
  const user = useSelector((state) => state.userData);
  let button;
  if (user) {
    button = `Hello, ${user.name}`;
  } else {
    button = "Hello, Sign In";
  }

  let reDirect;
  if (user) {
    reDirect = "/account";
  } else {
    reDirect = "/singin";
  }
//---------------------------------------

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          ></Typography>
          <SearchBar />
          <Link to={reDirect} style={{ textDecoration: 'none' }}>
            <Button variant="outlined" color="secondary" size="small" >
              {button}
            </Button>
          </Link>
          <IconButton onClick={routeChange}>
            <ShoppingCartIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
