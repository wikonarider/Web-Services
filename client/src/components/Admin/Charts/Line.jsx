import React from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { useSelector } from "react-redux";
import { styles } from "../AdminStyles";

export default function Chart({ info, x, yDomain, date, title }) {
  const darkGlobal = useSelector((state) => state.darkTheme);

  let darkLight = darkGlobal ? "dark" : "light";
  console.log(title, info);
  return (
    <Box
      sx={{
        ...styles[darkLight].box,
        width: "min-content",
        m: "10px 10px",
      }}
    >
      <LineChart
        width={400}
        height={250}
        data={
          date && (date.start || date.end)
            ? info.filter((i) => {
                let monthMs = new Date(i.year).getTime();
                let startMonth = new Date(date.start).getTime();
                let endMont = new Date(date.end).getTime();
                return monthMs >= startMonth && monthMs <= endMont;
              })
            : info
        }
        margin={{ top: 5, right: 50, left: 0, bottom: 5 }}
      >
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis
          dataKey={x}
          stroke={darkGlobal ? "rgb(251, 187, 217)" : "rgb(110, 117, 120)"}
        />
        <YAxis
          interval="preserveEnd"
          domain={[
            0,
            info.length > 0
              ? Math.max(...info.map((i) => i[yDomain])) + 1
              : "dataMax",
          ]}
          stroke={darkGlobal ? "rgb(251, 187, 217)" : "rgb(110, 117, 120)"}
          margin={{ left: 0 }}
        />
        <Tooltip
          cursor={styles[darkGlobal ? "dark" : "light"].tooltip.cursor}
          content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              return (
                <Chip
                  sx={styles[darkLight].tooltip.chip}
                  label={`${label} : ${payload[0].value} ${title}`}
                />
              );
            }

            return null;
          }}
        />
        <Legend
          content={() => <Typography variant="h6">{title}</Typography>}
          verticalAlign="top"
        />

        <Line
          type="monotone"
          dataKey={yDomain}
          stroke={darkGlobal ? "rgb(255, 0, 96)" : "rgb(205, 220, 57)"}
          strokeWidth={3}
        />
      </LineChart>
    </Box>
  );
}
