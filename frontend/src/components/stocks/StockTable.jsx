import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const StockTable = () => {

  const [data,setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    axios
      .get(
        "http://127.0.0.1:8000/api/fabrics/"
      )
      .then((res) => {

        setData(res.data)

      });

  }, []);

  {/*Number of records in one page */}
  const ITEMS_PER_PAGE = 7;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = data.slice(startIndex, endIndex);

  {/*Visible page slider*/}
  const MAX_VISIBLE_PAGES = 3;

  const currentGroup = Math.floor(
    (currentPage - 1) / MAX_VISIBLE_PAGES
  );
  const startPage =
    currentGroup * MAX_VISIBLE_PAGES + 1;
  const endPage = Math.min(
    startPage + MAX_VISIBLE_PAGES - 1,
    totalPages
  );
  const visiblePages = [];

  for (
    let page = startPage;
    page <= endPage;
    page++
  ) {
    visiblePages.push(page);
  }


  {/*Next buttonn click in page slider*/}
  const goNextGroup = () => {
  const nextPage = startPage + MAX_VISIBLE_PAGES;

    if (nextPage <= totalPages) {
      setCurrentPage(nextPage);
    }
  };

  const goPrevGroup = () => {
    const prevPage = startPage - MAX_VISIBLE_PAGES;

    if (prevPage >= 1) {
      setCurrentPage(prevPage);
    }
  };


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
      <div className="flex items-center justify-between">
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

        <button
          onClick = {() => navigate("/fabric")}
          className="
              bg-blue-700
              text-white
              px-6 py-3
              rounded-xl
              hover:bg-blue-800
              transition
          "
        >
          + Create Fabric
        </button>

      </div>

      {/* Table */}

      <div className="overflow-hidden rounded-xl">

        <table className="w-full border">

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

             {data.length === 0 ? (

              <tr>

                <td
                  colSpan="5"
                  className="
                    text-center
                    py-10
                    text-slate-500
                  "
                >
                  No barcodes generated yet
                </td>

              </tr>

            ) : (currentItems.map(item => (

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

            ))
          )}

          </tbody>

        </table>
         {data.length > 0 && (

          <div className="flex items-center justify-between mt-6 px-5 pb-3">
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
        )} 
      </div>

    </div>
  );
}

export default StockTable;