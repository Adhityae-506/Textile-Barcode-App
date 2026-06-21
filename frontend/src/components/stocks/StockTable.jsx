import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import {
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const StockTable = () => {

  const [data,setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    api
      .get(
        "fabrics/"
      )
      .then((res) => {

        setData(res.data)

      });

  }, []);

  const [search, setSearch] = useState("");
  const filteredData = data.filter((fabric) =>
    fabric.type
      .toLowerCase()
      .startsWith(search.toLowerCase())
  );

  {/*Number of records in one page */}
  const ITEMS_PER_PAGE = 7;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = filteredData.slice(startIndex, endIndex);

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
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
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
                No of Rolls
              </th>

              <th className="p-4 text-center">
                View
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
                  No Fabric generated yet
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

                <td className="px-10 p-4">
                  {item.total_rolls}
                </td>

                <td className="p-4 text-center">

                  <button
                    onClick={() =>
                      navigate(`/fabric-rolls/${item.id}`)
                    }
                    className="
                      bg-blue-600
                      text-white
                      px-3
                      py-1
                      rounded
                      hover:bg-blue-700
                    "
                  >
                    View
                  </button>

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

              {Math.min(endIndex, filteredData.length)}

              {" "}of{" "}

              {filteredData.length}

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