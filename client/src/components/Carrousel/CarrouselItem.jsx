import React from "react";

const style = {
  // objectFit: "contain",
  height: "450px",
};

function CarrouselItem({ service }) {
  return (
    <div style={{ cursor: "pointer" }}>
      <img style={style} src={service.img} alt={service.title} />
    </div>
  );
}

export default CarrouselItem;
