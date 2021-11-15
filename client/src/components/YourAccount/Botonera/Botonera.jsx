import Button from "@mui/material/Button";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PostAddIcon from "@mui/icons-material/PostAdd";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import DataSaverOffIcon from "@mui/icons-material/DataSaverOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ChatIcon from "@mui/icons-material/Chat";
import { makeStyles } from "@material-ui/core/styles";
import s from "./Botonera.module.css";
import { useHistory } from "react-router";

import { animateScroll as scroll } from "react-scroll";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  buttonStyle: {
    marginRight: 1,
    marginLeft: 1,
    marginBottom: 1,
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  }
}));

export default function Botonera({
  viewServices,
  viewOrders,
  viewFavs,
  viewAdmin,
  setViewFavs,
  setViewOrders,
  setViewservices,
  setViewAdmin,
  setOpenForm,
  user,
  darkTheme,
}) {

  const history = useHistory();
  const handleClickPostService = () => {
    history.push("/createservice");
  };

  const classes = useStyles();

  const goMessages = () => {
    history.push(`/chat`);
  };
  // const buttonStyle = {
  //   marginRight: 1,
  //   marginLeft: 1,
  //   marginBottom: 1,
  // };

  return (
    <>
      <div className={s.botonera}>
        {user.admin && (
          <Button
            variant={viewAdmin ? "contained" : "outlined"}
            color={viewAdmin ? "secondary" : 'primary'}
            startIcon={<AdminPanelSettingsIcon />}
            onClick={() => {
              setViewFavs(false);
              setViewOrders(false);
              setViewAdmin(!viewAdmin);
              setViewservices(false);
              scroll.scrollToBottom();
            }}
            className={classes.buttonStyle}
          >
            Admin
          </Button>
        )}
        <Button
          variant={viewOrders ? "contained" : "outlined"}
          color={viewOrders ? "secondary" : "primary"}
          startIcon={<ShoppingBagIcon />}
          onClick={() => {
            setViewFavs(false);
            setViewOrders(!viewOrders);
            setViewservices(false);
            setViewAdmin(false);
            scroll.scrollToBottom();
          }}
          className={classes.buttonStyle}
        >
          My Orders
        </Button>
        <Button
          startIcon={<ChatIcon />}
          variant="outlined"
          onClick={() => {
            setViewFavs(false);
            setViewOrders(!viewOrders);
            setViewservices(false);
            setViewAdmin(false);
            scroll.scrollToBottom();
            goMessages();
          }}
          className={classes.buttonStyle}
        >
          My Messages
        </Button>
        <Button
          variant={viewFavs ? "contained" : "outlined"}
          color={viewFavs ? "secondary" : "primary"}
          startIcon={<FavoriteIcon />}
          onClick={() => {
            setViewFavs(!viewFavs);
            setViewOrders(false);
            setViewservices(false);
            setViewAdmin(false);
            scroll.scrollMore(400);
          }}
          className={classes.buttonStyle}
        >
          My Favs
        </Button>
        <Button
          variant={viewServices ? "contained" : "outlined"}
          color={viewServices ? "secondary" : "primary"}
          startIcon={<VisibilityIcon />}
          onClick={() => {
            setViewFavs(false);
            setViewOrders(false);
            setViewservices(!viewServices);
            setViewAdmin(false);
            scroll.scrollToBottom();
          }}
          className={classes.buttonStyle}
        >
          My Services
        </Button>

        <Button
          variant="outlined"
          startIcon={<PostAddIcon />}
          className={classes.buttonStyle}
          onClick={handleClickPostService}
        >
          Add Service
        </Button>

        <Button
          variant="outlined"
          startIcon={<DataSaverOffIcon />}
          onClick={() => {
            setOpenForm(true);
          }}
          className={classes.buttonStyle}
        >
          Change My Data
        </Button>
      </div>
    </>
  );
}
