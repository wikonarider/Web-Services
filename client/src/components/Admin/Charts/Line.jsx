import React from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";

export default function Chart(info, x, yDomain, date, title) {
  return (
    <Box
      sx={{
        backgroundColor: "#5c6bc0",
        width: "min-content",
      }}
    >
      <LineChart
        width={400}
        height={250}
        data={
          date.start || date.end
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
        <XAxis dataKey={x} stroke="#FFFFFF" />
        <YAxis
          interval="preserveEnd"
          domain={[0, Math.max(...info.map((i) => i[yDomain])) + 1]}
          stroke="#FFFFFF"
          margin={{ left: 0 }}
        />
        <Tooltip
          cursor={{ stroke: "red", strokeWidth: 2 }}
          content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              return (
                <Chip
                  color="success"
                  label={`${label} : ${payload[0].value}`}
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
          stroke="#FFFFFF"
          strokeWidth={3}
        />
      </LineChart>
    </Box>
  );
}
