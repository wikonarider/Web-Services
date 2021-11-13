import { makeStyles } from "@material-ui/core/styles";
const useStylesConvertations = makeStyles({
  avatar: {
    width: "70px",
    height: "70px",
    border: "unset",
    background: "#dcebdd",
    textAlign: "start",
    alignItems: "flexEnd",
    display: "grid",
  },
  boxConvOnline: {
    height: "100%",
    cursor: "pointer",
    background: "rgba(35, 148, 15, 0.644)",
  },
  boxConvOffline: {
    height: "100%",
    cursor: "pointer",
    background: "rgba(126, 72, 18, 0.658)",
  },
});

export default useStylesConvertations;
