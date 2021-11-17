import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import React from "react";
import useStylesConvertations from "./ConvertationsStyled";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
export default function Conversations({
  contacts,
  contactsOnline,
  darkTheme,
  contactCurrent,
  deleteConv,
  chatCont,
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
        <Box
          className={classes.avatarAndname}
          onClick={() => {
            chatCont(contacts.id);
          }}
        >
          <Avatar
            size="small"
            src={contacts.userImg}
            className={classes.avatar}
          />
          <Box className={classes.nameUser}>{contacts.name}</Box>
        </Box>

        <IconButton
          onClick={() => {
            deleteConv(contacts);
          }}
          className={classes.btn_x}
          size="small"
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Box>
    );
  } else {
    return <></>;
  }
}
