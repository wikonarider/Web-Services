import { makeStyles } from "@material-ui/core/styles";

export default function useStylesBougth(darkTheme) {
  //darkTheme boolean global state
  return makeStyles((theme) => ({
    avatar: {
      width: "70px",
      height: "70px",
      border: "unset",
      background: "#e8f5e9",
      textAlign: "start",
      alignItems: "flexEnd",
      display: "grid",
    },
    boxBoughtOnline: {
      height: "86%",
      display: "flex",
      padding: "2%",
      cursor: "pointer2",
      margin: "2%",
      background: "rgba(50, 133, 36, 0.644)",
    },
    boxBoughtOffline: {
      height: "86%",
      display: "flex",
      padding: "2%",
      cursor: "pointer",
      margin: "2%",
      background: "rgba(170, 141, 112, 0.658)",
    },
  }));
}
