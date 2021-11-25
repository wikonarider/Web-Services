import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import CarrouselItem from "./CarrouselItem";
import { useHistory } from "react-router";

export default function Carrousel({ topSix }) {
  const history = useHistory();

  const handleClickItem = (index, item) => {
    history.push(`/services/${item.props.service.id}`);
  };

  return (
    <div style={{ width: "100%", objectFit: "cover" }}>
      {topSix.length ? (
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
      ) : null}
    </div>
  );
}
