import { useEffect, useState } from "react";
import api from "../services/api";
import { Navigate, useNavigate } from "react-router-dom";

const DispatchRolls = () => {

  const [dispatchInfo, setDispatchInfo] = useState(null);
  const [barcode, setBarcode] = useState("");

  const [scannedRolls, setScannedRolls] = useState(() => {
    const saved = localStorage.getItem("dispatch_rolls");
    return saved ? JSON.parse(saved) : [];
  });

  const totalMeters = scannedRolls.reduce(
    (sum, roll) => sum + Number(roll.meters),
    0
  );

  const totalWeight = scannedRolls.reduce(
    (sum, roll) => sum + Number(roll.weight),
    0
);
  const navigate = useNavigate();


  // Load dispatch info and scanned rolls
  useEffect(() => {
    const dispatch = JSON.parse(
      localStorage.getItem("dispatch")
    );

    const rolls =
      JSON.parse(
        localStorage.getItem("dispatch_rolls")
      ) || [];

    setDispatchInfo(dispatch);
    setScannedRolls(rolls);

  }, []);

  // Save scanned rolls
  useEffect(() => {
    localStorage.setItem(
      "dispatch_rolls",
      JSON.stringify(scannedRolls)
    );
  }, [scannedRolls]);

  const handleScan = async () => {

    if (!barcode.trim()) return;

    if (!dispatchInfo) {
      alert("Dispatch information not found");
      return;
    }

    try {

      const res = await api.post(
        "dispatch/add_roll/",
        {
          barcode,
          fabric_type:
            dispatchInfo.fabric_type,
        }
      );

      const exists = scannedRolls.some(
        (roll) =>
          roll.barcode ===
          res.data.barcode
      );

      if (exists) {
        alert("Already scanned");
        return;
      }

      setScannedRolls([
        ...scannedRolls,
        res.data,
      ]);

      setBarcode("");

    } catch (err) {

      alert(
        err.response?.data?.error ||
        "Scan failed"
      );

    }
  };

  const removeRoll = (barcode) => {

    setScannedRolls(
      scannedRolls.filter(
        (roll) =>
          roll.barcode !== barcode
      )
    );
  };

  const finalizeDispatch = async () => {

    if (scannedRolls.length === 0) {
      alert("Scan at least one roll");
      return;
    }

    try {

      const res = await api.post(
        "dispatch/finalize/",
        {
          customer_name:
            dispatchInfo.customer_name,

          vehicle_no:
            dispatchInfo.vehicle_no,

          fabric_type:
            dispatchInfo.fabric_type,

          barcodes:
            scannedRolls.map(
              (roll) =>
                roll.barcode
            ),
        }
      );

      alert(
        `Dispatch Created : ${res.data.dispatch_no}`
      );

      localStorage.removeItem(
        "dispatch"
      );

      localStorage.removeItem(
        "dispatch_rolls"
      );

      setScannedRolls([]);

    } catch (err) {

      alert(
        err.response?.data?.error ||
        "Dispatch failed"
      );

    }
  };

  if (!dispatchInfo) {
    return (
      <div className="p-6">
        Loading Dispatch Details...
      </div>
    );
  }

  return (
    <div className="bg-slate-100 min-h-screen p-4 md:p-6">

      <div className="bg-white rounded-3xl shadow-md p-6">

        <h2 className="text-3xl font-bold text-blue-900 mb-8">
          Scan Dispatch Rolls
        </h2>

        {/* Stepper */}
        <div className="flex items-start justify-center mb-12">

          <div className="relative flex items-center">

            {/* Step 1 */}
            <div className="flex flex-col items-center z-10">
              <div className="w-10 h-10 rounded-full bg-slate-100  flex items-center justify-center font-bold">
                1
              </div>
              <span className="mt-3 text-sm text-slate-500">
                Dispatch Info
              </span>
            </div>

            <div className="w-96 h-[3px] bg-gradient-to-r from-slate-300 to-blue-800 mb-8"></div>

            {/* Step 2 */}
            <div className="flex flex-col items-center z-10">
              <div className="w-14 h-14 rounded-full  bg-blue-800 text-lg text-white text-slate-700 flex items-center justify-center font-bold">
                2
              </div>
              <span className="mt-3 text-sm  font-semibold">
                Dispatch Scan
              </span>
            </div>

            <div className="w-96 h-[3px] bg-gradient-to-r from-blue-800 to-slate-300 mb-8"></div>

            {/* Step 3 */}
            <div className="flex flex-col items-center z-10">
              <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold">
                3
              </div>
              <span className="mt-3 text-sm text-slate-500">
                Review & Confirm
              </span>
            </div>

          </div>

        </div>

        
        {/* Title */}
        <h2 className="text-2xl font-bold text-blue-900 mb-2">
          Fabric Details
        </h2>

        <div className="border-b border-dashed border-slate-300 mb-6"></div>
        
        
        {/* Dispatch Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">

          <div className="bg-slate-50 p-4 rounded-xl">
            <p className="text-slate-500 text-sm">
              Customer
            </p>

            <p className="font-semibold">
              {dispatchInfo.customer_name}
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl">
            <p className="text-slate-500 text-sm">
              Vehicle No
            </p>

            <p className="font-semibold">
              {dispatchInfo.vehicle_no}
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl">
            <p className="text-slate-500 text-sm">
              Fabric Type
            </p>

            <p className="font-semibold">
              {dispatchInfo.fabric_name}
            </p>
          </div>

        </div>

        {/* Barcode Input */}

        <div className="mb-8">

          <label className="block text-sm font-medium mb-2">
            Scan Barcode
          </label>

          <input
            type="text"
            placeholder="Scan barcode and press Enter"
            value={barcode}
            onChange={(e) =>
              setBarcode(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleScan();
              }
            }}
            className="
              w-full
              h-14
              px-4
              border
              border-slate-300
              rounded-xl
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          />

        </div>

        {/* Table */}

        <div className="overflow-x-auto">

          <table className="w-full border border-slate-200">

            <thead className="bg-blue-700 text-white">

              <tr>
                <th className="p-3 text-left">
                  Roll No
                </th>

                <th className="p-3 text-left">
                  Meters
                </th>

                <th className="p-3 text-left">
                  Weight
                </th>

                <th className="p-3 text-center">
                  Action
                </th>
              </tr>

            </thead>

            <tbody>

              {scannedRolls.map((roll) => (

                <tr
                  key={roll.barcode}
                  className="border-b hover:bg-slate-50"
                >

                  <td className="p-3">
                    {roll.roll_no}
                  </td>

                  <td className="p-3">
                    {roll.meters}
                  </td>

                  <td className="p-3">
                    {roll.weight}
                  </td>

                  <td className="p-3 text-center">

                    <button
                      onClick={() =>
                        removeRoll(
                          roll.barcode
                        )
                      }
                      className="
                        bg-red-500
                        text-white
                        px-4
                        py-1
                        rounded-lg
                        hover:bg-red-600
                      "
                    >
                      Remove
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {/* Footer */}

        <div className="flex justify-between items-center mt-8 border-t pt-4">

          <div className="text-lg font-semibold">
            Total Rolls :
            <span className="ml-2 text-blue-700">
              {scannedRolls.length}
            </span>
            <span className="ml-6">
              Total MTRS :
            </span>

            <span className="ml-2 text-blue-700">
              {totalMeters}
            </span>

            <span className="ml-6">
              Total KG :
            </span>

            <span className="ml-2 text-blue-700">
              {totalWeight}
            </span>
          </div>

          <button
            onClick={() => navigate("/dispatch/preview")}
            className="
              bg-green-600
              hover:bg-green-700
              text-white
              px-8
              py-3
              rounded-xl
              font-medium
            "
          >
            Preview dispatch
          </button>

        </div>

      </div>

    </div>
  );
};
export default DispatchRolls;