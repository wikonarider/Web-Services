import { makeStyles } from "@material-ui/core/styles";
import { grey } from "@mui/material/colors";
// Descomentar cuando se va a usar
// import {
//   brown,
//   amber,
//   lime,
//   deepOrange,
//   green,
//   red,
// } from "@mui/material/colors";
export default function useStylesMessage(darkTheme, message, user) {
  //darkTheme prop global

  return makeStyles((theme) => ({
    avatar: {
      width: 40,
      height: 40,
      left: "0.4%",
    },
    box_position_MsnSendReceive: {
      display: "flex",
      justifyContent: message.userId === user.id ? "flex-end" : "flex-start",
      alignItems: "center",
      marginTop: "5%",
      minHeight: "10%",
      minWidth: "3%",
      margin: "3.5%",
    },

    boxMsnSend: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
      background: "#ff8f77",
      borderRadius: "0.3em",
      minWidth: "9%",
      maxWidth: "50%",
      height: "100%",
      textAlign: "right",
      boxShadow: `0.3em 0.3em 0.2em  ${darkTheme ? grey[800] : grey[600]}`,
      "& h5": {
        margin: "0%",
        padding: "0%",
        marginRight: "2%",
        color: `${darkTheme ? "white" : "white"}`,
      },
    },
    boxMsnReceive: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
      maxWidth: "50%",
      background: "#FFDA77",
      borderRadius: "0.3em",
      minWidth: "9%",
      height: "100%",
      boxShadow: `0.3em 0.3em 0.2em  ${darkTheme ? grey[800] : grey[600]}`,
      textAlign: "right",
      "& h5": {
        margin: "0%",
        padding: "0%",
        marginRight: "2%",
        color: `${darkTheme ? grey[800] : grey[600]}`,
      },
    },
    message: {
      padding: "0",
      textAlign: "justify",
      textJustify: "inter-word",
      overflowWrap: "break-word",
      "& h4": {
        padding: "1% 1% 0% 5%",
        margin: "2%",
      },
    },
  }));
}
