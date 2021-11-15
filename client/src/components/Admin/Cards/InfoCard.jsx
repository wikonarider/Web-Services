import React from "react";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import PersonIcon from "@mui/icons-material/Person";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import Box from "@mui/material/Box";
import { styles } from "../AdminStyles";
import { useSelector } from "react-redux";

export default function InfoCard({ title, value, type }) {
  const darkGlobal = useSelector((state) => state.darkTheme);
  let darkLight = darkGlobal ? "dark" : "light";
  const icons = {
    services: <HomeRepairServiceIcon fontSize="large" />,
    users: <PersonIcon fontSize="large" />,
    currency: <MonetizationOnIcon fontSize="large" />,
  };
  return (
    <Box
      display="grid"
      gridTemplateColumns="1fr repeat(3, auto) repeat(8, 1fr)"
      gridTemplateRows="repeat(6,1fr)"
      sx={{
        minWidth: "200px",
        height: "min-content",
        m: "10px 10px",
      }}
    >
      <IconButton
        sx={{
          ...styles[darkLight].iconButton,
          zIndex: "1",
          gridColumn: "2/5",
          gridRow: "1/3",
        }}
        disableRipple
      >
        {icons[type]}
      </IconButton>

      <Box
        sx={{
          ...styles[darkLight].box,
          gridColumn: "1/13",
          gridRow: "2/6",
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          gridTemplateRows: "auto auto",
        }}
      >
        <Typography
          variant="body1"
          color="white"
          sx={{
            ...styles[darkLight].typography.secondary,
            gridColumn: "5/13",
            gridRow: "1/2",
          }}
          m="auto"
        >
          {title}
        </Typography>
        <Typography
          variant="h4"
          color="white"
          sx={{
            ...styles[darkLight].typography.primary,
            gridColumn: "2/12",
            gridRow: "2/3",
          }}
          m={0}
          p={0}
        >
          {value}
        </Typography>
      </Box>
    </Box>
  );
}
