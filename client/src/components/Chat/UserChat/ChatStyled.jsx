import { makeStyles } from "@material-ui/core/styles";
import { brown, amber, lime, deepOrange, green } from "@mui/material/colors";
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
      maxHeight: "935px",
      minHeight: "935px",
      overflow: "hidden",
      backgroundColor: "rgb(231, 238, 238)",
    },
    //---------------------------------------------------------------------box contacts*/
    box_contacts_a: {
      flex: 2,
      display: "flex",
    },
    containerConvertation: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      marginTop: "5%",
    },
    /*box-contacts-menu*/
    menu_Contacts_Wrapper: {
      display: "flex",
      flexDirection: "column",
      padding: "1%",
      width: "100%",
      background: darkMode ? "#212121" : "#B5C0C5",
    },
    box_avatar_And_X: {
      display: "flex",
      justifyContent: "center",
      flexDirection: "row",
      width: "100%",
      "&:hover": {
        backgroundColor: "grey",
        opacity: "100%",
        borderRadius:"0.2em"
      },
    },

    /*input search*/
    searchContact: {},

    /*---------------------------------------------------------------box conversations*/
    box_conversations_b: {
      flex: "5.5",
      height: "90%",
      overflowY: "scroll",
    },
    /*box conversatios wrapper*/
    menu_chating_wrapper: {
      height: "100%",
      padding: "1%",
      color: "rgb(167, 32, 32)",
    },

    /*----------------------------------------------------------------box contacts online-offline*/
    box_contactsStates_c: {
      flex: 2,
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
