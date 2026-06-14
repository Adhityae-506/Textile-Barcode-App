import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
} from "recharts";
import axios from "axios";
import { useState, useEffect } from "react";

export default function ProductionBarChart() {

  const [data,setData] = useState([]);

  useEffect(() => {

    axios.get("http://127.0.0.1:8000/api/dashboard/")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error(err);
      });

  }, []);

  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={data}>
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
        />

        <XAxis dataKey="fabric" />

        <YAxis  tickFormatter={(value) =>
          `${value.toLocaleString()}`
          }
        />

        <Tooltip />

        <Legend />

        {/* Blue Bottom */}
      <Bar
        dataKey="dispatched"
        stackId="a"
        fill="#3b82f6"
        name="Dispatched"
      >
        <LabelList
          dataKey="dispatched"
          position="center"
          fill="#ffffff"
          fontSize={12}
        />
      </Bar>

      <Bar
        dataKey="remaining"
        stackId="a"
        fill="#22c55e"
        name="Remaining Stock"
      >
        <LabelList
          dataKey="remaining"
          position="center"
          fill="#ffffff"
          fontSize={12}
        />
      </Bar>
            </BarChart>
          </ResponsiveContainer>
        );
      }