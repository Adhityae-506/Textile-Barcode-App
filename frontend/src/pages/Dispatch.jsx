import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import DashboardLayout from "./DashboardLayout";
import axios from "axios";

function Dispatch() {
  const navigate = useNavigate();

  const [dispatches, setDispatches] = useState([]);

  const [currentPage, setCurrentPage] =
    useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  const [months, setMonths] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");

  {/*USed to obtain the available financial months for filtering in the Dispatch list */}
  useEffect(() => {

    axios
      .get(
        "http://127.0.0.1:8000/api/dispatch/available_months/"
      )
      .then((res) => {

        setMonths(res.data)

        if (res.data.length > 0) {

          setSelectedMonth(
            `${res.data[0].month}-${res.data[0].year}`
          );
        }

      });

  }, []);

  const [month, year] = selectedMonth.split("-");

  {/*Used to obtained filtered data using their month for dispatch list */}
  useEffect(() => {

    const fetchDispatches = async () => {

      try {

        const res = await axios.get(
          `http://127.0.0.1:8000/api/dispatch/by_month/?month=${month}&year=${year}&page=${currentPage}`
        );

        setDispatches(
          res.data.results
        );

        setTotalPages(
          Math.ceil(
            res.data.count / 10
          )
        );

      } catch (err) {

        console.error(err);

      }

    };

    fetchDispatches();

  }, [selectedMonth,, currentPage]);


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
              value={selectedMonth}
              onChange={(e) => {
                setSelectedMonth(e.target.value);
                setCurrentPage(1);
              }}
            >
              {months.map((month) => (
                <option
                  key={`${month.month}-${month.year}`}
                  value={`${month.month}-${month.year}`}
                >
                  {month.label}
                </option>

              ))}
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
                      {dispatch.dispatch_no}
                    </td>

                    <td className="p-4">
                      {dispatch.customer_name}
                    </td>

                    <td className="p-4">
                      {dispatch.vehicle_no}
                    </td>

                    <td className="p-4">
                      {new Date(
                        dispatch.dispatched_at
                      ).toLocaleDateString("en-GB")}
                    </td>

                    <td className="p-4 text-center">

                      <button
                      onClick={() =>
                        navigate(
                          `/dispatch/${dispatch.id}`
                        )
                      }
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
          <div className="flex justify-center items-center gap-4 mt-8 ">

            <button
              disabled={currentPage === 1}
              className="px-3 py-1 border border-2 border-sky-500 rounded-lg shadow-lg flex items-center justify-center disabled:opacity-40"
              onClick={() =>
                setCurrentPage(
                  prev => prev - 1
                )
              }
            >
              Prev
            </button>

            <span className="">
              Page {currentPage} of {totalPages}
            </span>

            <button
            className="px-3 py-1 border border-2 border-sky-500 rounded-lg shadow-lg flex items-center justify-center disabled:opacity-40"
              disabled={
                currentPage === totalPages
              }
              onClick={() =>
                setCurrentPage(
                  prev => prev + 1
                )
              }
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