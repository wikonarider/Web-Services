import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import Toolbar from "@mui/material/Toolbar";
import SortIcon from "@material-ui/icons/Sort";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Link as Scroll } from "react-scroll";
import Login from "../Login/Login";
import { useHistory } from "react-router";
import UserMenu from "../Nav/UserMenu";
import { useSelector } from "react-redux";
import Register from "../Register/Register";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import CloseIcon from "@mui/icons-material/Close";
import useMediaQuery from "@mui/material/useMediaQuery";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "150vh",
    fontFamily: "Nunito",
  },
  appbar: {
    backgroundColor: "transparent !important",
    [theme.breakpoints.down("xs")]: {
      backgroundColor: "rgba(188,179,179,0.6) !important",
    },
  },
  appbarWrapper: {
    width: "100%",
    textAlign: "left",
  },
  appbarTitle: {
    flexGrow: "1",
  },
  icon: {
    color: "#fff",
    fontSize: "2rem",
    margin: "0.5rem",
  },
  iconBtn: {
    "&:hover": {
      background: "transparent !important",
    },
  },
  colorText: {
    color: "#8d6e63",
  },
  container: {
    textAlign: "center",
  },
  title: {
    color: "#fff",
    fontSize: "3rem",
    fontFamily: "Nunito",
  },
  goDown: {
    color: "#cddc39", // lime[500]
    fontSize: "4rem",
  },
  downHover: {
    "&:hover": {
      backgroundColor: "#a2b2bec2 !important",
    },
  },
}));

const Header = ({ cookie, setCheckedCards }) => {
  const classes = useStyles();
  const { userImg, name } = useSelector((state) => state.user);
  const [checked, setChecked] = useState(false);
  const [login, setLogin] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  // eslint-disable-next-line
  const [registerModal, setRegisterModal] = useState(false);
  const queryModal = useMediaQuery("(max-width: 500px)");
  const history = useHistory();
  const trigger = useScrollTrigger();

  // Si scrolea activa las cards, sino
  // apretando el boton tambien activa las cards
  useEffect(() => {
    if (trigger) {
      setCheckedCards(true);
    }
    // eslint-disable-next-line
  }, [trigger]);

  const darkTheme = useSelector((state) => state.darkTheme);

  const styleLogin = {
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

  const styleModal = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    height: "100%",
    display: "flex",
    bgcolor: darkTheme ? "#121212" : "#ffffff",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "10px",
    boxShadow: 24,
  };

  if (login) {
    history.push("/home");
  }

  const handleLogin = () => {
    setLoginModal((prev) => !prev);
  };

  const handleRegister = () => {
    setRegisterModal((prev) => !prev);
  };

  const handleRedirect = () => {
    history.push("/home");
  };

  useEffect(() => {
    setChecked(true);
  }, []);

  return (
    <div className={classes.root} id="header">
      <AppBar className={classes.appbar} elevation={0}>
        <Toolbar className={classes.appbarWrapper}>
          <h1 className={classes.appbarTitle} style={{ color: "white" }}>
            WEB <span className={classes.colorText}>SERVICE. </span>
          </h1>
          {!cookie ? (
            <IconButton onClick={handleLogin} className={classes.iconBtn}>
              <SortIcon className={classes.icon} />
              <p style={{ color: "#535a60" }}>Login</p>
            </IconButton>
          ) : (
            <UserMenu userImg={userImg} name={name} />
          )}
        </Toolbar>
      </AppBar>
      <Collapse
        in={checked}
        {...(checked ? { timeout: 2000 } : {})}
        collapsedSize={50}
      >
        <div className={classes.container}>
          <h1 className={classes.title}>
            Welcome to <br />
            WEB<span className={classes.colorText}>SERVICE.</span>
          </h1>
          <Scroll to="cards" smooth={true}>
            <IconButton
              onClick={() => setCheckedCards(true)}
              className={classes.downHover}
            >
              <ExpandMoreIcon className={classes.goDown} />
            </IconButton>
          </Scroll>
        </div>
      </Collapse>

      <Modal
        open={loginModal}
        onClose={handleLogin}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {/* ---------------Login----------------- */}
        <Box sx={queryModal ? styleModal : styleLogin}>
          {queryModal ? (
            <IconButton
              color="inherit"
              style={{ position: "absolute", top: "10px", right: "10px" }}
              onClick={handleLogin}
            >
              <CloseIcon />
            </IconButton>
          ) : null}
          <Login
            setLoginModal={setLoginModal}
            setLogin={setLogin}
            setRegisterModal={setRegisterModal}
          />
        </Box>
      </Modal>
      {/* ---------------Register----------------- */}
      <Modal
        open={!cookie ? registerModal : false}
        onClose={handleRegister}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={queryModal ? styleModal : styleLogin}>
          {queryModal ? (
            <IconButton
              color="inherit"
              style={{ position: "absolute", top: "10px", right: "10px" }}
              onClick={handleRegister}
            >
              <CloseIcon />
            </IconButton>
          ) : null}
          <Register
            setRegisterModal={setRegisterModal}
            setLoginModal={setLoginModal}
            handleRedirect={handleRedirect}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default Header;
