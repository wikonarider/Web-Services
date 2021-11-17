import React from "react";
import Map from "./Charts/Map";
import Box from "@mui/material/Box";

export default function Services({ info }) {
  return (
    <>
      <h1>Services - Admin Panel</h1>

      <Box width="min-content" height="min-content">
        <Map
          provinceServices={info.provinceServices}
          groupProvinces={info.groupProvinceCount}
        />
      </Box>
    </>
  );
}
