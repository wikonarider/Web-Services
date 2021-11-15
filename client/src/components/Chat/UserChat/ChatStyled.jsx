import { makeStyles } from "@material-ui/core/styles";
import { brown, grey } from "@mui/material/colors";
// Descomentar cuando se va a usar, evitar los warnings
// import {
//   amber,
//   lime,
//   deepOrange,
//   green,
//   red,
//   blueGrey,
// } from "@mui/material/colors";

export default function useStylesChat(darkTheme) {
  //darkTheme booleano del estado global
  return makeStyles((theme) => ({
    //darkTheme prop global
    //SEND BTN
    inputSend: {
      background: darkTheme ? grey[900] : "whiteSmoke",
      borderRadius: "0",
      margin: "1%",
      height: "70px",
      "& input": {
        color: darkTheme ? grey[400] : grey[900],
        marginLeft: "0.9%",
      },
      "& fieldSet": {
        borderRadius: "0",
        height: "75px",
      },
    },
    searchContact: {
      color: darkTheme ? grey[400] : grey[900],
      textAlign: "center",
    },
    btn: {
      borderRadius: 0,
      textTransfrom: "none",
      color: brown[500],
    },
    //------------------------------------------------------------------button X
    btn_x: {
      position: "absolute",
      left: "85%",
      bottom: "85%",
      cursor: "pointer",
    },
    //----------------------------------------------------------------------
    startchat: {
      textAlign: "center",
      fontSize: 40,
      opacity: "0.3",
      textTransform: "uppercase",
    },
    /*box wrapper chat*/
    box_messanger_father: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      height: "100vh",
      width: "100vw",
      overflowX: "hidden",
      overflowY: "hidden",
    },
    //---------------------------------------------------------------------box contacts*/
    box_contacts_a: {
      flex: 1.5,
      display: "flex",

      height: "100vh",
      overflowY: "auto",
      flexDirection: "column",
      background: darkTheme ? grey[900] : "#FFE5A1",
      padding: "0.5%",
    },
    containerConvertation: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      marginTop: "15%",
      width: "100%",
      transition: "0.4s",
      "&:hover": {
        background: darkTheme ? grey[700] : grey[400],
        borderRadius: "0",
      },
    },
    box_avatar_And_X: {
      display: "flex",
      justifyContent: "center",
      flexDirection: "row",
      width: "100%",
    },

    /*input search*/

    /*---------------------------------------------------------------box conversations*/
    container_chatting: {
      flex: "5.5",
      display: "flex",
      flexDirection: "column",
      alignContent: "stretch",
      background: darkTheme ? grey[1000] : grey[100],
      height: "100vh",
    },

    box_conversations_b: {
      overflowX: "hidden",
      overflowY: "scroll",
      height: "100vh",
      maxHeight: "100vh",
    },
    /*----------------------------------------------------------------box contacts online-offline*/
    box_contactsStates_c: {
      height: "100%",
      flex: 1.5,
      display: "flex",
      flexDirection: "column",
      background: darkTheme ? grey[900] : "#FFE5A1",
      padding: "0.5%",
      maxHeight: "100vh",
    },

    /*box contactsOnline wrapper*/
    box_contactsOnline_wrapper: {
      display: "flex",
      flexWrap: "wrap",
      alignContent: "flex-start",

      maxHeight: "100%",
      overflowY: "hidde",
    },

    box_contact_bought: {
      height: "55%",
      width: "50%",
    },
  }));
}
