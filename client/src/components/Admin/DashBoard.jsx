import React from "react";
// import axios from "axios";
import SelectDates from "./Controllers/Select";
import LineChart from "./Charts/Line";
import RadarChart from "./Charts/Radar";
import Box from "@mui/material/Box";
import InfoCard from "./Cards/InfoCard";

export default function Dashboard({
  dateFilter,
  setDateFilter,
  groupFilter,
  setGroupFilter,
  info,
}) {
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
    <Box display="flex" flexWrap="wrap" flexDirection="column" height="auto">
      <Box
        display="flex"
        flexWrap="wrap"
        flexDirection="row"
        height="min-content"
        justifyContent="center"
      >
        <InfoCard
          title="Total services"
          value={info.totalServices}
          type="services"
        />
        <InfoCard
          title="Active users"
          value={
            info.totalUsers
              ? (
                  info.totalUsers.find((u) => u.ban === false).n_users /
                  info.totalUsers.reduce((p, c) => p + Number(c.n_users), 0)
                ).toLocaleString(undefined, {
                  style: "percent",
                  minimumFractionDigits: 1,
                })
              : null
          }
          type="users"
        />
        <InfoCard
          title="Successful sales"
          value={
            info.monthlySales
              ? info.monthlySales
                  .find((s) => {
                    return (
                      s.status === "success" &&
                      s.year ===
                        `${new Date().getFullYear()}-${
                          new Date().getMonth() + 1
                        }`
                    );
                  })
                  .totalSales.toLocaleString("en-EN", {
                    style: "currency",
                    currency: "USD",
                    maximumFractionDigits: 0,
                  })
              : null
          }
          type="currency"
        />
        <InfoCard
          title="Pending sales"
          value={
            info.monthlySales
              ? info.monthlySales
                  .find((s) => {
                    return (
                      s.status === "carrito" &&
                      s.year ===
                        `${new Date().getFullYear()}-${
                          new Date().getMonth() + 1
                        }`
                    );
                  })
                  .totalSales.toLocaleString("en-EN", {
                    style: "currency",
                    currency: "USD",
                    maximumFractionDigits: 0,
                  })
              : null
          }
          type="currency"
        />
      </Box>
      <Box display="flex" flexDirection="row" justifyContent="center">
        <SelectDates
          id={"start-date"}
          defaultValue={dateFilter.start}
          handleChange={(e, c, type = "start") => handleDateSelect(e, c, type)}
          valuesArr={
            info.newServicesMonthly &&
            info.newServicesMonthly.map((m) => m.year).reverse()
          }
          label="From:"
          formHelperText="Select start date"
        />
        <SelectDates
          id={"end-date"}
          defaultValue={dateFilter.end}
          handleChange={(e, c, type = "end") => handleDateSelect(e, c, type)}
          valuesArr={
            info.newServicesMonthly &&
            info.newServicesMonthly.map((m) => m.year).reverse()
          }
          label="To:"
          formHelperText="Select end date"
        />
        <SelectDates
          id={"groupSelector"}
          defaultValue={groupFilter}
          handleChange={(e) => handleGroupSelect(e)}
          valuesArr={
            info.groupList && info.groupList.map((m) => `${m.id}-${m.name}`)
          }
          label="Category:"
          formHelperText="Select category"
        />
      </Box>

      <Box
        display="flex"
        flexWrap="wrap"
        flexDirection="row"
        justifyContent="center"
      >
        {(info.newServicesGroup || info.newServicesMonthly) && (
          // Chart(info, x, yDomain, date, title)
          <LineChart
            info={
              groupFilter
                ? info.newServicesGroup[groupFilter.split("-")[0]]
                : info.newServicesMonthly
            }
            x="month"
            yDomain="n_services"
            date={dateFilter}
            title="New services"
          />
        )}
        {info.newUsers && (
          <LineChart
            info={info.newUsers}
            x="month"
            yDomain="n_users"
            date={dateFilter}
            title="New users"
          />
        )}
        {info.monthlySales && (
          <LineChart
            info={info.monthlySales.filter((m) => m.status === "success")}
            x="month"
            yDomain="totalSales"
            date={dateFilter}
            title="Revenue (monthly)"
          />
        )}

        {info.groupServicesCount && (
          // Chart(data, categoryKey, valueKey, name)
          <RadarChart
            data={info.groupServicesCount}
            categoryKey="groupName"
            valueKey="n_services"
            name="Services/Group"
          />
        )}
      </Box>
    </Box>
  );
}

// https://github.com/deldersveld/topojson/blob/080eb96a46307efd0c4a31f4c11ccabeee5e97dd/countries/argentina/argentina-provinces.json
