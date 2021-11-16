import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import React from "react";
import useStylesConvertations from "./ConvertationsStyled";
export default function Conversations({
  contacts,
  contactsOnline,
  darkTheme,
  contactCurrent,
}) {
  //darkTheme boolean global state
  var statusUser = contactsOnline.some((e) => e.user === contacts.id);
  var contactSelected = contacts.id === contactCurrent.id;
  var classes = useStylesConvertations(
    darkTheme,
    statusUser,
    contactSelected
  )();

  if (contacts) {
    return (
      <Box className={classes.boxConvInline}>
        <Avatar
          size="small"
          src={contacts.userImg}
          className={classes.avatar}
        />
        <Box className={classes.nameUser}>{contacts.name}</Box>
      </Box>
    );
  } else {
    return <></>;
  }
}
