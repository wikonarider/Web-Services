import React, { useState } from "react";
import AdminSideBar from "./AdminSideBar";
import Dashboard from "./DashBoard";
import Services from "./Services";
import Users from "./Users";
import Categories from "./Categories";
import Box from "@mui/material/Box";

export default function Admin() {
  let [page, setPage] = useState("Dashboard");
  let [dateFilter, setDateFilter] = useState({
    start: "",
    end: "",
  });
  let [groupFilter, setGroupFilter] = useState("");

  const pagesList = {
    Dashboard: (
      <Dashboard
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        groupFilter={groupFilter}
        setGroupFilter={setGroupFilter}
      />
    ),
    Services: <Services />,
    Users: <Users />,
    "Categories/Groups": <Categories />,
  };

  return (
    <Box
      display="flex"
      flexDirection="row"
      // gridTemplateColumns="repeat(12, 1fr)"
      // gap={1}
      position="relative"
      width="100%"
      height="100vh"
      m="10px auto"
    >
      {/* gridColumn="span 2" */}
      <Box>
        <AdminSideBar page={page} setPage={setPage} />
      </Box>
      {/* gridColumn="span 10" */}
      <Box>{pagesList[page]}</Box>
    </Box>
  );
}
