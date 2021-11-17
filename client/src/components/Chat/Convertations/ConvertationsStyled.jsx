import { makeStyles } from "@material-ui/core/styles";
import { green, grey, red, blueGrey } from "@mui/material/colors";

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
      width: "76px",
      height: "76px",
      minHeight: "76px",
      minWidth: "76px",
      border: `4.0px solid ${!statusUser ? red[200] : green[800]}`,
    },
    avatarAndname: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      minWidth: "170px",
      cursor: "pointer",
    },
    boxConvInline: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      borderRadius: "0.3em",
 
      cursor: "pointer",
      width: "100%",
      transform: "scale(0.95,0.95)",
      background: `${
        darkTheme
          ? contactSelected
            ? "#c51162"
            : "#890b44"
          : contactSelected
          ? "#ff7043"
          : "#FFDA77"
      }`,
      boxShadow: `0.1em 0.1em 0.28em ${
        darkTheme
          ? contactSelected
            ? "#d04081"
            : "#5f0937"
          : contactSelected
          ? "#b24e2e"
          : grey[600]
      }`,

      "& div": {
        color: `${darkTheme ? grey[100] : blueGrey[700]}`,
        textOverflow: "ellipsis",
      },
    },
    nameUser: {
      margin: "7%",
      fontSize: "1.2em",
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      minWidth: "50px",
    },
  }));
}
