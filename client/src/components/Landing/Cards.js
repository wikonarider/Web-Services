import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardClick from "./CardClick";
import infoCardClick from "./static/InfoCardClick";
import useWindowPosition from "./hook/useWindowPosition";
import { useHistory } from "react-router";
import Box from "@material-ui/core/Box";
import Modal from "@material-ui/core/Modal";
import Register from "../Register/Register";
import s from "./Cards.module.css";

const useStyles = makeStyles((theme) => ({
  root: {
    minheight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      flexDirection: "row",
    },
  },
}));

const styleRegister = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 600,
  width: "70%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "10px",
  boxShadow: 24,
  p: 2,
};

const Cards = ({ cookie }) => {
  const history = useHistory();
  const [registerModal, setRegisterModal] = useState(false);

  const handleRegister = () => {
    setRegisterModal((prev) => !prev);
  };

  const handleRedirect = () => {
    history.push("/home");
  };

  const classes = useStyles();
  const checked = useWindowPosition("header");
  return (
    <div className={classes.root} id="cards">
      <div onClick={handleRedirect} checked={checked} className={s.hover}>
        <CardClick infoCardClick={infoCardClick[1]} checked={checked} />
      </div>
      <div onClick={handleRegister} checked={checked} className={s.hover}>
        <CardClick infoCardClick={infoCardClick[0]} checked={checked} />
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
            handleRedirect={handleRedirect}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default Cards;
