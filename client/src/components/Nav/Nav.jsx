import React, { useState } from "react";
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
import { useSelector } from "react-redux";

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
  const [registerModal, setRegisterModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const cookie = useSelector((state) => state.cookie);

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
      <AppBar position="fixed" sx={{ zIndex: "1201" }}>
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

          {cookie ? null : (
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
              <Register
                setRegisterModal={setRegisterModal}
                setLoginModal={setLoginModal}
              />
            </Box>
          </Modal>

          {/* Login */}

          {!cookie ? (
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
              <Login
                setLoginModal={setLoginModal}
                setRegisterModal={setRegisterModal}
              />
            </Box>
          </Modal>

          <Cart />
          {cookie ? <UserMenu /> : null}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
