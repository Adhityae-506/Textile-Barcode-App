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

const data = [
  {
    fabric: "Cotton",
    dispatches: 200,
    remainingStock: 800,
  },
  {
    fabric: "Polyester",
    dispatches: 150,
    remainingStock: 750,
  },
  {
    fabric: "Linen",
    dispatches: 120,
    remainingStock: 680,
  },
  {
    fabric: "Silk",
    dispatches: 100,
    remainingStock: 600,
  },
  {
    fabric: "Denim",
    dispatches: 180,
    remainingStock: 550,
  },
  {
    fabric: "Rayon",
    dispatches: 140,
    remainingStock: 500,
  },
  {
    fabric: "Viscose",
    dispatches: 110,
    remainingStock: 450,
  },
  {
    fabric: "Canvas",
    dispatches: 90,
    remainingStock: 400,
  },
  {
    fabric: "Poplin",
    dispatches: 70,
    remainingStock: 350,
  },
  {
    fabric: "Twill",
    dispatches: 60,
    remainingStock: 300,
  },
];

export default function ProductionBarChart() {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={data}>
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
        />

        <XAxis dataKey="fabric" />

        <YAxis />

        <Tooltip />

        <Legend />

        {/* Blue Bottom */}
      <Bar
  dataKey="dispatches"
  stackId="a"
  fill="#3b82f6"
  name="Dispatches"
>
  <LabelList
    dataKey="dispatches"
    position="center"
    fill="#ffffff"
    fontSize={12}
  />
</Bar>

<Bar
  dataKey="remainingStock"
  stackId="a"
  fill="#22c55e"
  name="Remaining Stock"
>
  <LabelList
    dataKey="remainingStock"
    position="center"
    fill="#ffffff"
    fontSize={12}
  />
</Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}