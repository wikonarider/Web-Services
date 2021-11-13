import { makeStyles } from "@material-ui/core/styles";
import { brown } from "@mui/material/colors";
//darkMode booleano del estado global
export default function useStylesChat(darkMode) {
  return makeStyles((theme) => ({
    //theme prop global
    //SEND BTN
    btn: {
      borderRadius: 0,
      textTransfrom: "none",
      color: brown[500],
    },
    //------------------------------------------------------------------button X
    btn_x: {
      position: "absolute",
      left: "85.5%",
      bottom: "85%",
      cursor: "pointer",
    },
    //----------------------------------------------------------------------
    /*box wrapper chat*/
    box_messanger_father: {
      display: "flex",
      flexDirection: "row",
      maxHeight: "90%",
      minHeight: "935px",
      overflowY: "hidden",
      backgroundColor: "rgb(231, 238, 238)",
    },
    //---------------------------------------------------------------------box contacts*/
    box_contacts_a: {
      flex: 1.5,
      display: "flex",
      flexDirection: "column",
      background: darkMode ? "#212121" : "#B5C0C5",
      padding: "0.5%",
      height: "95",
    },
    containerConvertation: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      marginTop: "5%",
    },
    box_avatar_And_X: {
      display: "flex",
      justifyContent: "center",
      flexDirection: "row",
      width: "100%",
      transition: "0.3s",
      "&:hover": {
        backgroundColor: "grey",
        opacity: "100%",
        borderRadius: "0.2em",
      },
    },

    /*input search*/
    searchContact: {},

    /*---------------------------------------------------------------box conversations*/
    container_chatting: {
      flex: "5.5",
      display: "flex",
      flexDirection: "column",
      background: darkMode ? "#212121" : "#fafafa",
    },

    box_conversations_b: {
      flexDirection: "column",
      height: "100%",
      overflowY: "scroll",
    },
    /*----------------------------------------------------------------box contacts online-offline*/
    box_contactsStates_c: {
      flex: 1.5,
    },

    /*box contactsOnline wrapper*/
    menu_contactsOnline_wrapper: {
      padding: "1%",
      height: "100%",
      background: darkMode ? "#212121" : "#B5C0C5",
    },
    startchat: {
      size: "3em",
    },
  }));
}
