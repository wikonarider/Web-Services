import { makeStyles } from "@material-ui/core/styles";
import { grey, blueGrey } from "@mui/material/colors";

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
      marginTop: "3%",
      minHeight: "15%",
      minWidth: "13%",
      width:"100%",
   
    },

    boxMsnSend: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
      borderRadius: "0.5em",
      minWidth: "9%",
      maxWidth: "50%",
      height: "100%",
      textAlign: "right",
      background: `${darkTheme ? grey[800] : blueGrey[100]}`,
      boxShadow: `0.2em 0.2em 0.1em  ${darkTheme ? grey[800] : grey[600]}`,
      "& h5": {
        margin: "0%",
        padding: "0%",
        marginRight: "3%",
        fontSize: "0.5em",
        color: `${darkTheme ? grey[100] : grey[600]}`,
      },
    },
    boxMsnReceive: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
      maxWidth: "50%",
      background: `${darkTheme ? "#FF0060" : "#FFDA77"}`,
      borderRadius: "0.5em",
      minWidth: "9%",
      height: "100%",
      boxShadow: `0.2em 0.2em 0.1em  ${darkTheme ? "#e91e63" : grey[600]}`,

      textAlign: "right",
      "& h5": {
        margin: "0%",
        padding: "0%",
        marginRight: "3%",
        fontSize: "0.5em",
        color: `${darkTheme ? grey[100] : grey[600]}`,
      },
    },
    message: {
      padding: "0",
      textAlign: "justify",
      textJustify: "inter-word",
      overflowWrap: "break-word",
      "& p": {
        padding: "1% 1% 0% 4%",
        margin: "2%",
        color: `${darkTheme ? grey[100] : grey[100]}`,
        fontSize: "0.7em",
      },
    },
  }));
}
