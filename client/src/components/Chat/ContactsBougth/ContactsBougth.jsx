import { Avatar } from "@material-ui/core";
import { Box } from "@mui/system";
import React from "react";
import { Stack } from "@mui/material";
import useStylesBougth from "./ContactsStyled";
export default function Contactsbougth({ contacts, contactsOnline, darkTheme }) {
  //darkTheme boolean global state
  var classes = useStylesBougth(darkTheme)();
  if (contacts) {
    return (
      <Box
        className={
          contactsOnline.some((e) => e.user === contacts.id)
            ? classes.boxBoughtOnline
            : classes.boxBoughtOffline
        }
      >
        <Stack direction="row" spacing={5}>
          <Avatar
            src={contacts.userImg}
            sx={{ width: "54px", height: 54, cursor: "pointer" }}
          />
          {contacts.name}
        </Stack>
      </Box>
    );
  } else {
    return <></>;
  }
}
