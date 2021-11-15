import React from "react";
import Map from "./Charts/Map";
import Box from "@mui/material/Box";
export default function Services({ info }) {
  return (
    <>
      <h1>Services - Admin Panel</h1>

      <Box width={600} height={600} overflow="hidden">
        <Map info={info.provinceServices} />
      </Box>
    </>
  );
}
