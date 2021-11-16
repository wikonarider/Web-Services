import { makeStyles } from "@material-ui/core/styles";
import { grey, blueGrey } from "@mui/material/colors";

export default function useStylesChat(darkTheme, selectCurrentChat) {
  //darkTheme booleano del estado global
  return makeStyles((theme) => ({
    //darkTheme prop global
    //SEND BTN
    inputForm: {
      display: "flex",
      width: "100%",
      height: "5%",
      alignItems: "center",
      margin: "1%",
    },
    inputSend: {
      display: "flex",
      background: darkTheme ? grey[900] : blueGrey[400],
      borderRadius: "0.5em",
      height: "100%",
      minHeight: "100%",
      marginLeft: "2%",

      "& input": {
        color: darkTheme ? grey[400] : blueGrey[100],
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
      height: "40%",
      marginLeft: "1%",
      marginRight: "2%",
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
      height: "calc(100vh - 70px)",
      width: "100vw",
      overflowX: "hidden",
    },
    //---------------------------------------------------------------------box contacts*/
    box_contacts_a: {
      flex: 1.5,
      display: "flex",
      height: "100%",
      overflowY: "auto",
      marginRight: "0.2%",
      flexDirection: "column",
      background: darkTheme ? grey[900] : blueGrey[400],
      padding: "0.5%",
    },
    containerConvertation: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      width: "100%",
      marginBottom: "3%",
      height: "11%",
      borderRadius: "0.3em",
      transition: "0.4s",
      "&:hover": {
        background: darkTheme ? grey[700] : grey[200],
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

    box_conversations_b: {
      overflowX: "hidden",
      overflowY: "scroll",
      marginTop: "15px",
      height: "100%",
      width: "100%",
      maxHeight: "100%",
    },
    /*----------------------------------------------------------------box contacts online-offline*/
    box_contactsStates_c: {
      height: "100%",
      flex: 1.5,
      display: "flex",
      marginRight: "0.2%",
      flexDirection: "column",
      background: darkTheme ? grey[900] : blueGrey[400],
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
      maxHeight: "100%",
      height: "100%",
    },
  }));
}
