import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Cotton", value: 40 },
  { name: "Polyester", value: 20 },
  { name: "Silk", value: 15 },
  { name: "Blended", value: 15 },
  { name: "Others", value: 10 },
];

const COLORS = [
  "#7EC3FF",
  "#FF8FB8",
  "#FFD54A",
  "#78E3D1",
  "#C792F7",
];

function StockPieChart() {
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
                  fill={COLORS[index]}
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
                  backgroundColor: COLORS[index],
                }}
              />
              <span className="text-slate-700">
                {item.name}
              </span>
            </div>

            <span className="font-medium text-slate-700">
              {item.value}%
            </span>
          </div>
        ))}
      </div>

    </div>
  );
}

export default StockPieChart;