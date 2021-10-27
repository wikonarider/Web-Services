import React from "react";
import Carousel from "react-material-ui-carousel";
import {
  Button,
  Container,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";

import s from "./Carousel.module.css";
import { Card } from "@mui/material";
import { makeStyles } from "@material-ui/styles";

//habria que tener un estado con los destacados y esos serian los que se muestran
//queda asi para visualizar
const featured = [
  {
    title: "Karaoke",
    description: "canto lindo rey  ",
    img: "https://i.ytimg.com/vi/7BqddKQSVhE/maxresdefault.jpg",
    price: 1.05,
  },
  {
    title: "Gasista",
    description: "Hago revisión de instalaciones en general",
    img: "https://placeimg.com/400/400/service/3",
    price: 8,
  },
  {
    title: "electricista",
    description: "pongo los mejores enchufes del condado",
    img: "https://placeimg.com/400/400/service/4",
    price: 3.05,
  },
  {
    title: "paseadora de perros",
    description: "i love little dogs",
    img: "https://www.ciudaddelosangeles.com/wp-content/uploads/2016/03/paseador-de-perros.jpg",
    price: 15.3,
  },

  {
    title: "musical performance drag queen",
    description: "te hago tu señor show",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnhkWeqrLkQsnR9luI2nBqGejwey22a0QhTA&usqp=CAU",
    price: 19.3,
  },
  {
    title: "prfesorx de yoga",
    description: "i love little dogs",
    img: "https://www.yogaenred.com/wp-content/uploads/2020/04/Profesora-yoga-1-605x403.jpg",
    price: 28.3,
  },
];

const useStyles = makeStyles({
  card: {
    width: 300,
    height: 325,
    borderRadius: 0,
    marginTop: 20,
  },
  cardImg: {
    height: 220,
    objectFit: "cover",
  },
  gridContainer: {
    display: "flex",
    justifyContent: "center",
  },
});

export default function Carrousel(props) {
  return (
    <Carousel className={s.carousel}>
      {Items(0, 3)}
      {Items(3, 6)}
    </Carousel>
  );
}

function Items(begin, end) {
  const classes = useStyles();
  return (
    <Container className={classes.gridContainer}>
      {featured.slice(begin, end).map((s) => (
        <Card className={classes.card} elevation={0}>
          <CardMedia
            component="img"
            className={classes.cardImg}
            image={s.img}
          ></CardMedia>
          <CardContent>
            <Typography>{s.description}</Typography>
            <Button variant="outlined" color="primary">
              Check it out!
            </Button>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
}

// const length = featured.length;
