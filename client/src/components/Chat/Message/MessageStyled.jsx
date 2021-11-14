import { makeStyles } from "@material-ui/core/styles";

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
      marginTop: "1.5%",
      minHeight: "10%",
      margin: "3.5%",
    },

    boxMsnSend: {
      display: "flex",
      justifyContent: "space-around",
      position: "relative",
      background: "#ff8f77",
      borderRadius: "0.7em",
      minWidth: "50%",
      maxWidth: "50%",
      height: "100%",
    },
    boxMsnReceive: {
      display: "flex",
      justifyContent: "space-around",
      position: "relative",
      background: "#FFDA77",
      minWidth: "50%",
      borderRadius: "0.7em",
      maxWidth: "50%",
      height: "100%",
    },
    message: {},
  }));
}
