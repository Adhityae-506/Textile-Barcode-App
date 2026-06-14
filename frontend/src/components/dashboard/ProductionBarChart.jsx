import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  {
    month: "January",
    production: 400,
    stock: 400,
  },
  {
    month: "February",
    production: 800,
    stock: 380,
  },
  {
    month: "March",
    production: 200,
    stock: 170,
  },
  {
    month: "April",
    production: 450,
    stock: 180,
  },
  {
    month: "May",
    production: 250,
    stock: 950,
  },
  {
    month: "June",
    production: 350,
    stock: 750,
  },
  {
    month: "July",
    production: 170,
    stock: 20,
  },
];

export default function ProductionBarChart() {
  return (
    <ResponsiveContainer
      width="100%"
      height={350}
    >
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 20,
          left: 0,
          bottom: 10,
        }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
        />

        <XAxis dataKey="month" />

        <YAxis />

        <Tooltip />

        <Legend
          verticalAlign="top"
          height={50}
        />

        <Bar
          dataKey="production"
          name="Total Production"
          fill="#3b82f6"
          radius={[4, 4, 0, 0]}
        />

        <Bar
          dataKey="stock"
          name="Remaining Stocks"
          fill="#22c55e"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}