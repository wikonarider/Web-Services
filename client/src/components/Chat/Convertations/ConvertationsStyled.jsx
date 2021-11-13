import { makeStyles } from "@material-ui/core/styles";

export default function useStylesConvertations(darkTheme) {
  //darkTheme boolean global state
  return makeStyles((theme) => ({
    avatar: {
      width: 76,
      height: 76,
    },
    boxConvOnline: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      height: "100px",
      cursor: "pointer",
      background: "#81c784",
      width: "80%",
      zIndex: "70%",
      borderRadius: "0.4em",
    },
    boxConvOffline: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      height: "100px",
      cursor: "pointer",
      width: "80%",
      borderRadius: "0.4em",
      zIndex: "70%",
      background: "#9e9e9e",
    },
  }));
}
