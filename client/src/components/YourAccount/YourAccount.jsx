import React from "react";
import { useSelector } from "react-redux";

import s from "./YourAccount.module.css";

import { Typography, Button, Avatar } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import DataSaverOffIcon from '@mui/icons-material/DataSaverOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

//mockup de usuario para mostrar el panel
const userData = {
  id: "4e218c00-36ad-11ec-8d3d-0242ac130003",
  userImg: "http://dummyimage.com/189x100.png/5fa2dd/ffffff",
  name: "Everett",
  lastname: "Roskilly",
  username: "eroskilly7",
  password: "DJM1j7OZYlO",
  email: "eroskilly7@twitpic.com",
  location: ["Ushuaia"],
  ban: false,
  createdAt: "2021-10-27T15:40:21.861Z",
  updatedAt: "2021-10-27T15:40:21.861Z",
};

export default function YourAccount() {
  // const userData = useSelector((state) => state.userData);

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

          <Button
            variant="text"
            startIcon={<PhotoCameraIcon />}
            size="small"
            color="secondary"
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

      <div>
        <Button
          variant="outlined"
          startIcon={<ShoppingBagIcon />}
          className={s.button}
          onClick={() => console.log("orders")}
        >
          Your Orders
        </Button>
        <Button
          variant="outlined"
          startIcon={<FavoriteIcon />}
          onClick={() => console.log("favs")}
        >
          Your Favs
        </Button>
      </div>
      <div>
        <Button
          variant="outlined"
          startIcon={<HomeRepairServiceIcon />}
          onClick={() => console.log("service")}
        >
          Post Service
        </Button>
        <Button
          variant="outlined"
          startIcon={<VisibilityIcon />}
          onClick={() => console.log("service")}
        >
          Your Services
        </Button>
        <Button
          variant="outlined"
          startIcon={<DataSaverOffIcon />}
          onClick={() => console.log("profile data")}
        >
          Change Your Data
        </Button>
      </div>
    </div>
  );
}

// cambiar foto
// ver favs ---
// crear servicio ---
// ver servicios comprados // orders  ---
// chatear con usuarios de servicios que compro //

// datos de la cuenta
