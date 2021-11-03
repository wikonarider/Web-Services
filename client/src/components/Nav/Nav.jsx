import React, { useState, useEffect } from "react";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Modal from "@mui/material/Modal";
import SearchBar from "../SearchBar/SearchBar";
import Cart from "../Cart/Cart";
import SideBar from "../SideBar/SideBar";
import UserMenu from "./UserMenu";
import Login from "../Login/Login";
import Register from "../Register/Register";

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

export default function Nav() {
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
    <Box sx={{ flexGrow: 1, width: "101%" }}>
      <AppBar position="fixed" sx={{ zIndex: "9999" }}>
        <Toolbar
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
          <Box sx={{ width: "50%", ml: "auto", mr: "auto" }}>
            <SearchBar />
          </Box>

          {/* Register */}

          {login || cookie ? null : (
            <Button
              variant="contained"
              size="medium"
              color="secondary"
              onClick={handleRegister}
            >
              Register
            </Button>
          )}
          <Modal
            open={registerModal}
            onClose={handleRegister}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Register setRegisterModal={setRegisterModal} />
            </Box>
          </Modal>

          {/* Login */}

          {!login && !cookie ? (
            <Button
              variant="contained"
              size="medium"
              color="secondary"
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
  );
}
