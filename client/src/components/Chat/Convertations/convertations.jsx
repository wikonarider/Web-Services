import { Avatar } from "@material-ui/core";
import { Box } from "@mui/system";
import React from "react";
import useStylesConvertations from "./ConvertationsStyled";
export default function Conversations({ contacts, contactsOnline, darkTheme }) {
  //darkTheme boolean global state
  var classes = useStylesConvertations(darkTheme)();

  if (contacts) {
    return (
      <Box
        className={
          contactsOnline.some((e) => e.user === contacts.id)
            ? classes.boxConvOnline
            : classes.boxConvOffline
        }
      >
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
