import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";

function NavSpace({ route }) {
  const query = useMediaQuery("(max-width: 820px)");
  return (
    <div
      style={{
        width: "100%",
        height: query && route === "home" ? "150px" : "70px",
      }}
    ></div>
  );
}

export default NavSpace;
