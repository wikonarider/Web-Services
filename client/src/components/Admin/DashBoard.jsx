import React, { useEffect, useState } from "react";
import axios from "axios";
import SelectDates from "./Controllers/Select";
import LineChart from "./Charts/Line";
import RadarChart from "./Charts/Radar";
import Box from "@mui/material/Box";

export default function Dashboard({
  dateFilter,
  setDateFilter,
  groupFilter,
  setGroupFilter,
}) {
  let [newServicesMonthly, setNewServicesMonthly] = useState([]);
  let [newServicesGroup, setNewServicesGroup] = useState([]);
  let [groups, setGroups] = useState({ list: [], total: [] });
  let [users, setUsers] = useState([]);

  useEffect(() => {
    axios(`/admin`).then((response) => {
      setNewServicesMonthly(response.data.newServices);
      setNewServicesGroup(response.data.groupNewServices);
      setGroups({
        list: response.data.groups,
        total: response.data.groupServicesCount,
      });
      setUsers(response.data.newUsers);
    });
  }, []);

  const handleDateSelect = (event, child, type) => {
    let value = event.target.value;

    if (type === "start") {
      new Date(dateFilter.end).getTime() >= new Date(value).getTime()
        ? setDateFilter((dateFilter) => {
            return { ...dateFilter, start: value };
          })
        : setDateFilter({ start: value, end: value });
    } else if (type === "end") {
      new Date(value).getTime() >= new Date(dateFilter.start).getTime()
        ? setDateFilter((dateFilter) => {
            return { ...dateFilter, end: value };
          })
        : setDateFilter({ start: value, end: value });
    }
  };

  const handleGroupSelect = (event) => {
    let value = event.target.value;
    setGroupFilter(value);
  };

  return (
    <>
      <h1>Dashboard</h1>
      <Box display="flex" flexDirection="row">
        {(newServicesGroup || newServicesMonthly) &&
          LineChart(
            groupFilter
              ? newServicesGroup[groupFilter.split("-")[0]]
              : newServicesMonthly,
            "month",
            "n_services",
            dateFilter,
            "New services"
          )}
        {users && LineChart(users, "month", "n_users", dateFilter, "New users")}
        {groups.total &&
          RadarChart(groups.total, "groupName", "n_services", "Services/Group")}
      </Box>
      <Box display="flex" flexDirection="row">
        <SelectDates
          id={"start-date"}
          defaultValue={dateFilter.start}
          handleChange={(e, c, type = "start") => handleDateSelect(e, c, type)}
          valuesArr={newServicesMonthly.map((m) => m.year).reverse()}
          label="From:"
          formHelperText="Select start date"
        />
        <SelectDates
          id={"end-date"}
          defaultValue={dateFilter.end}
          handleChange={(e, c, type = "end") => handleDateSelect(e, c, type)}
          valuesArr={newServicesMonthly.map((m) => m.year).reverse()}
          label="To:"
          formHelperText="Select end date"
        />
        <SelectDates
          id={"groupSelector"}
          defaultValue={groupFilter}
          handleChange={(e) => handleGroupSelect(e)}
          valuesArr={groups.list.map((m) => `${m.id}-${m.name}`)}
          label="Category:"
          formHelperText="Select category"
        />
      </Box>
    </>
  );
}
