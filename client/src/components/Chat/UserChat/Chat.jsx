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
  clearChatInfo,
  getContacts,
  getContactsBougth,
  getConvertations,
  getPots,
  getUserInfo,
  newConvertation,
  sendMessage,
  deleteConvertation,
} from "../../../redux/actions";

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

function Chat(props) {
  var { convertations, contacts, posts, user, id, contactsBougth } = props;
  const [msg, setMsg] = useState("");
  const [currentContact, setCurrentContact] = useState([]);
  const [chating, setChating] = useState(null);
  const [contactsConv, setContactCov] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState([]);
  const dispatch = useDispatch();
  //const history=useHistory();
  var scrollRef = useRef();
  const socket = useRef(); //conexion al servidor para bidireccional peticiones
  // Material UI for SEND BTN
  const classes = useStyles();
  //----------------------------------------------------------------------------socket
  useEffect(() => {
    //client conection
    socket.current = io(process.env.REACT_APP_API || "http://localhost:3001");
    if (!user) {
      getUserInfo().then((userInfo) => dispatch(userInfo));
      return;
    }
    socket.current.on("getMessage", function (dat) {
      //new msn from back server.io
      console.log("new post", dat);
      setArrivalMessage([
        {
          userId: dat.senderId,
          remit: dat.remit,
          text: dat.text,
          createdAt: Date.now(),
        },
      ]);
    });
    return () => {
      setChating([]);
      setArrivalMessage([]);
      setCurrentContact([]);
      setMsg("");
      dispatch(clearChatInfo());
      // history.push("/home")
    };
  }, []);
  //----------------------------------------------------------------scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chating]);
  //-----------------------------------------------------------------------------new msg receive

  useEffect(() => {
    console.log("arrival ", arrivalMessage);

    if (arrivalMessage.length && currentContact.length) {
      currentContact[0].id === arrivalMessage[0].userId &&
        setChating([...chating, ...arrivalMessage]);
    }

    // eslint-disable-next-line
  }, [arrivalMessage]);
  //---------------------------------------------------------------------------get id all convertations and contacts
  useEffect(() => {
    convertationsAndContacts();
    // eslint-disable-next-line
  }, [convertations, contacts, posts, user]);
  //-------------------------------------------------------------------------------------------------convertation of contacts
  function convertationsAndContacts() {
    if (user && convertations.length && !contacts.length) {
      dispatch(getContacts());
    }
    if (user && !convertations.length) {
      dispatch(getConvertations());
      //dispatch(getContactsBougth());
    }
    if (contacts.length && !contactsConv.length) {
      console.log(contacts);

      setContactCov(contacts);
    }

    if (user) {
      socket.current.emit("addUser", user.id);
    }
    setChating(posts);
  }
  //-------------------------------------------------------------------------------------------------------------new convertations
  function newConvertationbougth(newContact) {
    var contatsInclude = contactsConv.filter(
      (cont) => cont.id === newContact.id
    );

    dispatch(clearChatInfo());
    setCurrentContact(newContact);
    if (!contatsInclude.length) {
      setContactCov([...contactsConv, newContact]);
      dispatch(newConvertation(newContact.id));
      chatContact(newContact.id);
    }
  }
  //-------------------------------------------------------------------------------------------------------------delete convertations
  function deleteConvert(contact) {
    setChating(null);
    chatContact(contact.id, true);
    setCurrentContact([]);
    if (contacts.length > 1) {
      setContactCov(
        contactsConv.filter((cont) => {
          return cont.id !== contact.id;
        })
      );
    } else {
      setContactCov(null);
    }
  }
  //--------------------------------------------------------------------------------------------conversation of a contact
  function chatContact(idContact, _delete) {
    //chat BD
    var conv = [];
    for (let i = 0; i < convertations.length; i++) {
      var { userA, userB } = convertations[i];
      if (
        (userA === idContact && userB === user.id) ||
        (userA === user.id && userB === idContact)
      ) {
        conv.push(convertations[i].id);
      }
    }
    var conta = contactsConv.filter((c) => {
      return c.id === idContact;
    });
    if (conta.length) {
      setCurrentContact([conta[0]]);
    }
    if (conv.length > 0) {
      _delete && dispatch(deleteConvertation(conv[0]));
      !_delete && dispatch(getPots(conv[0]));
      return;
    }
  }
  //------------------------------------------------------------------------------------------send msn
  function handleSubmit(e) {
    e.preventDefault();
    if (user && currentContact) {
      socket.current.emit("sendMsn", {
        senderId: user.id,
        receiverId: currentContact[0].id,
        text: msg,
      });

      setChating((prev) => [
        ...prev,
        {
          userId: user.id,
          remit: currentContact[0].id,
          text: msg,
          createdAt: Date.now(),
        },
      ]);
      dispatch(sendMessage({ remit: currentContact[0].id, message: msg }));
      setMsg("");
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
            {contactsConv.length &&
              contactsConv.map((con) => (
                <Box key={con.id}>
                  <Box
                    onClick={() => {
                      chatContact(con.id);
                    }}
                  >
                    <Button
                      onClick={() => {
                        deleteConvert(con);
                      }}
                    >
                      X
                    </Button>
                    <Conversations key={con.id} contacts={con} />
                  </Box>
                </Box>
              ))}
          </Box>
        </Box>
        {/*message list*/}
        <div style={{ flex: "5.5" }}>
          {chating && currentContact.length ? (
            <div name="conversations" style={_style.box_conversations_b}>
              <Box name="message" sx={_style.menu_chating_wrapper}>
                {chating.map((msn, i) => (
                  <Message
                    scrollRef={scrollRef}
                    key={i}
                    user={user}
                    contact={currentContact[0]}
                    message={msn}
                  />
                ))}
              </Box>
            </div>
          ) : (
            <h3>Click a contact to start a chat</h3>
          )}

          {currentContact.length ? (
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
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
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
            {contactsBougth.length &&
              contactsBougth.map((contac) => (
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
    convertations: state.convertations,
    contacts: state.contacts,
    cookie: state.cookie,
    posts: state.posts,
    user: state.user,
    contactsBougth: state.contactsBougth,
  };
}

export default connect(mapStateToProps, {})(Chat);
