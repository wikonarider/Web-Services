import React, { useEffect, useRef, useState } from "react";

import s from "./YourAccount.module.css";

//-------------- MATERIAL UI -------------------------------------
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PostAddIcon from "@mui/icons-material/PostAdd";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import DataSaverOffIcon from "@mui/icons-material/DataSaverOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import HomeIcon from "@mui/icons-material/Home";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
//-------------------------------------------------------
import CardService from "../CardService/CardService";
import { FormDialog } from "./FormDialog/FormDialog";
import { postLogout } from "../../utils/login";
import { getUserInfo, putUser, getUserFavs } from "../../redux/actions";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import CreateService from '../CreateService/CreateService'
import ModalCreateService from "./ModalCreateService";

export default function YourAccount() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);

  useEffect(() => {
    (async () => {
      dispatch(await getUserInfo());
      dispatch(await getUserFavs());
    })();

    // eslint-disable-next-line
  }, []);

  //BOTONES - YOUR ORDERS - YOUR FAVS - YOUR SERVICES
  const [viewServices, setViewservices] = useState(false);
  const [viewOrders, setViewOrders] = useState(false);
  const [viewFavs, setViewFavs] = useState(false);
  //----------------------------------------------

  //MODAL FORM PARA CAMBIAR DATOS
  const [openForm, setOpenForm] = useState(false);
  const [modal, setModal] = useState(false);
  //-----------------------------------

  //ESTADOS APRA ALMACENAR LA IMAGEN CUANDO LA QUIERA CAMBIAR
  // eslint-disable-next-line
  const [img, setImg] = useState("");

  //---------------------------------------------------

  //REFERENCIA PARA ESCONDER EL INPUT DE CARGA DE IMAGEN
  const fileInput = useRef();
  //----------------------------------------------------

  //HANDLE IMAGEN CLOUDINARY
  const handleImageUpload = () => {
    const { files } = document.querySelector('input[type="file"]');
    const formData = new FormData();
    formData.append("file", files[0]);
    // replace this with your upload preset name
    formData.append("upload_preset", "hn1tlyfq");
    const options = {
      method: "POST",
      body: formData,
    };

    return fetch(
      "https://api.cloudinary.com/v1_1/dzjz8pe0y/image/upload",
      options
    )
      .then((res) => res.json())
      .then((res) => dispatch(putUser({ userImg: res.secure_url })))
      .catch((err) => console.log(err));
  };
  //--------------------------------------------------------------

  // HANDLE LOGOUT
  const logOutClear = async () => {
    document.cookie = "userId=; max-age=0";
    await postLogout();
  };
  //-------------------------------
  // eslint-disable-next-line
  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div>
      {/* ---------------    'NAVBAR' ---------------------------------------- */}
      <div className={s.nav}>
        <IconButton color="secondary" component={Link} to="/home">
          <HomeIcon />
        </IconButton>
        <p className={s.yourAccount}>Your Account</p>

        <div className={s.logOut}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button
              variant="outlined"
              color="primary"
              size="small"
              onClick={logOutClear}
            >
              LOG OUT
            </Button>
          </Link>
        </div>
      </div>

      {/* --------------------------------------------------------- */}

      {/* ------------------------USERINFO--------------------------- */}
      <div className={s.user}>
        <div>
          <Avatar
            alt="user name"
            src={userData.userImg}
            sx={{ width: 200, height: 200, marginBottom: 2 }}
            className={s.avatar}
          ></Avatar>

          <div className={s.changePhoto}>
            <input
              style={{ display: "none" }}
              type="file"
              name="myImage"
              ref={fileInput}
              onChange={(e) => setImg(e.target.files[0])}
            />
            <Button
              variant="text"
              size="small"
              color="secondary"
              startIcon={<PhotoCameraIcon />}
              sx={{ marginRight: 1 }}
              onClick={() => {
                fileInput.current.click();
              }}
            >
              Upload
            </Button>

            <Button
              variant="contained"
              // startIcon={<PhotoCameraIcon />}
              size="small"
              color="secondary"
              sx={{ boxShadow: "none", marginLeft: 1 }}
              // onClick={() => {
              //   fileInput.current.click();
              // }}
              onClick={handleImageUpload}
            >
              SUBMIT
            </Button>
          </div>
        </div>

        <div className={s.userInfo}>
          <div className={s.fullName}>
            <p className={s.name}>{userData.name}</p>
            <p>{userData.lastname}</p>
          </div>

          <p>{userData.username}</p>
          <p>{userData.email}</p>
        </div>
      </div>

      {/* ------------------------------------------------------- */}

      {/* ----------------------  BOTONERA ------------------------------------------- */}

      <div className={s.botonera}>
        <Button
          variant={viewOrders ? "contained" : "outlined"}
          color={viewOrders ? "secondary" : "primary"}
          startIcon={<ShoppingBagIcon />}
          onClick={() => {
            setViewFavs(false);
            setViewOrders(!viewOrders);
            setViewservices(false);
          }}
          sx={{
            marginRight: 1,
            marginLeft: 1,
            marginBottom: 1,
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
          sx={{
            marginRight: 1,
            marginLeft: 1,
            marginBottom: 1,
          }}
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
          sx={{
            marginRight: 1,
            marginLeft: 1,
            marginBottom: 1,
          }}
        >
          Your Services
        </Button>

        {/* <Link to="/service" style={{ textDecoration: "none" }}> */}
        <Button
          variant="outlined"
          startIcon={<PostAddIcon />}
          sx={{
            marginRight: 1,
            marginLeft: 1,
            marginBottom: 1,
          }}
          onClick={() => {
            setModal(true);
          }}
        >
          Post Service
        </Button>
        {/* </Link> */}

        <Button
          variant="outlined"
          startIcon={<DataSaverOffIcon />}
          onClick={() => {
            setOpenForm(true);
          }}
          sx={{
            marginRight: 1,
            marginLeft: 1,
            marginBottom: 1,
          }}
        >
          Change Your Data
        </Button>
      </div>

      {/* ------------------------------------------------------ */}

      {/* -------------------FAVS------------------------ */}
      {viewFavs &&
        (userData.servicesFavs.length > 0 ? (
          <Container>
            <div>
              <Grid container justifyContent="center" spacing={3}>
                {userData.servicesFavs.map((s) => (
                  <Grid item key={s.id}>
                    <CardService service={s} />
                  </Grid>
                ))}
              </Grid>
            </div>
          </Container>
        ) : (
          <div className={s.addFavContainer}>
            <h3>Your Fav-list is currently empty</h3>
            <div className={s.addToFav}>
              <p>
                Add Services that you like and want to see later by clicking on
                the
              </p>
              <FavoriteIcon sx={{ marginLeft: 1 }} />
            </div>
          </div>
        ))}
      {/* ------------------------------------------------ */}

      {/* ------------------ORDERS---------------------------- */}
      {viewOrders && (
        <Container>
          <div>
            <h1>YOUR ORDERS</h1>
          </div>
        </Container>
      )}
      {/* ----------------------------------------------------- */}

      {/* -------------------SERVICES-------------------------- */}
      {viewServices &&
        (userData.servicesOwn.length > 0 ? (
          <div>
            <Container>
              <Grid container justifyContent="center" spacing={3}>
                {userData.servicesOwn.map((s) => (
                  <Grid item key={s.id}>
                    <CardService service={s} />
                  </Grid>
                ))}
              </Grid>
            </Container>
          </div>
        ) : (
          <div className={s.addFavContainer}>
            <h3>You are currently not offering any services</h3>
            <div className={s.addToFav}>
              <p>
                Post Services that you want to offer by clicking on POST SERVICE
              </p>
            </div>
          </div>
        ))}
      {/* ---------------------------------------------- */}

      <FormDialog setOpenForm={setOpenForm} openForm={openForm} />
      <ModalCreateService modal={modal} setModal={setModal} />
    </div>
  );
}
