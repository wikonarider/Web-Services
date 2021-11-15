import React from "react";
import Chip from "@mui/material/Chip";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
  Legend,
} from "recharts";
import { styles } from "../AdminStyles";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import Typography from "@mui/material/Typography";

export default function Chart({ data, categoryKey, valueKey, name }) {
  data =
    Array.isArray(data) &&
    data.map((d) => ({ ...d, groupName: d.groupName.split("-")[0] }));
  const darkGlobal = useSelector((state) => state.darkTheme);
  let darkLight = darkGlobal ? "dark" : "light";

  return (
    <Box sx={{ ...styles[darkLight].box, m: "10px 10px" }}>
      <RadarChart width={400} height={250} data={data}>
        <PolarGrid />
        <PolarAngleAxis
          dataKey={categoryKey}
          stroke={darkGlobal ? "rgb(251, 187, 217)" : "rgb(110, 117, 120)"}
        />
        <PolarRadiusAxis
          angle={30}
          domain={[
            0,
            data ? Math.max(...data.map((d) => d[valueKey])) + 1 : "dataMax",
          ]}
          tick={false}
        />
        <Radar
          name={name}
          dataKey={valueKey}
          stroke={darkGlobal ? "rgb(255, 0, 96)" : "rgb(205, 220, 57)"}
          fill={darkGlobal ? "rgb(255, 0, 96)" : "rgb(205, 220, 57)"}
          fillOpacity={0.8}
        />
        <Tooltip
          cursor={styles[darkGlobal ? "dark" : "light"].tooltip.cursor}
          content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              return (
                <Chip
                  sx={styles[darkLight].tooltip.chip}
                  label={`${payload[0].value}`}
                />
              );
            }

            return null;
          }}
        />
        <Legend
          content={() => (
            <Typography variant="h6" sx={{ mb: "50px" }}>
              {name}
            </Typography>
          )}
          verticalAlign="top"
        />
      </RadarChart>
    </Box>
  );
}
