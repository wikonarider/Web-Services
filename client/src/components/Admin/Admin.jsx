import React, { useState, useEffect } from "react";
import AdminSideBar from "./AdminSideBar";
import Dashboard from "./DashBoard";
import Services from "./Services";
import Users from "./Users";
import Categories from "./Categories";
import Box from "@mui/material/Box";
import axios from "axios";

export default function Admin() {
  let [page, setPage] = useState("Dashboard");
  let [dateFilter, setDateFilter] = useState({
    start: "",
    end: "",
  });
  let [groupFilter, setGroupFilter] = useState("");
  let [info, setInfo] = useState({});
  const pagesList = {
    Dashboard: (
      <Dashboard
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        groupFilter={groupFilter}
        setGroupFilter={setGroupFilter}
        info={info}
      />
    ),
    Services: <Services info={info} />,
    Users: <Users />,
    "Categories/Groups": <Categories />,
  };

  useEffect(() => {
    axios(`/admin`).then((response) => {
      setInfo({
        groupProvinceCount: response.data.groupProvinceCount,
        totalServices: response.data.totalServices,
        totalUsers: response.data.bannedUsers,
        totalSales: response.data.totalSales,
        monthlySales: response.data.monthlySales,
        newServicesMonthly: response.data.newServices,
        newServicesGroup: response.data.groupNewServices,
        groupList: response.data.groups,
        groupServicesCount: response.data.groupServicesCount,
        newUsers: response.data.newUsers,
        provinceServices: response.data.provinceServices,
      });
    });
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="row"
      // gridTemplateColumns="repeat(12, 1fr)"
      // gap={1}
      position="relative"
      height="100vh"
      m="10px auto"

      // sx={{ overflowX: "hidden" }}
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
