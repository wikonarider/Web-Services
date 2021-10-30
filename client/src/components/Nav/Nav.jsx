import React from "react";
import { Box, Toolbar, Button, AppBar } from "@mui/material";
import SearchBar from "../SearchBar/SearchBar";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { postLogout } from "../../redux/actions";
import { useDispatch } from "react-redux";
import Cart from "../Cart/Cart";
import SideBar from "../SideBar/SideBar";

export default function Nav() {
  const history = useHistory();
  const dispatch = useDispatch();
  const cookiesState = useSelector((state) => state.cookies);
  if (cookiesState.length > 0) {
    document.cookie =
      encodeURIComponent("userId") + "=" + encodeURIComponent(cookiesState);
    console.log(document.cookie);
  }

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
    button = `Your Account`;
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

  return (
    <Box sx={{ flexGrow: 1, width: "101%" }}>
      <AppBar position="sticky" sx={{ zIndex: "9999" }}>
        <Toolbar
          sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
        >
          <Box>
            <SideBar />
          </Box>
          <Box sx={{ width: "50%", ml: "auto", mr: "auto" }}>
            <SearchBar />
          </Box>
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
          <Cart />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
