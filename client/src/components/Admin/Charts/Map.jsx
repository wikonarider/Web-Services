import React, { useState } from "react";
import { useSelector } from "react-redux";
import ReactTooltip from "react-tooltip";
import Box from "@mui/material/Box";
import MapChart from "./MapChart";
import { styles } from "../AdminStyles";

export default function Map({ info }) {
  const [content, setContent] = useState("tooltip");
  const darkGlobal = useSelector((state) => state.darkTheme);

  let darkLight = darkGlobal ? "dark" : "light";
  return (
    <Box
      sx={{
        ...styles[darkLight].box,
        width: "min-content",
        maxWidth: "600px",
        m: "10px 10px",
        display: "grid",
        gridTemplateColumns: "300px auto",
      }}
    >
      <Box gridColumn="1/2" overflow="hidden">
        <MapChart info={info} setTooltipContent={setContent} />
        <ReactTooltip>{content}</ReactTooltip>
      </Box>
      <Box gridColumn="2/3" border="1px solid black" display="none"></Box>
    </Box>
  );
}
