import { Avatar } from "@material-ui/core";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { Stack } from "@mui/material";
require("./Conversations.css");
export default function Conversations({ contacts }) {
  useEffect(() => {});
  if (contacts) {
    return (
      <Box
        sx={{
          height: 86,
          display: "flex",
          padding: "2%",
          cursor: "pointer",
          margin: "2%",
        }}
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
