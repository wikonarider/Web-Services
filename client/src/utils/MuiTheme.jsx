import { createTheme } from "@mui/material";
import { brown, amber, lime, deepOrange, green } from "@mui/material/colors";

export const lightTheme = createTheme({
  palette: {
    primary: {
      main: "#B5C0C5",
      contrastText: brown[500],
    },
    secondary: {
      main: lime[500],
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
