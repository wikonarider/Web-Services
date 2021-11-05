import Button from "@mui/material/Button";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PostAddIcon from "@mui/icons-material/PostAdd";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import DataSaverOffIcon from "@mui/icons-material/DataSaverOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

import s from "./Botonera.module.css";
import { useHistory } from "react-router";

export default function YourAccount({
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
}) {
  const history = useHistory();

  const handleClickPostService = () => {
    history.push("/createservice");
  };

  return (
    <div className={s.botonera}>
      {user.admin && (
        <Button
          variant={viewAdmin ? "contained" : "outlined"}
          color={viewAdmin ? "secondary" : "primary"}
          startIcon={<ShoppingBagIcon />}
          onClick={() => {
            setViewFavs(false);
            setViewOrders(false);
            setViewAdmin(!viewAdmin);
            setViewservices(false);
          }}
          sx={{
            marginRight: 1,
            marginLeft: 1,
            marginBottom: 1,
          }}
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
          setViewAdmin(false);
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
          setViewAdmin(false);
        }}
        sx={{
          marginRight: 1,
          marginLeft: 1,
          marginBottom: 1,
        }}
      >
        Your Services
      </Button>

      <Button
        variant="outlined"
        startIcon={<PostAddIcon />}
        sx={{
          marginRight: 1,
          marginLeft: 1,
          marginBottom: 1,
        }}
        onClick={handleClickPostService}
      >
        Post Service
      </Button>

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
  );
}
