import { Avatar } from "@material-ui/core";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { Stack } from "@mui/material";
require("../ContactsBougth/ContactsBougth.css");
export default function Contactsbougth({ contacts, contactsOnline }) {
  if (contacts) {
    return (
      <div
        className={
          contactsOnline.some((e) => e.user === contacts.id)
            ? "boxBoughtOnline"
            : "boxBoughtOffline"
        }
      >
        <Stack direction="row" spacing={5}>
          <Avatar
            src={contacts.userImg}
            sx={{ width: "54px", height: 54, cursor: "pointer" }}
          />
          {contacts.name}
        </Stack>
      </div>
    );
  } else {
    return <></>;
  }
}
