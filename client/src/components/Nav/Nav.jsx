import React from "react";
// import AppBar from '@mui/material/AppBar';
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SearchBar from "../SearchBar/SearchBar";
// import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Badge } from "@mui/material";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { postLogout } from "../../redux/actions";
import { useDispatch } from "react-redux";

export default function Nav() {
  const history = useHistory();
  const dispatch = useDispatch();
  const cookiesState = useSelector((state) => state.cookies);
  if (cookiesState.length > 0) {
    document.cookie =
      encodeURIComponent("userId") + "=" + encodeURIComponent(cookiesState);
    console.log(document.cookie);
  }

  const routeChange = () => {
    let path = "/carrito";
    history.push(path);
  };

  const logOutClear = () => {
    document.cookie = "userId=; max-age=0";
    dispatch(postLogout());
    history.push("/login");
  };

  //cheque si el usuario esta logeado
  // const user = useSelector((state) => state.userData);
  let button;
  let button2;
  if (document.cookie) {
    button = `Hello, user`;
  } else {
    button = "Hello, Sign In";
  }

  if (document.cookie) {
    button2 = `LogOut`;
  } else {
    button2 = "Register";
  }

  let reDirect;
  if (document.cookie) {
    reDirect = "/account";
  } else {
    reDirect = "/login";
  }
  let reDirect2;
  if (!document.cookie) {
    reDirect2 = "/register";
  } else {
    reDirect2 = "/login";
  }

  //-- count tiene que ser igual a las cosas que hayan en el carrito

  let count = 4;

  //--------------------
  //solo saqué el botón porque lo tengo en la SideBar
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Toolbar>
        {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
        ></Typography>
        <SearchBar />
        <Link to={reDirect} style={{ textDecoration: "none" }}>
          <Button variant="outlined" color="secondary" size="small">
            {button}
          </Button>
        </Link>
        <Link to={reDirect2} style={{ textDecoration: "none" }}>
          <Button
            variant="outlined"
            color="secondary"
            size="small"
            onClick={logOutClear}
          >
            {button2}
          </Button>
        </Link>
        <IconButton onClick={routeChange}>
          <Badge color="secondary" badgeContent={count}>
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </Box>
  );
}
