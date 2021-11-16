import React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import useStylesMessage from "./MessageStyled";
import { format } from "timeago.js";

export default function Message({
  user,
  contact,
  message,
  scrollRef,
  darkTheme,
}) {
  var clasess = useStylesMessage(darkTheme, message, user)();
  return (
    <Box className={clasess.box_position_MsnSendReceive}>
      <Box
        ref={scrollRef}
        className={
            message.userId === user.id
            ? clasess.boxMsnSend
            : clasess.boxMsnReceive
        }
      >
        <Box className={clasess.message}>
          <h5>{message.text}</h5>
        </Box>

        <h5> 
        {format(message.createdAt)}</h5>
       
      </Box>
    </Box>
  );
}
