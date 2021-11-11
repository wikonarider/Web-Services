import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";

import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
// import Collapse from "@mui/material/Collapse";

const useStyles = makeStyles({
  root: {
    maxWidth: 645,
    background: "rgba(0,0,0,0.5)",
    margin: "20px",
  },
  media: {
    width: 440,
    height: 390,
  },
  title: {
    fontFamily: "Nunito",
    fontWeight: "bold",
    fontSize: "2rem",
    color: "#fff",
  },
});

export default function CardClick({ infoCardClick, checked }) {
  const classes = useStyles();
  return (
    //    <Collapse in={checked} {...(checked ? { timeout: 2500 } : {})}>
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={infoCardClick.imageUrl}
        title="illustrative image"
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="h1"
          className={classes.title}
        >
          {infoCardClick.title}
        </Typography>
      </CardContent>
    </Card>
    //    </Collapse>
  );
}
