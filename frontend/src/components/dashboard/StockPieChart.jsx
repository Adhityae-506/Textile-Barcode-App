import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import api from "../../services/api";


const COLORS = [
  "#7EC3FF",
  "#FF8FB8",
  "#FFD54A",
  "#78E3D1",
  "#C792F7",
  "#3ddb52"
];

function StockPieChart() {

  const [data, setData] = useState([]);

  useEffect(() => {

    api.get("fabrics/stock_distribution/")
      .then((res) => {
        setData(res.data);
      });

  }, []);

  const total = data.reduce(
    (sum, item) => sum + item.value,
    0
  );

  {/*If no fabric created data will be empty */}
  if (data.length === 0) {
    return (
      <div className="
        h-full
        flex
        items-center
        justify-center
        rounded-xl
        border
        border-dashed
        border-slate-300
        bg-slate-50
      ">
        <div className="text-center">
          <p className="text-5xl mb-3">📊</p>

          <p className="text-lg font-semibold text-slate-700">
            No Stock Available
          </p>

          <p className="text-sm text-slate-500 mt-1">
            Fabric stock distribution will appear here
          </p>
        </div>
      </div>
    );
  }

    {/*If fabrics are available but no stocks*/}
    if (total === 0) {
      return (
        <div className="
          h-full
          flex
          items-center
          justify-center
          rounded-xl
          border
          border-dashed
          border-slate-300
          bg-slate-50
        ">
          <div className="text-center">
            <p className="text-5xl mb-3">🧶</p>

            <p className="text-lg font-semibold text-slate-700">
              No Stock Available
            </p>

            <p className="text-sm text-slate-500 mt-1">
              All fabric stocks are currently zero
            </p>
          </div>
        </div>
      );
    }


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