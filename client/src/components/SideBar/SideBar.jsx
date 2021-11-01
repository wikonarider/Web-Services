import React from "react";
import { useState } from "react";

import SideBarNested from "./SideBarNested/SideBarNested";
import SideBarRangePrice from "./SideBarRangePrice/SideBarRangePrice";
import SideBarNested from './SideBarNested/SideBarNested';


import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import SortIcon from "@material-ui/icons/Sort";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import { Drawer } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";

//maneja el ancho de la expansión al tocar el hamburguer button
const drawerWidth = 350;
const useStyles = makeStyles((theme) => ({
  icon: {
    color: "#fff",
    fontSize: "2rem",
  },
}));

export default function MiniDrawer() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleDrawer = () => {
    setOpen((prev) => !prev);
  };

  return (
    <Box>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={handleDrawer}
      >
        <SortIcon className={classes.icon} />
      </IconButton>
      <Drawer open={open} sx={{ width: drawerWidth }}>
        <SideBarNested openFromFather={open} />
        <Divider />
        <SideBarOrderPrice text={'Price order'} key={1} />
        <Divider />
        <SideBarRangePrice key={2} />

        <Divider />
        <List>
          {["Info", "About", "Something"].map((text, index) => (
            <ListItem button key={index}>
              <ListItemIcon>
                <MailIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Divider />
    </Box>
  );
}
