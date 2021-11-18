import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "./Header";
import Cards from "./Cards";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    backgroundImage: `url(${`https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
}));

const Landing = () => {
  const classes = useStyles();
  const cookie = useSelector((state) => state.cookie);
  const [checkedCards, setCheckedCards] = useState(false);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header cookie={cookie} setCheckedCards={setCheckedCards} />
      <Cards cookie={cookie} checkedCards={checkedCards} />
    </div>
  );
};

export default Landing;
