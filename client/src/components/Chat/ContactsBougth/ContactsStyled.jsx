import { makeStyles } from "@material-ui/core/styles";
import {
  brown,
  amber,
  lime,
  deepOrange,
  green,
  grey,
  red,
} from "@mui/material/colors";
export default function useStylesBougth(darkTheme,statusUser) {
  //darkTheme boolean global state
  return makeStyles((theme) => ({
    icon_status_inline: {
      position: "absolute",
      width: 25,
      height: 25,
      borderRadius: "10em",
      background: statusUser ? green[500] : red[400],
      right: "26%",
      bottom: "82%",
      border: `3px solid ${darkTheme ? lime[900] : grey[300]}`,
      transform: "scale(0.8,0.8)",
    },
    avatar: {
      width: 70,
      height: 70,
      cursor: "pointer",
    },
    boxBoughtInline: {
      position: "relative",
      flexDirection: "column",
      height: "100%",
      display: "flex",
      alignItems: "center",
      width: "100%",
      height: "100%",
      cursor: "pointer2",
    },
  }));
}
