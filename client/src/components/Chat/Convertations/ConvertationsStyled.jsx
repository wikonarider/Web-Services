import { makeStyles } from "@material-ui/core/styles";
import { green, grey, red } from "@mui/material/colors";

// Descomentar cuando se va a usar
// import { brown, amber, lime, deepOrange } from "@mui/material/colors";

export default function useStylesConvertations(
  darkTheme,
  statusUser,
  contactSelected
) {
  //darkTheme boolean global state
  return makeStyles((theme) => ({
    avatar: {
      width: 76,
      height: 76,
      border: `4.0px solid ${!statusUser ? red[200] : green[800]}`,
    },
    boxConvInline: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      transform: "scale(1,0.9)",
      cursor: "pointer",
      background: `${
        darkTheme
          ? contactSelected
            ? "#b20043"
            : "#FF0060"
          : contactSelected
          ? "#ff9800"
          : "#FFDA77"
      }`,
      boxShadow: `0.2em 0.2em 0.18em ${
        darkTheme
          ? contactSelected
            ? "#b20043"
            : "#e91e63"
          : contactSelected
          ? "#ff9800"
          : grey[600]
      }`,

      width: "80%",
      borderRadius: "0.3em",
      "& div": {
        color: `${darkTheme ? grey[100] : grey[100]}`,
        textOverflow: "ellipsis",
      },
    },
    nameUser: {
      margin: "7%",
      fontSize: "1.3em",
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      width: "42.2%",
    },
  }));
}
