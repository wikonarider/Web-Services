import { Avatar, Box } from "@material-ui/core";
import React from "react";
export default function Message({ user, contact, message, scrollRef }) {
  var boxMSN = {
    background: message.userId === user.id ? "#FF8F77" : "#FFDA77 ",
    borderRadius: "0.3em",
    marginTop: "1.5%",
    minHeigth: "50%",
    maxWidth: "50%",
  };
  var msn = {
    display: "flex",
    paddingRight: "2%",
  };

  return (
    <div style={boxMSN}>
      <Box ref={scrollRef} name="msn" sx={msn}>
        <Avatar
          src={message.remit === user.id ? contact.userImg : user.userImg}
          sx={{ width: "54px", height: 54 }}
        />
        <p
          style={{
            textAlign: "justify",
            color: message.userId === user.id ? "white" : " black",
          }}
        >
          {message.text}
        </p>
      </Box>
      <div
        style={{
          color: "#ffff",
        }}
      ></div>
      <h5>{message.createdAt}</h5>
    </div>
  );
}
