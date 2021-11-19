import { makeStyles } from "@material-ui/core/styles";
import { green, grey, red, blueGrey ,amber} from "@mui/material/colors";

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
      border: `4.0px solid ${!statusUser ? red[400] : green[500]}`,
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
      border: `1px solid ${darkTheme ? "#ab003c" : "#fb8c00"}
`,
      background: `${
        darkTheme
          ? contactSelected
            ? "#d04081"
            : "#890b44"
          : contactSelected
          ? amber[400]
          : amber[200]
      }`,
      boxShadow: `0.2em 0.2em 0.7em ${
        darkTheme
          ? contactSelected
            ? "#d04081"
            : "#5f072f"
          : contactSelected
          ? amber[900]
          : amber[500]
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
