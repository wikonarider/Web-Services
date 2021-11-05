import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import SelectDates from "./Controllers/Select";
import Chart from "./Chart";
import Box from "@mui/material/Box";

export default function Dashboard() {
  let [newServicesMonthly, setNewServicesMonthly] = useState([]);
  let [newServicesGroup, setNewServicesGroup] = useState([]);
  let [groups, setGroups] = useState([]);
  let [dateFilter, setDateFilter] = useState({
    start: "",
    end: "",
  });
  let [groupFilter, setGroupFilter] = useState(null);

  useEffect(() => {
    axios(`/admin`).then((response) => {
      setNewServicesMonthly(response.data.newServices);
      setNewServicesGroup(response.data.groupNewServices);
      setGroups(response.data.groups);
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
      {Chart(
        groupFilter
          ? newServicesGroup[groupFilter.split("-")[0]]
          : newServicesMonthly,
        "month",
        "n_services",
        dateFilter
      )}

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
          valuesArr={groups.map((m) => `${m.id}-${m.name}`)}
          label="Category:"
          formHelperText="Select category"
        />
      </Box>
    </>
  );
}
