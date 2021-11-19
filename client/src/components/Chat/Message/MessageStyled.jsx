import { makeStyles } from "@material-ui/core/styles";
import { grey } from "@mui/material/colors";

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
      minHeight: "30px",
      width: "100%",
      marginBottom: "10px",
    },

    boxMsnSend: {
      borderRadius: "0.2em",
      minWidth: "150px",
      minHeight: "30px",
      maxWidth: "65%",
      position: "relative",
      right: "5%",
      height: "100%",
      textAlign: "right",
      background: `${darkTheme ? grey[800] : "#ff8f77"}`,
      boxShadow: `0.1em 0.1em 0.4em  ${darkTheme ? grey[800] : grey[600]}`,
      "& div": {
        padding: "0px",
        textAlign: "justify",
        textJustify: "inter-word",
        overflowWrap: "break-word",
        minHeight: "30px",
        "& h5": {
          padding: "1% 4% 0% 4%",
          margin: "0%",
          color: `${darkTheme ? grey[100] : grey[100]}`,
          fontSize: "0.8em",
        },
      },
      "& h5": {
        margin: "0%",
        padding: "0%",
        marginRight: "15px",
        fontSize: "0.7em",
        color: `${darkTheme ? grey[400] : grey[200]}`,
      },
    },
    boxMsnReceive: {
      maxWidth: "60%",
      position: "relative",
      background: `${darkTheme ? "#890b44" : "#ffda77"}`,
      borderRadius: "0.2em",
      minWidth: "150px",
      minHeight: "30px",
      height: "100%",
      boxShadow: `0.1em 0.1em 0.4em  ${darkTheme ? "#ab003c" : "#af7223"}`,
      left: "5%",
      textAlign: "right",
      "& div": {
        padding: "0",
        textAlign: "justify",
        minHeight: "30px",
        textJustify: "inter-word",
        overflowWrap: "break-word",
        "& h5": {
          padding: "1% 4% 0% 4%",
          margin: "0%",
          color: `${darkTheme ? grey[100] : grey[800]}`,
          fontSize: "0.8em",
        },
      },
      "& h5": {
        margin: "0%",
        padding: "0%",
        marginRight: "15px",
        fontSize: "0.7em",
        color: `${darkTheme ? grey[100] : grey[900]}`,
      },
    },
  }));
}
