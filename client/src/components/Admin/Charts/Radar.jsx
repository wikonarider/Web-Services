import React from 'react';
import Chip from '@mui/material/Chip';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
  Legend,
} from 'recharts';

import Box from '@mui/material/Box';

export default function Chart(data, categoryKey, valueKey, name) {
  return (
    <Box
      sx={{
        backgroundColor: 'whiteSmoke',
      }}
    >
      <RadarChart width={730} height={250} data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey={categoryKey} />
        <PolarRadiusAxis
          angle={30}
          domain={[
            0,
            data ? Math.max(...data.map((d) => d[valueKey])) + 1 : 'dataMax',
          ]}
          tick={false}
        />
        <Radar
          name={name}
          dataKey={valueKey}
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.6}
        />
        <Tooltip
          cursor={{ stroke: 'red', strokeWidth: 2 }}
          content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              return <Chip color="success" label={`${payload[0].value}`} />;
            }

            return null;
          }}
        />
        <Legend />
      </RadarChart>
    </Box>
  );
}
