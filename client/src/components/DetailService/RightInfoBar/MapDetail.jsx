import React from "react";
import { useSelector } from "react-redux";

// Web utilizada https://www.openstreetmap.org/
// Pueden sacar mas info de ahi, google maps me pedia
// tarjeta de cresdito para activar la API_KEY
// Pueden cambiarle el estilo como quieren.
// Las LAT y LONG vienen medias chota en la API de Arg,
// Por eso no quedan bien centradas
function MapDetail({ lat, lon }) {
  const darkTheme = useSelector((state) => state.darkTheme);
  return (
    <div>
      <iframe
        title="map"
        width="100%"
        maxWidth="425"
        height="250"
        frameBorder="0"
        scrolling="no"
        marginHeight="0"
        marginWidth="0"
        style={{
          border: "1px solid black",
        }}
        src={`https://www.openstreetmap.org/export/embed.html?bbox=${lon}%2C${lat}%2C${
          lon - 0.2
        }%2C${lat - 0.2}&amp;layer=mapnik`}
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
