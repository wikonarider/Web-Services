import React from "react";

const style = {
  // objectFit: "contain",
  height: "450px",
};

function CarrouselItem({ service }) {

  // const detail = `services/${service.id}`
  return (
    <div>
      <img style={style} src={service.img} alt={service.title} />
      {/* <p
        className="legend"
        style={{
          fontWeight: "bold",
          fontSize: "20px",
        }}
      >
        {service.title}
      </p> */}
    </div>
  );
}

export default CarrouselItem;
