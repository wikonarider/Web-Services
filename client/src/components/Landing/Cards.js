import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardClick from "./CardClick";
import infoCardClick from "./static/InfoCardClick";
import { useHistory } from "react-router";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Register from "../Register/Register";
import Login from "../Login/Login";
import s from "./Cards.module.css";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    minheight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },
  },
}));

const Cards = ({ cookie, checkedCards }) => {
  const history = useHistory();
  const [registerModal, setRegisterModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [login, setLogin] = useState(false);
  const darkTheme = useSelector((state) => state.darkTheme);

  const styleRegister = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: 600,
    width: "70%",
    bgcolor: darkTheme ? "#121212" : "#ffffff",
    borderRadius: "10px",
    boxShadow: 24,
    p: 2,
  };

  if (login) {
    history.push("/home");
  }

  const handleRegister = () => {
    setRegisterModal((prev) => !prev);
  };

  const handleLogin = () => {
    setLoginModal((prev) => !prev);
  };

  const handleRedirect = () => {
    history.push("/home");
  };

  const classes = useStyles();
  return (
    <div className={classes.root} id="cards">
      <div onClick={handleRedirect} className={s.hover}>
        <CardClick
          infoCardClick={infoCardClick[1]}
          checkedCards={checkedCards}
        />
      </div>
      <div onClick={handleRegister} className={s.hover}>
        <CardClick
          infoCardClick={infoCardClick[0]}
          checkedCards={checkedCards}
        />
      </div>

      <Modal
        open={!cookie ? registerModal : false}
        onClose={handleRegister}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleRegister}>
          <Register
            setRegisterModal={setRegisterModal}
            setLoginModal={setLoginModal}
            handleRedirect={handleRedirect}
          />
        </Box>
      </Modal>

      <Modal
        open={loginModal}
        onClose={handleLogin}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleRegister}>
          <Login
            setLoginModal={setLoginModal}
            setLogin={setLogin}
            setRegisterModal={setRegisterModal}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default Cards;
