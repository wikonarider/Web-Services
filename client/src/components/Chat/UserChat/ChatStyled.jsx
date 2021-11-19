import { makeStyles } from "@material-ui/core/styles";
import { grey, blueGrey ,amber} from "@mui/material/colors";

export default function useStylesChat(darkTheme ) {
  //darkTheme booleano del estado global
  return makeStyles((theme) => ({
    //darkTheme prop global
    inputForm: {
      display: "flex",
      position:"relative",
      bottom:"3px",
      width: "100%",
      height: "110px",
      alignItems: "center",
      paddingLeft: "10px",
    },
    inputSend: {
      background: darkTheme ? grey[900] : blueGrey[100],
      borderRadius: "0.2em",
      height: "100%",
      marginLeft: "2%",
      "& div": {
        height: "100%",
        margin: "0px",
        padding: "0px",
        "& textarea::-webkit-scrollbar ": {
          WebkitAppearance: "none",
        },
        "& textarea::-webkit-scrollbar:vertical": {
          width: "8px",
        },

        "& textarea::-webkit-scrollbar-thumb": {
          backgroundColor: darkTheme ? grey[800] :  grey[300],
          borderRadius: "2em",
        },
      },

      "& textarea": {
        color: darkTheme ? grey[50] : blueGrey[1000],
        fontFamily: "roboto",
        padding: "0px",
        height: "100%",
        textAlign: "justify",
        textJustify: "inter-word",
        overflowWrap: "break-word",
        paddingLeft: "2%",
        paddingRight: "2%",
        
      },
      "& fieldSet": {
        border: "none",
        padding: "0px",
        margin: "0px",
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
      background: darkTheme ? grey[900] : amber[100],
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
        backgroundColor: darkTheme ? grey[900] : blueGrey[100],
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
      background: darkTheme ? grey[900] : amber[100],
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