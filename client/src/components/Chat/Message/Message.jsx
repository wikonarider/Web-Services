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
        <Avatar
          src={message.remit === user.id ? contact.userImg : user.userImg}
          className={clasess.avatar}
        />
        <Box className={clasess.message}>
          <h4
            style={{
              textAlign: "justify",
              color: message.userId === user.id ? "white" : " black",
            }}
          >
            {message.text}
          </h4>
        </Box>

        <h5>{format(message.createdAt)}</h5>
      </Box>
    </Box>
  );
}
