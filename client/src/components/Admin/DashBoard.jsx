import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
export default function Dashboard() {
  let [servicesInfo, setServicesInfo] = useState([]);

  useEffect(() => {
    axios(`/admin`).then((response) => {
      setServicesInfo(response.data);
    });
  }, []);

  return (
    <>
      <h1>Dashboard</h1>
      <LineChart
        width={730}
        height={250}
        data={servicesInfo}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis
          interval="preserveEnd"
          domain={[0, Math.max(...servicesInfo.map((i) => i.n_services)) + 1]}
        />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="n_services" stroke="#8884d8" />
      </LineChart>
    </>
  );
}
