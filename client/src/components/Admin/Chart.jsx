import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

export default function Chart(info, x, yDomain, date) {
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
        <Tooltip />
        <Legend
          content={<Typography variant="h6">New services</Typography>}
          verticalAlign="top"
        />

        <Line
          type="monotone"
          dataKey="n_services"
          stroke="#FFFFFF"
          strokeWidth={3}
        />
      </LineChart>
    </Box>
  );
}
