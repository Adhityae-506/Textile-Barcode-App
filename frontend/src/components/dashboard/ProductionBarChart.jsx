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
import api from "../../services/api";
import { useState, useEffect } from "react";

export default function ProductionBarChart() {

  const [data,setData] = useState([]);
  const hasData = data.some(
    item =>
      item.dispatched > 0 ||
      item.remaining > 0
  );

  {/*Mobile screen will show ony 5 fabrics */}
  const isMobile = window.innerWidth < 768;
  const chartData = isMobile
    ? data.slice(0, 5)
    : data;
  const truncateFabric = (name) => {
    if (window.innerWidth < 768) {
      return name.length > 12
        ? `${name.substring(0, 12)}...`
        : name;
    }
    return name;
  };

  
  useEffect(() => {

    api.get("dashboard/")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error(err);
      });

  }, []);

  if (!hasData) {
    return (
      <div
        className="
          h-[320px]
          flex
          items-center
          justify-center
          rounded-xl
          border
          border-dashed
          border-slate-300
          bg-slate-50
        "
      >
        <div className="text-center">
          <p className="text-5xl mb-3">🏭</p>

          <p className="text-lg font-semibold text-slate-700">
            No Production Data
          </p>

          <p className="text-sm text-slate-500 mt-1">
            Production statistics will appear here
          </p>
        </div>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData} 
        margin={{
          top: 20,
          right: 20,
          left: 10,
          bottom: 40,
        }}
        barCategoryGap="30%"
      >
        
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
        />

        <XAxis 
          dataKey="fabric"
          interval={0}
          height={isMobile ? 70 : 50}
          angle={isMobile ? -35 : 0}
          textAnchor={isMobile ? "end" : "middle"}
          tick={{
            fontSize: isMobile ? 9 : 16
          }}
          tickFormatter={truncateFabric}
         />

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