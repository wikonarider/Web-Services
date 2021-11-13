import React from "react";
import { useState } from "react";

import SideBarNestedBtnDropDownInner from "../SideBarNestedBtnDropDownInner/SideBarNestedBtnDropDownInner";

import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";

export default function SideBarNestedBtnDropDown({
  index,
  openFromFather,
  group,
}) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    if (openFromFather) {
      setOpen(!open);
    }
  };

  return (
    <Box key={index}>
      <ListItemButton onClick={handleClick}>
        {/* <ListItemIcon>
          <GradeOutlinedIcon />
        </ListItemIcon> */}
        <ListItemText primary={group.name} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      {openFromFather ? (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <Box sx={{ display: "flex" }}>
                <FormControl
                  sx={{ m: 3 }}
                  component="fieldset"
                  variant="standard"
                >
                  {group.categories.map((c, index) => {
                    return (
                      <SideBarNestedBtnDropDownInner
                        name={c.name}
                        key={index}
                      />
                    );
                  })}
                </FormControl>
              </Box>
            </ListItemButton>
          </List>
        </Collapse>
      ) : (
        <Collapse in={false} timeout="auto" unmountOnExit></Collapse>
      )}
    </Box>
  );
}
