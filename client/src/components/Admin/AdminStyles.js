import { lightTheme, darkTheme } from "../../utils/MuiTheme";

export const styles = {
  dark: {
    box: {
      backgroundColor: "rgb(12,12,12)",
      WebkitBoxShadow: "5px 5px 15px 5px #000000",
      boxShadow: "5px 5px 15px 5px #000000",

      borderRadius: "10px",
    },
    tooltip: {
      cursor: {
        stroke: "rgb(103, 103, 103)",
        strokeWidth: 2,
      },
      chip: {
        backgroundColor: "rgb(39, 39, 39)",
      },
    },
    iconButton: {
      backgroundColor: darkTheme.palette.secondary.main, //"rgb(255, 0, 96)",
    },
    typography: {
      primary: {
        color: "rgb(255, 255, 255)",
      },
      secondary: {
        color: darkTheme.palette.primary.main, //"rgb(251, 171, 158)",
      },
    },
    map: {
      empty: {
        backgroundColor: darkTheme.palette.primary.main,
      },
      filled: {
        backgroundColor: darkTheme.palette.secondary.main,
      },
    },
  },
  light: {
    box: {
      backgroundColor: "rgb(245, 245, 245)",
      WebkitBoxShadow: "5px 5px 15px 5px #b5c0c5",
      boxShadow: "5px 5px 15px 5px #b5c0c5",

      borderRadius: "10px",
    },
    tooltip: {
      cursor: {
        stroke: lightTheme.palette.primary.main, //"rgb(181, 192, 197)",
        strokeWidth: 2,
      },
      chip: {
        backgroundColor: lightTheme.palette.primary.main, //"rgb(110, 117, 120)",
        color: "rgb(215, 228, 234)",
      },
    },
    iconButton: {
      backgroundColor: lightTheme.palette.secondary.main, //"rgb(205, 220, 57)",
    },
    typography: {
      primary: {
        color: lightTheme.palette.primary.main, //"rgb(98, 100, 101)",
      },
      secondary: {
        color: lightTheme.palette.primary.contrastText, //"rgb(161, 174, 48)",
      },
    },
    map: {
      empty: {
        backgroundColor: lightTheme.palette.primary.main,
      },
      filled: {
        backgroundColor: lightTheme.palette.secondary.main,
      },
    },
  },
};
