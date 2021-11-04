import React, { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import CarrouselItem from "./CarrouselItem";
import DetailService from "../DetailService/DetailService";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

export default function Carrousel({ topSix }) {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState();

  const handleClose = () => setOpen(false);

  console.log(id);

  const handleClickItem = (index, item) => {
    console.log(item.props.service.id);
    setId(item.props.service.id);
    setOpen(true);
  };

  return (
    <div
      style={{ width: "90%", margin: "100px auto 0 auto", objectFit: "cover" }}
    >
      <Carousel
        dynamicHeight={true}
        autoPlay={true}
        interval={3000}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
        onClickItem={handleClickItem}
      >
        {topSix.map((service) => (
          <CarrouselItem key={service.id} service={service} />
        ))}
      </Carousel>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100%",
            height: "100%",
            bgcolor: "background.paper",
            boxShadow: 24,
            overflowY: "scroll",
            overflowX: "hidden",
            m: "60px auto",
          }}
        >
          <DetailService id={id} closeModal={handleClose} />
        </Box>
      </Modal>
    </div>
  );
}
