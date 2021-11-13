import React from "react";
import { useSelector } from "react-redux";
import SideBarNestedBtnDropDown from "../SideBarNestedBtnDropDown/SideBarNestedBtnDropDown";
import List from "@mui/material/List";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function SideBarNested({ openFromFather }) {
  const allGroups = useSelector((state) => state.groups);
  const query = useMediaQuery("(max-width: 820px)");

  return (
    <List
      sx={{
        width: "100%",
        minWidth: 360,
        bgcolor: "background.paper",
        mt: query ? "150px" : "70px",
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      {allGroups.map((group, index) => {
        return (
          <SideBarNestedBtnDropDown
            key={index}
            openFromFather={openFromFather}
            group={group}
          />
        );
      })}
    </List>
  );
}
