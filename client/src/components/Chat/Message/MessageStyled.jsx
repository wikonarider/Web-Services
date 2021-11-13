import { makeStyles } from "@material-ui/core/styles";

export default function useStylesMessage(darkTheme) {
  //darkTheme boolean global state
  return makeStyles((theme) => ({
    boxMsnSend: {
      background: "#ff8f77",
      borderRadius: "0.3em",
      marginTop: "1.5%",
      minHeight: "5%",
      maxWidth: "50%",
    },
    boxMsnReceive: {
      background: "#FFDA77",
      borderRadius: "0.3em",
      marginTop: "1.5%",
      minHeight: "5%",
      maxWidth: "50%",
    },
    msn: {
      display: "flex",
      paddingRight: "2%",
    },
  }));
}
