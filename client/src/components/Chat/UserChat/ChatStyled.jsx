import { makeStyles } from "@material-ui/core/styles";
import { grey, blueGrey } from "@mui/material/colors";

export default function useStylesChat(darkTheme, selectCurrentChat) {
  //darkTheme booleano del estado global
  return makeStyles((theme) => ({
    //darkTheme prop global
    inputForm: {
      display: "flex",
      width: "100%",
      height: "5%",
      alignItems: "center",
      marginBottom: "1%",
      marginTop: "1%",
    },
    inputSend: {
      display: "flex",
      background: darkTheme ? grey[900] : blueGrey[100],
      borderRadius: "0.2em",
      height: "100%",
      minHeight: "100%",
      marginLeft: "2%",

      "& input": {
        color: darkTheme ? grey[400] : blueGrey[600],
        fontFamily: "roboto",
        margin: "1% 0 0 2%",
        padding: "0",
        height: "100%",
      },
      "& fieldSet": {
        border: "none",
        height: "100%",
      },
    },
    searchContact: {
      height: "8%",
      textAlign: "center",
      "& input": {
        textAlign: "center",
        color: darkTheme ? grey[400] : "black",
        fontSize: "1.4em",
      },
    },
    btn: {
      textTransfrom: "none",
      height: "35px",
      marginLeft: "1%",
      marginRight: "1%",
    },
    //------------------------------------------------------------------button X
    btn_x: {
      position: "absolute",
      left: "82%",
      bottom: "-1%",
      cursor: "pointer",
    },
    //----------------------------------------------------------------------
    startchat: {
      textAlign: "center",
      fontSize: 40,
      opacity: "0.1",
      textTransform: "uppercase",
    },
    /*box wrapper chat*/
    box_messanger_father: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      height: "calc(100vh - 70px)",
      width: "100vw",
      overflowX: "hidden",
    },
    //---------------------------------------------------------------------box contacts*/
    box_contacts_a: {
      flex: 1.5,
      minWidth: "197px",
      flexDirection: "column",
      display: "flex",
      alignItems: "center",
      height: "100%",
      overflowY: "auto",
      overflowX: "hidden",
      marginRight: "0.2%",
      background: darkTheme ? grey[900] : blueGrey[100],
      padding: "0.5%",
    },
    containerConvertation: {
      width: "80%",
      marginTop: "5%",
      minWidth: "200px",
      height: "120px",
      minHeight: "80px",
      borderRadius: "0.3em",
      transition: "0.4s",
      "&:hover": {
        background: darkTheme ? grey[700] : grey[200],
        borderRadius: "0.3em",
      },
    },

    /*input search*/

    box_conversations_b: {
      overflowX: "hidden",
      overflowY: "scroll",
      marginTop: "15px",
      minWidth: "280px",
      height: "100%",
      width: "100%",
      maxHeight: "100%",
    },
    /*---------------------------------------------------------------box conversations*/
    container_chatting: {
      flex: 5.5,
      display: "flex",
      width: "100%",
      marginRight: "0.2%",
      flexDirection: "column",
      background: darkTheme ? grey[1000] : grey[100],
      height: "100%",

      "& div::-webkit-scrollbar ": {
        WebkitAppearance: "none",
      },
      "& div::-webkit-scrollbar:vertical": {
        width: "8px",
      },

      "& div::-webkit-scrollbar-thumb": {
        backgroundColor: darkTheme ? grey[900] : blueGrey[400],
        borderRadius: "2em",
      },
    },

    /*----------------------------------------------------------------box contacts online-offline*/
    box_contactsStates_c: {
      height: "100%",
      flex: 1.5,
      display: "flex",
      minWidth: "100px",
      marginRight: "0.2%",
      flexDirection: "column",
      background: darkTheme ? grey[900] : blueGrey[100],
      padding: "0.5%",
      maxHeight: "100%",
      "& div::-webkit-scrollbar ": {
        WebkitAppearance: "none",
      },
      "& div::-webkit-scrollbar:vertical": {
        width: "10px",
      },

      "& div::-webkit-scrollbar-thumb": {
        backgroundColor: grey[800],
        borderRadius: "2em",
      },
    },

    /*box contactsOnline wrapper*/
    box_contactsOnline_wrapper: {
      display: "flex",
      overflowY: "auto",
      flexWrap: "wrap",
      alignContent: "flex-start",
      justifyContent: "center",
      height: "100%",
    },
  }));
}
/*
animacion msj nuevo
div {
  width: 100px;
  height: 100px;
  background-color: red;
  position: relative;
  animation-name: example;
  animation-duration: 2s;
  animation-iteration-count: infinite;
}

@keyframes example {
  0%   {left:0px; top:0px;}
  25%  { left:10px; top:0px;}
  50%  {left:0px; top:0px;}
  75%  { left:10px; top:0px;}
  100% { left:0px; top:0px;}
}


*/