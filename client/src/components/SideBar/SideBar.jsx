import React from "react";
import { useState } from "react";
import SideBarNested from "./SideBarNested/SideBarNested";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import { Drawer } from "@mui/material";

//maneja el anocho de la expansión al tocar el hamburguer button
const drawerWidth = 350;

export default function MiniDrawer() {
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
        <MenuIcon />
      </IconButton>
      <Drawer open={open} sx={{ width: drawerWidth }}>
        <SideBarNested openFromFather={open} />
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
    </Box>
  );
}
