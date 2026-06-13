import { Printer, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
function BarcodeTable({
  data,
  onPrint,
  onDelete,
}) {

  const ITEMS_PER_PAGE = 5;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const endIndex = startIndex + ITEMS_PER_PAGE;

  const currentItems = data.slice(startIndex, endIndex);

  return (
    <div className="mt-10">

      <h2 className="text-xl font-bold mb-4">
        Generated Barcodes
      </h2>

      <div className="overflow-x-auto bg-white rounded-xl shadow">

        <table className="w-full">

          <thead>

            <tr className="bg-blue-900 text-white">git 

              <th className="p-4 text-left">
                Barcode
              </th>

              <th className="p-4 text-left">
                Fabric
              </th>

              <th className="p-4 text-left">
                Meters
              </th>

              <th className="p-4 text-left">
                Weight
              </th>

              <th className="p-4 text-center">
                Actions
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

            ) : (

              currentItems.map(item => (

                <tr
                  key={item.id}
                  className="border-b hover: bg-slate-50"
                >

                  <td className="p-4">
                    {item.barcode}
                  </td>

                  <td className="p-4">
                    {item.fabric_name}
                  </td>

                  <td className="p-4">
                    {item.meters}
                  </td>

                  <td className="p-4">
                    {item.weight}
                  </td>

                  <td className="p-4">

                    <div className="flex justify-center gap-4">

                      <button
                        onClick={() =>
                          onPrint(item)
                        }
                      >
                        <Printer
                          size={18}
                          className="text-blue-700"
                        />
                      </button>

                      <button
                        onClick={() =>
                          onDelete(item.id)
                        }
                      >
                        <Trash2
                          size={18}
                          className="text-red-600"
                        />
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

      {data.length > 0 && (

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
                <button disabled={currentPage===1} onClick={() => setCurrentPage(prev => prev - 1)}
                    className="w-10 h-10 border rounded-lg flex items-center justify-center disabled:opacity-40">
                    <ChevronLeft size={18} />
                </button>

                {Array.from(
                  { length: totalPages },
                  (_,index) => {

                    const page = index + 1;

                    return (
                      <button key={page} onClick={() => setCurrentPage(page)
                      }
                      className={`w-10 h-10 rounded-lg font-medium ${currentPage === page ? "bg-blue-700 text-white" : "border text-slate-700"}`}>
                        {page}
                      </button>
                    );
                  }
                )}

                <button
                  disabled={
                    currentPage === 
                    totalPages
                  }
                  onClick={() => setCurrentPage(
                    prev => prev + 1
                  )} 
                  className="w-10 h-10 border rounded-lg flex items-center justify-center disabled:opacity-40"
                  >
                    <ChevronRight size={18} />
                  
                </button>

            </div>
        </div>
      )}

    </div>
  );
}

export default BarcodeTable;