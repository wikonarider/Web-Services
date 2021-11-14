import { makeStyles } from "@material-ui/core/styles";
import {
  brown,
  amber,
  lime,
  deepOrange,
  green,
  grey,
  red,
  blueGrey,
} from "@mui/material/colors";
export default function useStylesChat(darkTheme) {
  //darkTheme booleano del estado global
  return makeStyles((theme) => ({
    //darkTheme prop global
    //SEND BTN
    searchContact: {},
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
    /*box wrapper chat*/
    box_messanger_father: {
      display: "flex",
      flexDirection: "row",
      height: "937px",
      overflowY: "hidden",
      backgroundColor: "rgb(231, 238, 238)",
    },
    //---------------------------------------------------------------------box contacts*/
    box_contacts_a: {
      flex: 1.5,
      display: "flex",
      height: "100%",
      flexDirection: "column",
      background: darkTheme ? grey[800] : grey[400],
      padding: "0.5%",
    },
    containerConvertation: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      marginTop: "5%",
      width: "100%",
      transition: "0.4s",
      "&:hover": {
        background: darkTheme ? grey[700] : grey[300],
        borderRadius: "0.3em",
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
      background: darkTheme ? "#212121" : "#fafafa",
      height: "100%",
    },

    box_conversations_b: {
      overflowX: "hidden",
      overflowY: "scroll",
      height: "100%",
    },
    /*----------------------------------------------------------------box contacts online-offline*/
    box_contactsStates_c: {
      height: "100%",
      flex: 1.5,
      display: "flex",
      flexDirection: "column",
      background: darkTheme ? grey[800] : grey[400],
      padding: "0.5%",
    },

    /*box contactsOnline wrapper*/
    box_contactsOnline_wrapper: {
      display: "flex",
      flexWrap: "wrap",
    },
    startchat: {
      textAlign: "center",
      fontSize: 123,
      opacity: "0.2",
    },

    box_contact_bought: {
      height: "60%",
      width: "50%",
    },
  }));
}
