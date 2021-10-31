import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import Header from "./Header";
import Cards from "./Cards";
import LandingNav from "./LandingNav";

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
  return (
    <div className={classes.root}>
      {/* <LandingNav /> */}
      <CssBaseline />
      <Header />
      <Cards />
    </div>
  );
};

export default Landing;
