import React from "react";
import { useSelector } from "react-redux";
import SideBarNestedBtnDropDown from "../SideBarNestedBtnDropDown/SideBarNestedBtnDropDown";
import List from "@mui/material/List";

export default function SideBarNested({ openFromFather }) {
  const allGroups = useSelector((state) => state.groups);

  return (
    <List
      sx={{
        width: "100%",
        minWidth: 360,
        bgcolor: "background.paper",
        mt: "75px",
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
