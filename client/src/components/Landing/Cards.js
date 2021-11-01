import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardClick from "./CardClick";
import infoCardClick from "./static/InfoCardClick";
import useWindowPosition from "./hook/useWindowPosition";
import { useHistory } from "react-router";
import { Box, Modal } from "@material-ui/core";
import Register from "../Register/Register";

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
      <div
        onClick={handleRedirect}
        checked={checked}
        style={{ cursor: "pointer" }}
      >
        <CardClick infoCardClick={infoCardClick[1]} checked={checked} />
      </div>
      <div
        onClick={handleRegister}
        checked={checked}
        style={{ cursor: "pointer" }}
      >
        <CardClick infoCardClick={infoCardClick[0]} checked={checked} />
      </div>
      <Modal
        open={!cookie ? registerModal : false}
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
