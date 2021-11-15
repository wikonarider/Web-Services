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
      position: "absolute",
      right: "94%",
      bottom: "75%",
    },
    box_position_MsnSendReceive: {
      display: "flex",
      justifyContent: message.userId === user.id ? "flex-end" : "flex-start",
      alignItems: "center",
      marginTop: "5%",
      minHeight: "10%",
      margin: "3.5%",
    },

    boxMsnSend: {
      display: "flex",
      justifyContent: "space-around",
      position: "relative",
      background: "#ff8f77",
      borderRadius: "0rem",
      minWidth: "50%",
      maxWidth: "50%",
      height: "100%",
      boxShadow: `0.3em 0.3em 0.2em  ${darkTheme ? grey[800] : grey[600]}`,
    },
    boxMsnReceive: {
      display: "flex",
      justifyContent: "space-around",
      position: "relative",
      background: "#FFDA77",
      minWidth: "50%",
      borderRadius: "0rem",
      maxWidth: "50%",
      height: "100%",
      boxShadow: `0.3em 0.3em 0.2em  ${darkTheme ? grey[800] : grey[600]}`,
    },
    message: {
      padding: "1em",
    },
  }));
}
