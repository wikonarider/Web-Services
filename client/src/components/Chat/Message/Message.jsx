import { Avatar, Box } from "@material-ui/core";
import React from "react";
require("../Message/Message.css");
export default function Message({ user, contact, message, scrollRef }) {

  return (
    <div
      className={message.userId === user.id ? "boxMsnSend" : "boxMsnReceive"}
    >
      <div ref={scrollRef} className={"msn"} >
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
      </div>
      <h5>{message.createdAt}</h5>
    </div>
  );
}
