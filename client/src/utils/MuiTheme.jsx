import { createTheme } from "@mui/material";
import {
  brown,
  blueGrey,
  amber,
  deepOrange,
  green,
} from "@mui/material/colors";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: blueGrey[100],
      contrastText: brown[500],
    },
    secondary: {
      main: amber[200],
      contrastText: brown[500],
    },
    error: deepOrange,
    warning: amber,
    succcess: green,
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#FBBBD9",
    },
    secondary: {
      main: "#FF0060",
    },
  },
});
