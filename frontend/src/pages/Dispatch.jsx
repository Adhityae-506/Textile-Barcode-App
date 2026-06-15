import { useNavigate } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";

function Dispatch() {
  const navigate = useNavigate();

  const dispatches = [
    {
      dispatchNo: "DC001",
      customer: "ABC Textiles",
      vehicle: "TN38AB1234",
      date: "21/06/2026",
      status: "Done",
    },
    {
      dispatchNo: "DC002",
      customer: "XYZ Fabrics",
      vehicle: "TN39CD5678",
      date: "22/06/2026",
      status: "Done",
    },
    {
      dispatchNo: "DC003",
      customer: "PQR Mills",
      vehicle: "TN40EF9999",
      date: "23/06/2026",
      status: "Pending",
    },
    {
      dispatchNo: "DC004",
      customer: "LMN Exports",
      vehicle: "TN41GH2222",
      date: "24/06/2026",
      status: "Done",
    },
    {
      dispatchNo: "DC005",
      customer: "Sakthi Textiles",
      vehicle: "TN55AB6789",
      date: "25/06/2026",
      status: "Done",
    },
  ];

  return (
    <DashboardLayout>
      <div className="bg-slate-100 min-h-screen p-6">

        <div className="bg-white rounded-3xl shadow-md p-8">

          {/* Header */}
          <div className="flex justify-between items-center mb-8">

            <h1 className="text-3xl font-bold text-blue-700">
              Dispatch List
            </h1>

            <button
              onClick={() => navigate("/dispatch-list")}
              className="
                bg-blue-700
                text-white
                px-6
                py-3
                rounded-xl
                hover:bg-blue-800
                transition
              "
            >
              + Create Dispatch
            </button>

          </div>

          {/* Month Filter */}
          <div className="mb-6">

            <select
              className="
                w-64
                border
                border-slate-300
                rounded-xl
                px-4
                py-3
                bg-white
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            >
              <option>June 2026</option>
              <option>May 2026</option>
              <option>April 2026</option>
              <option>March 2026</option>
              <option>February 2026</option>
              <option>January 2026</option>
            </select>

          </div>

          {/* Table */}
          <div className="rounded-2xl border border-slate-200 overflow-hidden">

            <table className="w-full">

              <thead>

                <tr className="bg-slate-100">

                  <th className="p-4 text-left font-semibold">
                    Dispatch No
                  </th>

                  <th className="p-4 text-left font-semibold">
                    Customer Name
                  </th>

                  <th className="p-4 text-left font-semibold">
                    Vehicle No
                  </th>

                  <th className="p-4 text-left font-semibold">
                    Date
                  </th>

                  <th className="p-4 text-left font-semibold">
                    Status
                  </th>

                  <th className="p-4 text-center font-semibold">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {dispatches.map((dispatch) => (

                  <tr
                    key={dispatch.dispatchNo}
                    className="
                      border-b
                      last:border-b-0
                      hover:bg-slate-50
                    "
                  >

                    <td className="p-4">
                      {dispatch.dispatchNo}
                    </td>

                    <td className="p-4">
                      {dispatch.customer}
                    </td>

                    <td className="p-4">
                      {dispatch.vehicle}
                    </td>

                    <td className="p-4">
                      {dispatch.date}
                    </td>

                    <td className="p-4">

                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          dispatch.status === "Done"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {dispatch.status}
                      </span>

                    </td>

                    <td className="p-4 text-center">

                      <button
                        className="
                          bg-blue-700
                          text-white
                          px-4
                          py-2
                          rounded-lg
                          hover:bg-blue-800
                          transition
                        "
                      >
                        View
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-2 mt-8">

            <button
              className="
                px-4
                py-2
                border
                rounded-lg
                hover:bg-slate-100
              "
            >
              Prev
            </button>

            <button
              className="
                px-4
                py-2
                rounded-lg
                bg-blue-700
                text-white
              "
            >
              1
            </button>

            <button
              className="
                px-4
                py-2
                border
                rounded-lg
                hover:bg-slate-100
              "
            >
              2
            </button>

            <button
              className="
                px-4
                py-2
                border
                rounded-lg
                hover:bg-slate-100
              "
            >
              3
            </button>

            <button
              className="
                px-4
                py-2
                border
                rounded-lg
                hover:bg-slate-100
              "
            >
              Next
            </button>

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}

export default Dispatch;