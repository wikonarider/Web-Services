import React from 'react';
import { useState } from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeRepairServiceRoundedIcon from '@mui/icons-material/HomeRepairServiceRounded';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';

export default function SideBarBtnDropDown({ index, text, openFromFather }) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    if (openFromFather) {
      setOpen(!open);
    }
  };

  return (
    <Box key={index}>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <HomeRepairServiceRoundedIcon />
        </ListItemIcon>
        <ListItemText primary={text} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      {openFromFather ? (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="INTERNO" />
            </ListItemButton>
          </List>
        </Collapse>
      ) : (
        <Collapse in={false} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="INTERNO" />
            </ListItemButton>
          </List>
        </Collapse>
      )}
    </Box>
  );
}
