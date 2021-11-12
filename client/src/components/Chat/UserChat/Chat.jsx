import { io } from "socket.io-client";
import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import Conversations from "../Conversations/conversations.jsx";
import { Box } from "@mui/system";
import SendIcon from "@mui/icons-material/Send";
import _style from "./Chat.css.jsx";
import { Button, Input, makeStyles } from "@material-ui/core";
import TextField from "@mui/material/TextField";
import { connect, useDispatch } from "react-redux";
import dotenv from "dotenv";
import Message from "../Message/Message";
import {
  getContacts,
  getContactsBougth,
  getConvertations,
  getPots,
  newConvertation,
  sendMessage,
  deleteConvertation,
} from "./StateLocal.jsx";

// Material UI for SEND BTN
import { brown } from "@material-ui/core/colors";
dotenv.config();
require("./Chat.css");

// Material UI for SEND BTN
const useStyles = makeStyles({
  btn: {
    borderRadius: 0,
    textTransfrom: "none",
    color: brown[500],
  },
});

function Chat({ user }) {
  const [text, setText] = useState("");
  const [textReceive, setTextReceive] = useState("");
  const [chat, setChat] = useState({
    currentCont: "",
    chatting: [],
    contactsConv: [],
    contactsBoungth: [],
    convertations: [],
  });
  const dispatch = useDispatch();
  var scrollRef = useRef();
  const socket = useRef(); //conexion al servidor para bidireccional peticiones
  const classes = useStyles(); // Material UI for SEND BTN

  //const history=useHistory();

  //----------------------------------------------------------------------------socket
  useEffect( () => {
    //client conection
    socket.current = io(process.env.REACT_APP_API || "http://localhost:3001");
    socket.current.on("getMessage", function (dat) {
      //new msn from back server.io
      console.log("new post", dat);
      setTextReceive({
        userId: dat.senderId,
        remit: dat.remit,
        text: dat.text,
        createdAt: Date.now(),
      });
    });
    getData();
  }, []);
//----------------------------------------------------------------------------------------------get Data BD
  async function getData() {
    var contactsConv = await getContacts();
    var contactsBoungth = await getContactsBougth();
    var convertations = await getConvertations();
    setChat({
      ...chat,
      contactsConv: contactsConv.data,
      contactsBoungth: contactsBoungth.data,
      convertations: convertations.data,
    });
  }
  //----------------------------------------------------------------scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat]);

  //-----------------------------------------------------------------------------new msg receive
  useEffect(() => {
    if (textReceive && chat.currentCont) {
      chat.currentCont.id === textReceive.userId &&
        setChat({
          ...chat,
          chating: chat.chatting.concat(textReceive),
        });
    }

    // eslint-disable-next-line
  }, [textReceive]);
  //-------------------------------------------------------------------------------------------------------------new convertations
  async function newConvertationbougth(newContact) {
    var contatsInclude = chat.contactsConv.filter(
      (cont) => cont.id === newContact.id
    );
    if (!contatsInclude.length) {
      newConvertation(newContact.id)
        .then((resp) => {
          return getConvertations();
        })
        .then((convertations) => {
          setChat({
            ...chat,
            convertations: convertations.data,
            contactsConv: chat.contactsConv.concat(newContact),
          });
        })
        .catch((err) => console.log(err));
      setChat({ ...chat, contactsConv: chat.contactsConv.concat(newContact) });
    }
  }
  //--------------------------------------------------------------------------------------------conversation of a contact
  async function chatContact(idUser) {
    console.log("chat");
    var id;
    var newCurrent = chat.contactsConv.filter((c) => {
      return c.id === idUser;
    });
    if (newCurrent.length) {
      id = idPostConvertation(idUser);
      if (id > 0) {
        var post = await getPots(id);
        console.log(post);
        setChat({ ...chat, currentCont: newCurrent[0], chatting: post.data });
      }
    }
  }
  //----------------------------------------------------------------------------------------------id posts convertations
  function idPostConvertation(idContact) {
    var conv = [];
    for (let i = 0; i < chat.convertations.length; i++) {
      var { userA, userB } = chat.convertations[i];
      if (
        (userA === idContact && userB === user.id) ||
        (userA === user.id && userB === idContact)
      ) {
        conv.push(chat.convertations[i].id);
      }
    }
    return conv.length ? conv[0] : -1;
  }

  //-------------------------------------------------------------------------------------------------------------delete convertations
  async function deleteConvert(contact) {
    console.log("entre a delete");
    var idConv;
    if (chat.contactsConv.length > 0) {
      idConv = idPostConvertation(contact.id);
      idConv > 0 && (await deleteConvertation(idConv));
      setChat({
        ...chat,
        contactsConv: chat.contactsConv.filter((c) => c.id !== contact.id),
        convertations: chat.convertations.filter((e) => e.id !== idConv),
        chating: [],
        currentCont: "",
      });
    }
  }
  //------------------------------------------------------------------------------------------send msn
  async function handleSubmit(e) {
    e.preventDefault();
    if (user && chat.currentCont) {
      socket.current.emit("sendMsn", {
        //send socket io
        senderId: user.id,
        receiverId: chat.currentCont.id,
        text: text,
      });

      setChat({
        ...chat,
        chatting: chat.chatting.concat({
          //set chating local
          userId: user.id,
          remit: chat.currentCont.id,
          text: text,
          createdAt: Date.now(),
        }),
      });
      var send = await sendMessage({
        //send BD
        remit: chat.currentCont.id,
        message: text,
      });
      setText("");
    }
  }
  //------------------------------------------------------------------------------------------
  if (user) {
    return (
      <Box sx={_style.box_messanger_father} name="box-father">
        {/* conversation list */}
        <Box name="contacts" sx={_style.box_contacts_a}>
          <Box name="menu-contacts-wrapper" sx={_style.menu_contacts_wrapper}>
            <Input
              type="text"
              name="inputSearch"
              placeholder="search contact!"
            ></Input>
            {chat.contactsConv.length &&
              chat.contactsConv.map((con) => (
                <Box key={con.id}>
                  <Box
                    onClick={() => {
                      chatContact(con.id);
                    }}
                  >
                    <Conversations key={con.id} contacts={con} />
                  </Box>
                  <Button
                    onClick={() => {
                      deleteConvert(con);
                    }}
                  >
                    X
                  </Button>
                </Box>
              ))}
          </Box>
        </Box>
        {/*message list*/}
        <div style={{ flex: "5.5" }}>
          { chat.currentCont ? (
            <div name="conversations" style={_style.box_conversations_b}>
              <Box name="message" sx={_style.menu_chating_wrapper}>
                {chat.chatting.map((msn, i) => (
                  <Message
                    scrollRef={scrollRef}
                    key={i}
                    user={user}
                    contact={chat.currentCont}
                    message={msn}
                  />
                ))}
              </Box>
            </div>
          ) : (
            <h3>Click a contact to start a chat</h3>
          )}

          {chat.currentCont ? (
            <form onSubmit={(e) => handleSubmit(e)}>
              <Box
                sx={{
                  display: "flex",
                  maxWidth: "100%",
                  flex: "row",
                }}
              >
                <TextField
                  fullWidth
                  size="small"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
                <Button
                  variant="contained"
                  type="submit"
                  size="small"
                  className={classes.btn}
                  endIcon={<SendIcon />}
                >
                  send
                </Button>
              </Box>
            </form>
          ) : (
            <></>
          )}
        </div>
        {/*contact list of purchased services */}
        <Box name="contacts-online" sx={_style.box_contactsStates_c}>
          <Box
            name="menu-contactsOnline-wrapper"
            sx={_style.menu_contactsOnline_wrapper}
          >
            contacts bougth
            {chat.contactsBoungth.length &&
              chat.contactsBoungth.map((contac) => (
                <Box
                  key={contac.id}
                  onClick={() => {
                    newConvertationbougth(contac);
                  }}
                >
                  <Conversations key={contac.id} contacts={contac} />
                </Box>
              ))}
          </Box>
        </Box>
      </Box>
    );
  } else {
    return <h3>cargando</h3>;
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps, {})(Chat);
