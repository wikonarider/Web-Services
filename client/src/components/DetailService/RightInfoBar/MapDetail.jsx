import React from "react";
import { useSelector } from "react-redux";
import useMediaQuery from "@mui/material/useMediaQuery";

// Web utilizada https://www.openstreetmap.org/
// Pueden sacar mas info de ahi, google maps me pedia
// tarjeta de credito para activar la API_KEY
function MapDetail({ lat, lon }) {
  const darkTheme = useSelector((state) => state.darkTheme);
  const query = useMediaQuery("(max-width: 600px)");

  return (
    <div>
      <iframe
        title="map"
        frameBorder="0"
        scrolling="no"
        marginHeight="0"
        marginWidth="0"
        style={{
          width: query ? "100%" : "425px",
          height: "250px",
          border: "1px solid black",
        }}
        src={`https://www.openstreetmap.org/export/embed.html?bbox=
        ${lon + 0.1}
        %2C
        ${lat + 0.1}
        %2C
        ${lon - 0.1}
        %2C
        ${lat - 0.1}&layer=mapnik&marker=${lat}%2C${lon}`}
      ></iframe>
      <br />
      <small>
        <a
          rel="noopener noreferrer"
          target="_blank"
          href={`https://www.openstreetmap.org/#map=12/${lat}/${lon}`}
          style={{
            textDecoration: "none",
            color: darkTheme ? "white" : "black",
          }}
        >
          Show map
        </a>
      </small>
    </div>
  );
}

export default MapDetail;
