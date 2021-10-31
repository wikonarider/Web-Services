import React from "react";

const style = {
  objectFit: "cover",
  height: "450px",
};

function CarrouselItem({ title, img }) {
  return (
    <div>
      <img style={style} src={img} alt={title} />
      <p
        style={{
          fontWeight: "bold",
          fontSize: "20px",
        }}
      >
        {title}
      </p>
    </div>
  );
}

export default CarrouselItem;
