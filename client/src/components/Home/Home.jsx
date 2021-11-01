import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getServices, getUserFavs } from "../../redux/actions";
import Cards from "../Cards/Cards";
import Nav from "../Nav/Nav";
import Carrousel from "../Carrousel/Carrousel";
import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    // backgroundColor: "#b0bec5",
    backgroundImage: `url(${`https://images.pexels.com/photos/4270292/pexels-photo-4270292.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
  },
}));


export default function Home() {
  const classes = useStyles();
  const servicesState = useSelector((state) => state.services);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getServices());
  }, [dispatch]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Nav />
      <Carrousel />
      <Cards services={servicesState} />
    </div>
  );
}
