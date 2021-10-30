import React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SearchBar from "../SearchBar/SearchBar";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { postLogout } from "../../redux/actions";
import { useDispatch } from "react-redux";
import Cart from "../Cart/Cart";

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
    <Box sx={{ flexGrow: 1 }}>
      <Toolbar>
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
        <Cart />
      </Toolbar>
    </Box>
  );
}
