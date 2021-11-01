import React, { useState, useEffect } from "react";
import { Box, Toolbar, Button, AppBar, Modal } from "@mui/material";
import SearchBar from "../SearchBar/SearchBar";
import Cart from "../Cart/Cart";
import SideBar from "../SideBar/SideBar";
import UserMenu from "./UserMenu";
import Login from "../Login/Login";
import Register from "../Register/Register";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "5vh",
  },
  appbar: {
    backgroundColor: "#b0bec5",
  },
  button: {
    variant: "outlined",
    size: "medium",
  },
}));

export default function Nav() {
  const classes = useStyles();
  const [login, setLogin] = useState(false);
  const [registerModal, setRegisterModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [cookie, setCookie] = useState(document.cookie);

  useEffect(() => {
    setCookie(() => document.cookie);
  }, []);

  // Descomentar para ver las cookies en la consola del navegador
  // console.log("Cookies: ", document.cookie);

  const handleLogin = () => {
    setLoginModal((prev) => !prev);
    setRegisterModal(() => false);
  };

  const handleRegister = () => {
    setRegisterModal((prev) => !prev);
    setLoginModal(() => false);
  };

  return (
    <div className={classes.root}>
      <Box
        sx={{
          backgroundflexGrow: 1,
          width: "101%",
        }}
      >
        <AppBar position="fixed">
          <Toolbar
            className={classes.appbar}
            sx={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "5px",
            }}
          >
            <Box>
              <SideBar />
            </Box>
            <Box sx={{ width: "80%", ml: "auto", mr: "auto" }}>
              <SearchBar />
            </Box>

            {/* Register */}

            {login || cookie ? null : (
              <Button className={classes.button} onClick={handleRegister}>
                Register
              </Button>
            )}
            <Modal
              open={registerModal}
              onClose={handleRegister}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  height: "100%",
                  width: "100%",
                }}
              >
                <Register setRegisterModal={setRegisterModal} />
              </Box>
            </Modal>

            {/* Login */}

            {!login && !cookie ? (
              <Button className={classes.button} onClick={handleLogin}>
                Login
              </Button>
            ) : null}
            <Modal
              open={loginModal}
              onClose={handleLogin}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  height: "100%",
                  width: "100%",
                }}
              >
                <Login setLogin={setLogin} setLoginModal={setLoginModal} />
              </Box>
            </Modal>

            <Cart />
            {login || cookie ? (
              <UserMenu setLogin={setLogin} setCookie={setCookie} />
            ) : null}
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}
