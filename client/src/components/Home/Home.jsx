import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Cards from "../Cards/Cards";
import Carrousel from "../Carrousel/Carrousel";
import Footer from "../Footer/Footer";
import axios from "axios";
import Typography from "@mui/material/Typography";

export default function Home() {
  const servicesState = useSelector((state) => state.services);
  const [topSixServices, setTopSixServices] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    axios
      .get("/services?order=rating&page=0&pageSize=6&type=DESC")
      .then((response) => response.data)
      .then((data) => setTopSixServices(data))
      .catch((e) => console.log(e));
  }, []);

  return (
    <div>
      <Carrousel topSix={topSixServices} />
      {servicesState.length > 0 ? (
        <Cards services={servicesState} />
      ) : (
        <Typography variant="h2" component="div" gutterBottom>
          There are no services to show
        </Typography>
      )}
      <Footer />
    </div>
  );
}
