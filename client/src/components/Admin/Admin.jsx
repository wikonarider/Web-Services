import * as React from "react";
import AdminSideBar from "./AdminSideBar";
import Dashboard from "./DashBoard";
import Box from "@mui/material/Box";

export default function Admin() {
  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(12, 1fr)"
      gap={1}
      position="relative"
      width="100%"
      m="10px auto"
    >
      <Box gridColumn="span 2">
        <AdminSideBar />
      </Box>
      <Box gridColumn="span 10">
        <Dashboard />
      </Box>
    </Box>
  );
}
