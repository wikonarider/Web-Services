import React, { useState } from "react";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Modal from "@mui/material/Modal";
import SearchBar from "../SearchBar/SearchBar";
import Cart from "../Cart/Cart";
import SideBar from "../SideBar/SideBar";
import UserMenu from "./UserMenu";
import Login from "../Login/Login";
import Register from "../Register/Register";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ScrollTop from "./ScrollTop";

// MATERIAL UI
import { Button, makeStyles } from "@material-ui/core";
import { brown, lime } from "@mui/material/colors";
import clsx from "clsx";

import DarkMode from "./DarkMode";

const useStyles = makeStyles({
  default: {
    borderRadius: 0,
    textTransfrom: "none",
  },
  // primary: {
  //   '&:hover': {
  //     backgroundColor: lime[600],
  //     color: brown[500],
  //   },
  // },
  secondary: {
    main: lime[600],
    contrastText: brown[500],
  },
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 600,
  width: "70%",
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
};

export default function Nav({ route, check, change }) {
  const [registerModal, setRegisterModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const cookie = useSelector((state) => state.cookie);
  const { userImg, name } = useSelector((state) => state.user);

  const classes = useStyles();

  // Descomentar para ver las cookies en la consola del navegador
  // console.log("Cookies: ", cookie);

  const handleLogin = () => {
    setLoginModal((prev) => !prev);
    setRegisterModal(() => false);
  };

  const handleRegister = () => {
    setRegisterModal((prev) => !prev);
    setLoginModal(() => false);
  };

  return (
    <Box sx={{ flexGrow: 1, width: "101%" }} id="back-to-top-anchor">
      <AppBar position="fixed" sx={{ zIndex: "1201" }}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "center",
            // flexWrap: "wrap",
            gap: "5px",
          }}
        >
          <Box mr="auto" display="flex" alignItems="center">
            {route === "home" ? (
              <>
                <SideBar check={check} change={change} />
                <DarkMode />
              </>
            ) : (
              <>
                <IconButton color="inherit" component={Link} to="/home">
                  <HomeIcon />
                </IconButton>
                <DarkMode />
              </>
            )}
          </Box>
          <Box
            sx={
              route === "home"
                ? { width: "70%", maxWidth: "920px", mr: "auto" }
                : { display: "none" }
            }
          >
            {route === "home" ? <SearchBar /> : null}
          </Box>

          <Box display="flex" gap="5px" p="5px">
            {/* Register */}
            {cookie || route === "checkout" ? null : (
              <Button
                variant="contained"
                size="medium"
                className={clsx(classes.default, classes.primary)}
                onClick={handleRegister}
              >
                REGISTER
              </Button>
            )}
            <Modal
              open={registerModal}
              onClose={handleRegister}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Register
                  setRegisterModal={setRegisterModal}
                  setLoginModal={setLoginModal}
                />
              </Box>
            </Modal>

            {!cookie && route !== "checkout" ? (
              <Button
                variant="contained"
                size="medium"
                className={clsx(classes.default, classes.primary)}
                onClick={handleLogin}
              >
                Login
              </Button>
            ) : null}
            <Modal
              open={loginModal}
              onClose={handleLogin}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Login
                  setLoginModal={setLoginModal}
                  setRegisterModal={setRegisterModal}
                />
              </Box>
            </Modal>

            {route === "checkout" ? null : <Cart />}
            {cookie ? (
              <UserMenu route={route} userImg={userImg} name={name} />
            ) : null}
          </Box>
        </Toolbar>
      </AppBar>
      <ScrollTop>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </Box>
  );
}
