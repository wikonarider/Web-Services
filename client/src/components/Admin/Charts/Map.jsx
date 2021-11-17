import React, { useState } from "react";
import { useSelector } from "react-redux";
import ReactTooltip from "react-tooltip";
import Box from "@mui/material/Box";
import MapChart from "./MapChart";
import MapPopover from "./MapPopover";
import { styles } from "../AdminStyles";

export default function Map({ provinceServices, groupProvinces }) {
  const [content, setContent] = useState("tooltip");
  const [open, setOpen] = useState("");
  const darkGlobal = useSelector((state) => state.darkTheme);
  let darkLight = darkGlobal ? "dark" : "light";

  return (
    <Box
      sx={{
        ...styles[darkLight].box,
        width: "300px",
        height: "400px",
        maxWidth: "600px",
        m: "10px 10px",
        display: "grid",
        gridTemplateColumns: "300px",
      }}
    >
      <Box
        gridColumn="1/2"
        overflow="hidden"
        display="flex"
        flexDirection="column"
      >
        <MapPopover info={groupProvinces} open={open} setOpen={setOpen} />

        <MapChart
          id="mapContainer"
          info={provinceServices}
          setTooltipContent={setContent}
          setOpen={setOpen}
        />
        <ReactTooltip>{content}</ReactTooltip>
      </Box>
    </Box>
  );
}
