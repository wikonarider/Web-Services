import { makeStyles } from "@material-ui/core/styles";
import { green, grey, red ,blueGrey} from "@mui/material/colors";

// Dscomentar cuando se va a usar
// import { brown, amber, lime, deepOrange } from "@mui/material/colors";
export default function useStylesBougth(darkTheme, statusUser) {
  //darkTheme boolean global state
  return makeStyles((theme) => ({
    icon_status_inline: {
      position: "absolute",
      width: 25,
      height: 25,
      borderRadius: "15em",
      background: statusUser ? green[500] : red[400],
      right: "10%",
      bottom: "82%",
      border: `3px solid ${darkTheme ? "#212121" : blueGrey[200]}`,
      transform: "scale(0.8,0.8)",
    },
    avatar: {
      boxShadow: `0.1em 0.2em 0.18em ${grey[700]}`,
      width: 70,
      height: 70,
      minWidth:70,
      minHeight:70,
      cursor: "pointer",
    },
    boxBoughtInline: {
      position: "relative",
      flexDirection: "column",
      alignItems: "center",
      display: "flex",
      width: "90px",
      height: "130px",
      cursor: "pointer2",
    },
    nameUserBought: {
      height: "100%",
      display: "flex",
      color: darkTheme ? grey[300] : blueGrey[900],
      alignItems: "center",
      paddingBottom: "25%",
    },
  }));
}
