import { Avatar } from "@material-ui/core";
import { Box } from "@mui/system";
import React from "react";
import { Stack } from "@mui/material";
import useStylesBougth from "./ContactsStyled";
export default function Contactsbougth({ contacts, contactsOnline, darkTheme }) {
  //darkTheme boolean global state
  var statusUser = contactsOnline.some((e) => e.user === contacts.id);
  var classes = useStylesBougth(darkTheme, statusUser)();
  if (contacts) {
    return (
      <Box className={classes.boxBoughtInline}>
        <Avatar src={contacts.userImg} className={classes.avatar}>

        </Avatar>
        <Box className={classes.nameUserBought}>{contacts.name}</Box>

             <Box className={classes.icon_status_inline}></Box>
       
      </Box>
    );
  } else {
    return <></>;
  }
}
