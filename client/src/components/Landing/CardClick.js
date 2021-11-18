import React from "react";
import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grow from "@mui/material/Grow";

const styles = {
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
};

export default function CardClick({ infoCardClick, checkedCards }) {
  return (
    <Grow in={checkedCards} {...(checkedCards ? { timeout: 2500 } : {})}>
      <Card sx={styles.root}>
        <CardMedia
          sx={styles.media}
          image={infoCardClick.imageUrl}
          title="illustrative image"
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="h1"
            sx={styles.title}
          >
            {infoCardClick.title}
          </Typography>
        </CardContent>
      </Card>
    </Grow>
  );
}
