import React from "react";

import Map from "./Charts/Map";
import Box from "@mui/material/Box";
import TableAdmin from "./Table";
export default function Services({ info }) {
  let tableColumns = [
    {
      id: "avaliable",
      align: "center",
      label: "Avaliable",
      sort: "NUM",
      format: (value) => `${value}`,
      width: "30px",
      screenHide: "",
      switch: true,
    },
    {
      id: "id",
      align: "center",
      label: "Id",
      sort: "NUM",
      width: "30px",
      important: true,
      screenHide: "",
    },
    {
      id: "title",
      align: "left",
      label: "Title",
      width: "250px",
      important: true,
      screenHide: "",
      link: "/services/",
    },
    {
      id: "price",
      align: "right",
      label: "Price",
      sort: "NUM",
      format: (value) =>
        value &&
        value.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 0,
        }),
      width: "50px",
      screenHide: "xs",
    },
    // { id: "userId", align: "left", label: "User Id" },

    {
      id: "rating",
      align: "center",
      label: "Rating",
      sort: "NUM",
      format: (value) =>
        value
          ? Number(value).toLocaleString("en-US", {
              maximumFractionDigits: 1,
              minimumFractionDigits: 1,
            })
          : "null",
      width: "30px",
      screenHide: "xs",
    },
    {
      id: "category.group.name",
      align: "left",
      label: "Category",
      width: "150px",
      screenHide: "xs",
    },
  ];

  return (
    <>
      <Box
        width="95%"
        sx={{ m: "auto" }}
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="center"
      >
        <Box width="min-content" height="min-content">
          <Map
            provinceServices={info.provinceServices}
            groupProvinces={info.groupProvinceCount}
          />
        </Box>
        <Box>
          <TableAdmin
            columns={tableColumns}
            url="/admin/services"
            putUrl="/services"
            searchPlaceholder="Search ID, Title, UserId"
          />
        </Box>
      </Box>
    </>
  );
}
