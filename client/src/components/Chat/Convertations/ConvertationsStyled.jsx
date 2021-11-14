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
export default function useStylesConvertations(darkTheme,statusUser) {
  //darkTheme boolean global state
  return makeStyles((theme) => ({
    avatar: {
      width: 76,
      height: 76,
      border: `4.0px solid ${!statusUser ? red[300] : green[800]}`,
    },
    boxConvInline: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "space-around",
      height: "100px",
      cursor: "pointer",
      background: "#FFDA77",
      boxShadow: `0.3em 0.3em 0.2em  ${darkTheme ? grey[800] : grey[600]}`,
      width: "80%",
      borderRadius: "0.3em",
    },
  }));
}
