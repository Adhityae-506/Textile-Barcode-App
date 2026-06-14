import { useState } from "react";

function DispatchCard() {
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
    <div className="flex-1 bg-white rounded-3xl p-5 md:p-6 shadow-md">
      <h2 className="text-2xl font-bold text-blue-700 mb-6">
        Recent Dispatch
      </h2>

      <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
        <div className="space-y-4">
          <p><strong>Date:</strong> {current.date}</p>
          <p><strong>Type:</strong> {current.type}</p>
          <p><strong>Meters:</strong> {current.meters}</p>
          <p><strong>Company:</strong> {current.company}</p>
          <p><strong>DC Number:</strong> {current.dcNumber}</p>

          <button className="px-5 py-2 bg-blue-700 text-white rounded-full">
            View Details
          </button>
        </div>

        <div className="flex gap-3">
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

      <div className="flex justify-center gap-3 mt-5">
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
  );
}

export default DispatchCard;