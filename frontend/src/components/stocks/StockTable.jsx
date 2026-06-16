import { useState } from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const StockTable = () => {

  const dummyData = [
    {
      id: 1,
      type: "Cotton 40-40",
      stock: 2000,
      updated: "21/06/2028",
    },
    {
      id: 2,
      type: "Polyester 75D",
      stock: 1200,
      updated: "20/06/2028",
    },
    
  ];

  // const [data, setData] = useState([]);
  // const ITEMS_PER_PAGE = 3;
  // const [currentPage, setCurrentPage] = useState(1);
  // const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  // const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  // const endIndex = startIndex + ITEMS_PER_PAGE;
  // const currentItems = data.slice(startIndex, endIndex);

  return (
    <div
      className="
        bg-white
        rounded-2xl
        p-6
        shadow-sm
        border
        border-slate-100
      "
    >
      {/* Search */}

      <div className="mb-6 relative">

        <Search
          size={18}
          className="
            absolute
            left-4
            top-4
            text-slate-400
          "
        />

        <input
          placeholder="Search fabric..."
          className="
            border
            rounded-xl
            pl-12
            py-3
            w-full
            lg:w-[450px]
          "
        />

      </div>

      {/* Table */}

      <div className="overflow-hidden rounded-xl border">

        <table className="w-full">

          <thead>

            <tr
              className="
                bg-blue-900
                text-white
              "
            >
              <th className="p-4 text-left">
                Fabric Name
              </th>

              <th className="p-4 text-left">
                Meters
              </th>

              <th className="p-4 text-left">
                Last Updated
              </th>
            </tr>

          </thead>

          <tbody>

            {dummyData.map(item => (

              <tr
                key={item.id}
                className="border-b"
              >
                <td className="p-4">
                  {item.type}
                </td>

                <td className="p-4">
                  {item.stock}
                </td>

                <td className="p-4">
                  {item.updated}
                </td>
              </tr>

            ))}

          </tbody>

        </table>
        {/* {data.length > 0 && (

          <div className="flex items-center justify-between mt-6">
            <p className="text-slate-600">
              showing{" "}

              {startIndex + 1}

              {" "}to{" "}

              {Math.min(endIndex, data.length)}

              {" "}of{" "}

              {data.length}

              {" "} items
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={goPrevGroup}
                disabled={startPage === 1}
                className="
                w-10 h-10 
                border rounded-lg 
                flex items-center 
                justify-center 
                disabled:opacity-40
              "
              >
                <ChevronLeft size={18} />
              </button>

              {visiblePages.map((page) => (

                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-lg font-medium ${currentPage === page
                      ? "bg-blue-700 text-white"
                      : "border text-slate-700"
                    }`}
                >
                  {page}
                </button>


              ))}

              <button
                onClick={goNextGroup}
                disabled={endPage === totalPages}
                className="w-10 h-10 border rounded-lg flex items-center justify-center disabled:opacity-40"
              >
                <ChevronRight size={18} />
              </button>

            </div>
          </div>
        )} */}
      </div>

    </div>
  );
}

export default StockTable;