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


  const stockData = [
    { name: "Cotton", value: 4200 },
    { name: "Jute", value: 2800 },
    { name: "Polyester", value: 1800 },
    { name: "Cotton Gray", value: 1200 },
    { name: "Cotton Polyester", value: 900 },
  ];

const productionData = [
    { date: "17 Jun", meters: 1800 },
    { date: "18 Jun", meters: 2200 },
    { date: "19 Jun", meters: 2100 },
    { date: "20 Jun", meters: 2600 },
    { date: "21 Jun", meters: 2400 },
    { date: "22 Jun", meters: 2800 },
    { date: "23 Jun", meters: 3000 },
  ];

  const current = dispatches[currentIndex];

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-slate-100 p-4 md:p-6 flex flex-col gap-6">

        {/* Top Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          {/* Recent Dispatch Card */}
          <div className="bg-white rounded-3xl p-6 shadow-md">
            <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-6">
              Recent Dispatch
            </h2>

            <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

              {/* Details */}
              <div className="w-full lg:w-auto space-y-4">

                <div className="flex justify-between gap-4">
                  <span className="font-semibold min-w-[110px]">
                    Date
                  </span>
                  <span>{current.date}</span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="font-semibold min-w-[110px]">
                    Type
                  </span>
                  <span>{current.type}</span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="font-semibold min-w-[110px]">
                    Meters
                  </span>
                  <span>{current.meters}</span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="font-semibold min-w-[110px]">
                    Company
                  </span>
                  <span>{current.company}</span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="font-semibold min-w-[110px]">
                    DC Number
                  </span>
                  <span>{current.dcNumber}</span>
                </div>

                <button className="mt-4 px-5 py-2 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition">
                  View Details
                </button>
              </div>

              {/* Slider Controls */}
              <div className="flex flex-col items-center gap-5">

               

                <div className="flex gap-3">
                  <button
                    onClick={prevDispatch}
                    className="
                      w-10 h-10
                      rounded-full
                      bg-blue-700
                      text-white
                      hover:bg-blue-800
                      transition
                    "
                  >
                    ◀
                  </button>

                  <button
                    onClick={nextDispatch}
                    className="
                      w-10 h-10
                      rounded-full
                      bg-blue-700
                      text-white
                      hover:bg-blue-800
                      transition
                    "
                  >
                    ▶
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Stocks Card */}
          <div
            className="
              bg-white
              rounded-3xl
              p-6
              shadow-md
            "
          >
            <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-6">
              Stocks
            </h2>

            <div
              className="
                h-[220px]
                md:h-[260px]
                rounded-2xl
                bg-slate-50
                flex
                items-center
                justify-center
                text-slate-500
              "
            >
              <StockPieChart /> 
            </div>
          </div>
        </div>

        {/* Slider Dots */}
        <div className="flex justify-center gap-3">
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

        {/* Production Report */}
        <div
          className="
            bg-white
            rounded-3xl
            p-6
            shadow-md
          "
        >
          <div className="flex justify-between items-center mb-6">

            <h2 className="text-2xl font-bold text-slate-800">
              Production vs Remaining Stocks
            </h2>

            <select
              className="
                border
                rounded-lg
                px-4
                py-2
                text-sm
              "
            >
              <option>This Year</option>
              <option>Last Year</option>
            </select>

          </div>

          <ProductionBarChart />
        </div>

      </div>
    </DashboardLayout>
  );
}

export default Home;