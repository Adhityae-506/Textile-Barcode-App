import { useState, useEffect } from "react";
import axios from "axios";


const DispatchCard = () => {

  const [dispatches, setDispatches] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/dispatch/recent_dispatch/")
      .then((res) => {
        setDispatches(res.data);
      });
  }, []);

  const current = dispatches[currentIndex];
  const icon = [
      {
        emoji: "🧵",
        bg: "bg-blue-50",
        border: "border-blue-200",
      },
      {
        emoji: "✨",
        bg: "bg-green-50",
        border: "border-green-200",
      },
      {
        emoji: "🌾",
        bg: "bg-yellow-50",
        border: "border-yellow-200",
      },
      {
        emoji: "👑",
        bg: "bg-pink-50",
        border: "border-pink-200",
      },
      {
        emoji: "👖",
        bg: "bg-indigo-50",
        border: "border-indigo-200",
      },
    ];



    return (

      <>
        <div className="flex justify-between items-center mb-5">

          <h2 className="text-2xl font-bold text-slate-800">
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
                  {new Date(
                        current?.dispatched_at
                      ).toLocaleDateString("en-GB")}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium text-slate-500">
                  Company
                </span>

                <span className="font-semibold">
                  {current?.customer_name}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium text-slate-500">
                  Fabric
                </span>

                <span className="font-semibold">
                  {current?.fabric_name}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium text-slate-500">
                  Meters
                </span>

                <span className="font-semibold text-green-600">
                  {current?.total_meters}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium text-slate-500">
                  DC Number
                </span>

                <span className="font-semibold">
                  {current?.dispatch_no}
                </span>
              </div>

            </div>
            
            {/* Fabric Icon */}

            <div className="ml-10 p-10 flex flex-col items-center bg-amber-100 rounded-xl ">

              <div className="text-8xl">
                {icon[currentIndex].emoji}
              </div>

              <div className="mt-3 text-center">

                <p className="font-bold text-lg">
                  {current?.fabric_name}
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
    </>
    )
}
export default DispatchCard;