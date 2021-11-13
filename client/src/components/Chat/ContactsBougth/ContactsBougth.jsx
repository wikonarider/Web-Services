import { Avatar } from "@material-ui/core";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { Stack } from "@mui/material";
import useStylesBougth from "./ContactsStyled";
export default function Contactsbougth({ contacts, contactsOnline }) {
  var classes = useStylesBougth();
  if (contacts) {
    return (
      <Box
        className={
          contactsOnline.some((e) => e.user === contacts.id)
            ? classes.boxBoughtOnline
            : classes.boxBoughtOffline
        }>
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
