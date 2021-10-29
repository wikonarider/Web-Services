import React, { useRef, useState } from "react";

import s from "./YourAccount.module.css";

import { Button, Avatar } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PostAddIcon from "@mui/icons-material/PostAdd";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import DataSaverOffIcon from "@mui/icons-material/DataSaverOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CardService from "../CardService/CardService";
import { Container, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import { FormDialog } from "./FormDialog/FormDialog";

//mockup de usuario para mostrar el panel
const userData = {
  id: "4e218c00-36ad-11ec-8d3d-0242ac130003",
  userImg: "http://dummyimage.com/189x100.png/5fa2dd/ffffff",
  name: "Everett",
  lastname: "Roskilly",
  username: "eroskilly7",
  password: "$2b$10$Q1eIlfNVChrK3VWl7.PPVeCywddxvrNarA7OMsafFgsoFz8GT2hqO",
  email: "eroskilly7@twitpic.com",
  location: ["Ushuaia"],
  ban: false,
  createdAt: "2021-10-28T13:38:48.567Z",
  updatedAt: "2021-10-28T13:38:48.567Z",
  services: [
    {
      id: 4,
      title: "paseadora de perros",
      img: "https://www.ciudaddelosangeles.com/wp-content/uploads/2016/03/paseador-de-perros.jpg",
      description: "i love little dogs",
      price: 15.3,
      createdAt: "2021-10-28T13:38:49.601Z",
      updatedAt: "2021-10-28T13:38:49.601Z",
      userId: "4e218c00-36ad-11ec-8d3d-0242ac130003",
      categoryId: 31,
    },
  ],
  qualifications: [],
};

const useStyles = makeStyles({
  button: {
    marginRight: 5,
    marginLeft: 5,
  },
});

export default function YourAccount() {
  // const userData = useSelector((state) => state.userData);

  const classes = useStyles();

  const [viewServices, setViewservices] = useState(false);
  const [viewOrders, setViewOrders] = useState(false);
  const [viewFavs, setViewFavs] = useState(false);

  const [openForm, setOpenForm] = useState(false);

  const fileInput = useRef();

  // function loadImg(files) {}

  return (
    <div>
      <p className={s.yourAccount}>Your Account</p>

      <div className={s.user}>
        <div>
          <Avatar
            alt="user name"
            src={userData.userImg}
            sx={{ width: 200, height: 200 }}
            className={s.avatar}
          ></Avatar>

          <input style={{ display: "none" }} type="file" ref={fileInput} />

          <Button
            variant="text"
            startIcon={<PhotoCameraIcon />}
            size="small"
            color="secondary"
            onClick={() => fileInput.current.click()}
          >
            Change Photo
          </Button>
        </div>

        <div className={s.userInfo}>
          <div className={s.fullName}>
            <p className={s.name}>{userData.name}</p>
            <p>{userData.lastname}</p>
          </div>

          <p>{userData.username}</p>
          <p>{userData.email}</p>
          <p>{userData.location}</p>
        </div>
      </div>

      <div className={s.botonera}>
        <Button
          variant={viewOrders ? "contained" : "outlined"}
          color={viewOrders ? "secondary" : "primary"}
          startIcon={<ShoppingBagIcon />}
          className={classes.button}
          onClick={() => {
            setViewFavs(false);
            setViewOrders(!viewOrders);
            setViewservices(false);
          }}
        >
          Your Orders
        </Button>
        <Button
          variant={viewFavs ? "contained" : "outlined"}
          color={viewFavs ? "secondary" : "primary"}
          startIcon={<FavoriteIcon />}
          onClick={() => {
            setViewFavs(!viewFavs);
            setViewOrders(false);
            setViewservices(false);
          }}
          className={classes.button}
        >
          Your Favs
        </Button>
        <Button
          variant={viewServices ? "contained" : "outlined"}
          color={viewServices ? "secondary" : "primary"}
          startIcon={<VisibilityIcon />}
          onClick={() => {
            setViewFavs(false);
            setViewOrders(false);
            setViewservices(!viewServices);
          }}
          className={classes.button}
        >
          Your Services
        </Button>

        <Link to="/service" style={{ textDecoration: "none" }}>
          <Button
            variant="outlined"
            startIcon={<PostAddIcon />}
            className={classes.button}
          >
            Post Service
          </Button>
        </Link>

        <Button
          variant="outlined"
          startIcon={<DataSaverOffIcon />}
          onClick={() => {
            setOpenForm(true);
          }}
          className={classes.button}
        >
          Change Your Data
        </Button>
      </div>

      {viewFavs && (
        <Container>
          <div>
            <h1>YOUR FAVS</h1>
            {userData.qualifications.map((s) => (
              <CardService service={s} />
            ))}
          </div>
        </Container>
      )}
      {viewOrders && (
        <Container>
          <div>
            <h1>YOUR ORDERS</h1>
          </div>
        </Container>
      )}
      {viewServices && (
        <Container>
          <div>
            <h1>YOUR SERVICES</h1>
            {userData.services.map((s) => (
              <CardService service={s} />
            ))}
          </div>
        </Container>
      )}

      <FormDialog setOpenForm={setOpenForm} openForm={openForm} />
    </div>
  );
}
