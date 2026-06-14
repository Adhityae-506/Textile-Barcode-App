import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import axios from "axios";


const COLORS = [
  "#7EC3FF",
  "#FF8FB8",
  "#FFD54A",
  "#78E3D1",
  "#C792F7",
];

function StockPieChart() {

  const [data, setData] = useState([]);

  useEffect(() => {

    axios.get("http://127.0.0.1:8000/api/fabrics/stock_distribution/")
      .then((res) => {
        setData(res.data);
      });

  }, []);

  const total = data.reduce(
    (sum, item) => sum + item.value,
    0
  );


  return (
    <div className="flex items-center justify-between w-full h-full px-4">

      {/* Pie Chart */}
      <div className="w-[55%] h-[260px]">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              innerRadius={60}
              outerRadius={95}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="w-[45%] space-y-5">
        {data.map((item, index) => (
          <div
            key={item.name}
            className="
              flex
              items-center
              justify-between
            "
          >
            <div className="flex items-center gap-3">
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: COLORS[index % COLORS.length],
                }}
              />
              <span className="text-slate-700">
                {item.name}
              </span>
            </div>

            <span className="font-medium text-slate-700">
              {
                total > 0
                  ? (
                      (item.value / total) *
                      100
                    ).toFixed(1)
                  : 0
              }%
            </span>
          </div>
        ))}
      </div>

    </div>
  );
}

export default StockPieChart;