import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import React from "react";
import useStylesConvertations from "./ConvertationsStyled";
export default function Conversations({ contacts, contactsOnline, darkTheme ,currentContact}) {
  //darkTheme boolean global state
  var statusUser = contactsOnline.some((e) => e.user === contacts.id);
  var classes = useStylesConvertations(darkTheme, statusUser)();

  if (contacts) {
    return (
      <Box className={classes.boxConvInline}>
        <Avatar
          size="small"
          src={contacts.userImg}
          className={classes.avatar}
        />
        {contacts.name}
      </Box>
    );
  } else {
    return <></>;
  }
}
