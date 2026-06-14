import { useState } from "react";
import DashboardLayout from "./DashboardLayout";
import StockPieChart from "../components/dashboard/StockPieChart";
import ProductionBarChart from "../components/dashboard/ProductionBarChart";

function Home() {
  const dispatches = [
    {
      date: "21/06/2026",
      type: "50+50",
      meters: "1500",
      company: "XYZ",
      dcNumber: "012354685",
    },
    {
      date: "22/06/2026",
      type: "60+40",
      meters: "2000",
      company: "ABC",
      dcNumber: "012354686",
    },
    {
      date: "23/06/2026",
      type: "40+40",
      meters: "1800",
      company: "PQR",
      dcNumber: "012354687",
    },
    {
      date: "24/06/2026",
      type: "80+20",
      meters: "2500",
      company: "LMN",
      dcNumber: "012354688",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const current = dispatches[currentIndex];

  const nextDispatch = () => {
    setCurrentIndex((prev) =>
      prev === dispatches.length - 1 ? 0 : prev + 1
    );
  };

  const prevDispatch = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? dispatches.length - 1 : prev - 1
    );
  };

  return (
    <DashboardLayout>
      <div className="bg-slate-100 h-[calc(100vh-80px)] px-4 pt-1 pb-4 overflow-hidden flex flex-col gap-3">

        {/* Top Cards */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">

          {/* Recent Dispatch */}
          <div className="bg-white rounded-3xl p-4 shadow-md">
            <h2 className="text-2xl font-bold text-blue-700 mb-4">
              Recent Dispatch
            </h2>

            <div className="flex flex-col lg:flex-row justify-between items-center gap-4">

              <div className="w-full space-y-3">

                <div className="flex justify-between">
                  <span className="font-semibold">Date</span>
                  <span>{current.date}</span>
                </div>

                <div className="flex justify-between">
                  <span className="font-semibold">Type</span>
                  <span>{current.type}</span>
                </div>

                <div className="flex justify-between">
                  <span className="font-semibold">Meters</span>
                  <span>{current.meters}</span>
                </div>

                <div className="flex justify-between">
                  <span className="font-semibold">Company</span>
                  <span>{current.company}</span>
                </div>

                <div className="flex justify-between">
                  <span className="font-semibold">DC Number</span>
                  <span>{current.dcNumber}</span>
                </div>

                <button className="mt-2 px-5 py-2 bg-blue-700 text-white rounded-full hover:bg-blue-800">
                  View Details
                </button>
              </div>

              <div className="flex flex-col items-center gap-4">

                <div className="text-6xl">📦</div>

                <div className="flex gap-2">
                  <button
                    onClick={prevDispatch}
                    className="w-10 h-10 rounded-full bg-blue-700 text-white"
                  >
                    ◀
                  </button>

                  <button
                    onClick={nextDispatch}
                    className="w-10 h-10 rounded-full bg-blue-700 text-white"
                  >
                    ▶
                  </button>
                </div>

              </div>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-3">
              {dispatches.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    currentIndex === index
                      ? "bg-black"
                      : "bg-slate-300"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Stocks */}
          <div className="bg-white rounded-3xl p-4 shadow-md">
            <h2 className="text-2xl font-bold text-blue-700 mb-4">
              Stocks
            </h2>

            <div className="h-[200px]">
              <StockPieChart />
            </div>
          </div>

        </div>

        {/* Production Report */}
        <div className="bg-white rounded-3xl p-4 shadow-md flex-1 overflow-hidden">

          <div className="flex flex-col md:flex-row justify-between items-center gap-3 mb-4">

            <h2 className="text-xl md:text-2xl font-bold text-slate-800">
              Production vs Remaining Stocks
            </h2>

            

          </div>

          <div className="h-[220px]">
            <ProductionBarChart />
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}

export default Home;