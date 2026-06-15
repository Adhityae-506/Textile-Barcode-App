import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import DashboardLayout from "./DashboardLayout";
import StockPieChart from "../components/dashboard/StockPieChart";
import ProductionBarChart from "../components/dashboard/ProductionBarChart";

function Home() {
  
  const dispatches = [
    {
      date: "21/06/2026",
      type: "Cotton",
      meters: "1500",
      company: "XYZ Textiles",
      dcNumber: "DC001",
      emoji: "🧵",
      bg: "bg-blue-50",
      border: "border-blue-200",
    },
    {
      date: "22/06/2026",
      type: "Polyester",
      meters: "2000",
      company: "ABC Fabrics",
      dcNumber: "DC002",
      emoji: "✨",
      bg: "bg-green-50",
      border: "border-green-200",
    },
    {
      date: "23/06/2026",
      type: "Jute",
      meters: "1800",
      company: "PQR Mills",
      dcNumber: "DC003",
      emoji: "🌾",
      bg: "bg-yellow-50",
      border: "border-yellow-200",
    },
    {
      date: "24/06/2026",
      type: "Silk",
      meters: "2500",
      company: "LMN Silks",
      dcNumber: "DC004",
      emoji: "👑",
      bg: "bg-pink-50",
      border: "border-pink-200",
    },
    {
      date: "25/06/2026",
      type: "Denim",
      meters: "2200",
      company: "DEF Denim",
      dcNumber: "DC005",
      emoji: "👖",
      bg: "bg-indigo-50",
      border: "border-indigo-200",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <DashboardLayout>
      <div className="bg-slate-100 h-[calc(100vh-80px)] px-4 pt-2 pb-4 flex flex-col gap-4">

        {/* Top Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">

          {/* Recent Dispatch */}
          <div className="bg-white rounded-3xl p-5 shadow-md">

            <div className="flex justify-between items-center mb-5">

              <h2 className="text-2xl font-bold text-blue-700">
                Recent Dispatch
              </h2>

              <span className="text-sm text-slate-500">
                Auto Updated
              </span>

            </div>

            <div className="relative overflow-hidden h-[280px]">

              <div className="flex items-center">

                {/* Details */}

                <div className="flex-1 flex-col space-y-4">

                  <div className="flex justify-between">
                    <span className="font-medium text-slate-500">
                      Date
                    </span>

                    <span className="font-semibold">
                      {dispatches[currentIndex].date}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="font-medium text-slate-500">
                      Company
                    </span>

                    <span className="font-semibold">
                      {dispatches[currentIndex].company}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="font-medium text-slate-500">
                      Fabric
                    </span>

                    <span className="font-semibold">
                      {dispatches[currentIndex].type}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="font-medium text-slate-500">
                      Meters
                    </span>

                    <span className="font-semibold text-green-600">
                      {dispatches[currentIndex].meters}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="font-medium text-slate-500">
                      DC Number
                    </span>

                    <span className="font-semibold">
                      {dispatches[currentIndex].dcNumber}
                    </span>
                  </div>

                </div>
                
                {/* Fabric Icon */}

                <div className="ml-10 p-10 flex flex-col items-center bg-amber-100 rounded-xl ">

                  <div className="text-8xl">
                    {dispatches[currentIndex].emoji}
                  </div>

                  <div className="mt-3 text-center">

                    <p className="font-bold text-lg">
                      {dispatches[currentIndex].type}
                    </p>

                    <p className="text-sm text-slate-500">
                      Fabric Type
                    </p>

                  </div>

                </div>

              </div>

            </div>

            {/* Dots */}

            <div className="flex justify-center gap-2 mt-4">

              {dispatches.map((_, index) => (
                <div
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`transition-all duration-300 rounded-full ${
                    currentIndex === index
                      ? "w-8 h-3 bg-blue-700"
                      : "w-3 h-3 bg-slate-300"
                  }`}
                />
              ))}

            </div>

          </div>

          {/* Stocks */}

          <div className="bg-white rounded-3xl p-5 shadow-md">

            <h2 className="text-2xl font-bold text-blue-700 mb-4">
              Stocks Overview
            </h2>

            <div className="h-[280px]">
              <StockPieChart />
            </div>

          </div>

        </div>

        {/* Production Chart */}

        <div className="bg-white rounded-3xl p-5 shadow-md flex-1 overflow-hidden">

          <div className="flex flex-col h-full">

            <h2 className="text-2xl font-bold text-slate-800 mb-4">
              Running Production
            </h2>

            <div className="flex-1">
              <ProductionBarChart />
            </div>

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}

export default Home;