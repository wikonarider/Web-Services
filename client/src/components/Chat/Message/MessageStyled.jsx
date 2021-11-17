import { makeStyles } from "@material-ui/core/styles";
import { grey, blueGrey } from "@mui/material/colors";

export default function useStylesMessage(darkTheme, message, user) {
  //darkTheme prop global

  return makeStyles((theme) => ({
    avatar: {
      width: 25,
      height: 25,
      left: "0.7%",
    },
    box_position_MsnSendReceive: {
      display: "flex",
      justifyContent: message.userId === user.id ? "flex-end" : "flex-start",
      alignItems: "center",
      minHeight: "100px",
      minWidth: "13%",
      width: "100%",
    },

    boxMsnSend: {
      borderRadius: "0.2em",
      minWidth: "150px",
      minHeight: "60px",
      maxWidth: "65%",
      position: "relative",
      right: "5%",
      marginBottom: "1%",
      height: "100%",
      textAlign: "right",
      background: `${darkTheme ? grey[800] : blueGrey[100]}`,
      boxShadow: `0.1em 0.1em 0.1em  ${darkTheme ? grey[800] : grey[600]}`,
      "& div": {
        padding: "0",
        textAlign: "justify",
        textJustify: "inter-word",
        overflowWrap: "break-word",
        "& h5": {
          padding: "1% 1% 0% 4%",
          margin: "0%",
          color: `${darkTheme ? grey[100] : grey[600]}`,
          fontSize: "0.8em",
        },
      },
      "& h5": {
        margin: "0%",
        padding: "0%",
        marginRight: "3%",
        fontSize: "0.7em",
        color: `${darkTheme ? grey[400] : grey[800]}`,
      },
    },
    boxMsnReceive: {
      maxWidth: "60%",
      position: "relative",
      background: `${darkTheme ? "#f50057" : "#ff7043"}`,
      borderRadius: "0.2em",
      minWidth: "150px",
      minHeight: "60px",
      height: "100%",
      boxShadow: `0.1em 0.1em 0.1em  ${darkTheme ? "#ab003c" : grey[600]}`,
      marginBottom: "1%",
      left: "5%",
      textAlign: "right",
      "& div": {
        padding: "0",
        textAlign: "justify",
        textJustify: "inter-word",
        overflowWrap: "break-word",
        "& h5": {
          padding: "1% 1% 0% 4%",
          margin: "0%",
          color: `${darkTheme ? grey[100] : grey[100]}`,
          fontSize: "0.8em",
        },
      },
      "& h5": {
        margin: "0%",
        padding: "0%",
        marginRight: "3%",
        fontSize: "0.7em",
        color: `${darkTheme ? grey[100] : grey[100]}`,
      },
    },
  }));
}
