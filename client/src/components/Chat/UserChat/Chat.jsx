import { io } from "socket.io-client";
import React, { useEffect, useRef, useState } from "react";
import Conversations from "../Convertations/convertations.jsx";
import Box from "@mui/material/Box";
import SendIcon from "@mui/icons-material/Send";
import Input from "@mui/material/Input";
import TextField from "@mui/material/TextField";
import { connect } from "react-redux";
import dotenv from "dotenv";
import Message from "../Message/Message";
import Contactsbougth from "../ContactsBougth/ContactsBougth.jsx";
import useStylesChat from "./ChatStyled";
import IconButton from "@mui/material/IconButton";
import {
  getContacts,
  getContactsBougth,
  getConvertations,
  getPots,
  newConvertation,
  sendMessage,
  deleteConvertation,
} from "./StateLocal.jsx";

dotenv.config();
function Chat({ user, darkTheme, cookie }) {
  const [UsersOnlines, setUsersOnlines] = useState([]); //1
  const [text, setText] = useState(""); //2
  const [textReceive, setTextReceive] = useState(""); //3
  const [chat, setChat] = useState({
    currentCont: "",
    chatting: [],
    contactsConv: [],
    contactsBoungth: [],
    convertations: [],
  }); //4
  var scrollRef = useRef();
  const socket = useRef(); //conexion al servidor para bidireccional peticiones
  const classes = useStylesChat(darkTheme)();
  // useStylesChat es una funcion que recive el valor booleano
  // del darkTheme estado global y retorna un makeStyles

  //----------------------------------------------------------------------------socket
  useEffect(() => {
    //client conection
    if (cookie) {
      socket.current = io(process.env.REACT_APP_API || "http://localhost:3001");
      //---------------------------------------------new message receive
      socket.current.on("newMsnReceive", function (dat) {
        //new msn from back server.io
        setTextReceive({
          userId: dat.senderId,
          remit: dat.remit,
          text: dat.text,
          createdAt: Date.now(),
        });
      });
      //--------------------------------------------------user conectad
      socket.current.on("UsersOnlines", function (usersOnlines) {
        setUsersOnlines(usersOnlines);
      });
      //-------------------------------------------------a user logged out
      socket.current.on("usersdisconnect", function (newListUsersOnlines) {
        setUsersOnlines(newListUsersOnlines);
      });
      //--------------------------------------------------add user new

      getData();
      if (user) {
        socket.current.emit("addUser", cookie);
      }

      return () => {
        //------------------------------------------------disconnect current user
        socket.current.emit("disconnectUser", user.id);
      };
    } // eslint-disable-next-line
  }, [cookie]);
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
  // Linea comentada. Useffect no acepta un callback async, descomentar la linea
  // y leer la sugerencia, puede provocar cambios inesperados si es algo async
  // y se trata como sync
  // eslint-disable-next-line
  useEffect(async () => {
    if (textReceive && chat.currentCont) {
      chat.currentCont.id === textReceive.userId &&
        setChat({
          ...chat,
          chatting: chat.chatting.concat(textReceive),
        });
    }
    var contac = chat.contactsConv.filter((con) => {
      return con.id === textReceive.userId;
    });
    //new msj new contact add contacs array and convertations
    if (contac.length === 0 && cookie) {
      var convertition;
      getConvertations()
        .then((conv) => {
          convertition = conv;
          return getContacts();
        })
        .then((contact) => {
          setChat({
            ...chat,
            contactsConv: contact.data,
            convertations: convertition.data,
          });
        })
        .catch((err) => console.log(err));
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
    var id;
    var newCurrent = chat.contactsConv.filter((c) => {
      return c.id === idUser;
    });
    if (newCurrent.length) {
      id = idPostConvertation(idUser);
      if (id > 0) {
        var post = await getPots(id);
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
      // eslint-disable-next-line
      var send = await sendMessage({
        //send BD
        remit: chat.currentCont.id,
        message: text,
      });
      setText("");
    }
  }
  //---------------------------------------component chat----------------------------------------------------------------------------------------------
  if (user) {
    return (
      <Box name="box-father" className={classes.box_messanger_father}>
        {/*------------------------ conversation list-------------------------------------------- */}
        <Box name="contacts" className={classes.box_contacts_a}>
          <Input
            type="text"
            name="inputSearch"
            placeholder="search contact!"
            className={classes.searchContact}
          ></Input>
          {chat.contactsConv.length ? (
            chat.contactsConv.map((con) => (
              <Box className={classes.containerConvertation} key={con.id}>
                  <Conversations
                    key={con.id}
                    contacts={con}
                    contactsOnline={UsersOnlines}
                    darkTheme={darkTheme}
                    contactCurrent={chat.currentCont}
                    deleteConv={deleteConvert}
                    chatCont={chatContact}
                  />{" "}
              
              </Box>
            ))
          ) : (
            <></>
          )}
        </Box>
        {/*---------------------------------------------message list--------------------------------------------------*/}
        <Box name="chatting" className={classes.container_chatting}>
          {chat.currentCont ? (
            <Box name="conversations" className={classes.box_conversations_b}>
              {chat.chatting.map((msn, i) => (
                <Message
                  scrollRef={scrollRef}
                  key={i}
                  user={user}
                  contact={chat.currentCont}
                  message={msn}
                  darkTheme={darkTheme}
                />
              ))}
            </Box>
          ) : (
            <Box className={classes.startchat}>
              Click a contact to start a chat
            </Box>
          )}

          {chat.currentCont ? (
            <form
              className={classes.inputForm}
              onSubmit={(e) => handleSubmit(e)}
            >
              <TextField
                fullWidth
                size="small"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className={classes.inputSend}
              />
              <IconButton
                variant="contained"
                type="submit"
                size="small"
                className={classes.btn}
              >
                <SendIcon />
              </IconButton>
            </form>
          ) : (
            <></>
          )}
        </Box>
        {/*----------------contact list of purchased services */}
        <Box name="contacts-online" className={classes.box_contactsStates_c}>
          <h3>Contacts</h3>
          <Box
            name="menu-contactsOnline-wrapper"
            className={classes.box_contactsOnline_wrapper}
          >
            {chat.contactsBoungth.length ? (
              chat.contactsBoungth.map((contac) => (
                <Contactsbougth
                  key={contac.id}
                  contacts={contac}
                  contactsOnline={UsersOnlines}
                  darkTheme={darkTheme}
                  newConvBou={newConvertationbougth}
                />
              ))
            ) : (
              <></>
            )}
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
    darkTheme: state.darkTheme,
    cookie: state.cookie,
  };
}

export default connect(mapStateToProps, {})(Chat);
