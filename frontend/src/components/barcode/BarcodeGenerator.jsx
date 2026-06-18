import { useRef, useState, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import api from "../../services/api";

import LabelledPreview from "./LabelledPreview";
import BarcodeActions from "./BarcodeActions";
import BarcodeTable from "./BarcodeTable";
import EditBarcode from "./EditBarcode";


function BarcodeGenerator() {

  const [previewData, setPreviewData] = useState(null);
  const [fabrics, setFabrics] = useState([]);
  const [meters, setMeters] = useState(0);
  const [weight, setWeight] = useState(0);
  const [machine, setMachine] = useState(0);

  {/*Type in to search for type of fabric implementation */}
  const [search, setSearch] = useState("");
  const [selectedFabric, setSelectedFabric] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false)

  {/*Edit barcode*/}
  const [editOpen,setEditOpen] = useState(false);
  const [editingBarcode,setEditingBarcode] = useState(null);

  const filteredFabrics = fabrics.filter(
      fabric =>
          fabric.type
              .toLowerCase()
              .startsWith(search.toLowerCase())
  );

  const printRef = useRef();

  useEffect(() => {

    const fetchFabrics = async () => {

      try {

        const res = await api.get(
          "fabrics/"
        );

        setFabrics(res.data);

      } catch (err) {

        console.error(
          "Failed to load fabrics",
          err
        );

      }

    };

    fetchFabrics();

  }, []);

  const handleGenerate = async () => {

    try {

      const res = await api.post(
        "barcode/",
        {
          fabric_type: selectedFabric.id,
          machine_no: machine,
          meters: meters,
          weight: weight
        }
      );

      setPreviewData(res.data);

    } catch (err) {

      alert(
        err.response?.data?.message ||
        "Barcode creation failed"
      );

    }

  };

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: "Barcode Label",
  });

  const handleDelete = (id) => {

    setGeneratedBarcodes(prev =>
      prev.filter(item =>
        item.id !== id
      )
    );

  };

  const handleTablePrint = (
    barcode
  ) => {

    setPreviewData(barcode);

    setTimeout(() => {

      handlePrint();

    }, 200);

  };

  const handleEdit = (barcode) => {

    setEditingBarcode(barcode);
    setEditOpen(true);

  };

  const handleUpdated = (updatedBarcode) => {

    setPreviewData(updatedBarcode);
  };

  return (

    <div
      className="
      bg-white
      rounded-2xl
      shadow-sm
      border
      border-slate-200
      p-8
    "
    >

      {/* Header */}

      <h2
        className="
        text-3xl
        font-bold
        text-blue-950
        mb-8
      "
      >
        Generate Barcode
      </h2>

      {/* Top Form Row */}

      <div
        className="
        grid
        grid-cols-1
        lg:grid-cols-5
        gap-5
        items-end
      "
      >
        {/* Fabric */}

        <div className="relative">

          <label
            className="
              block
              text-sm
              text-slate-700
              mb-2
            "
          >
            Select Fabric
            <span className="text-red-500">
              {" "}*
            </span>
          </label>

          <input
            type="text"
            value={search}
            onChange={(e) => {
                setSearch(e.target.value);
                setShowSuggestions(true);
                setSelectedFabric(null);
            }}
            className="
              w-full
              border
              rounded-xl
              px-4
              py-3
            "
            placeholder="Type fabric..."
        />

        {
          showSuggestions &&
          search &&
          filteredFabrics.length > 0 && (

            <div
              className="
                  absolute
                  left-0
                  top-full
                  mt-1
                  w-full
                  bg-white
                  border
                  rounded-xl
                  shadow-lg
                  max-h-48
                  overflow-y-auto
                  z-50
              "
            >

              {
                filteredFabrics.map(fabric => (

                  <div
                      key={fabric.id}
                      className="
                          p-2
                          cursor-pointer
                          hover:bg-gray-100
                      "
                      onClick={() => {

                          setSearch(
                              fabric.type
                          );

                          setSelectedFabric(
                              fabric
                          );

                          setShowSuggestions(
                              false
                          );

                      }}
                  >
                      {fabric.type}
                  </div>

                ))
              }

            </div>

          )
        }

        </div>

        {/* Meters */}

        <div>

          <label
            className="
            block
            text-sm
            text-slate-700
            mb-2
          "
          >
            Quantity (Meters)
            <span className="text-red-500">
              {" "}*
            </span>
          </label>

          <input
            type="number"
            placeholder="Mtrs"
            className="
            w-full
            border
            rounded-xl
            px-4
            py-3
          "
            onChange={(e) =>
              setMeters(Number(e.target.value))
            }
          />

        </div>

        {/* Weight */}

        <div>

          <label
            className="
            block
            text-sm
            text-slate-700
            mb-2
          "
          >
            Weight (Kg)
            <span className="text-red-500">
              {" "}*
            </span>
          </label>

          <input
            type="number"
            placeholder="Weight"
            className="
            w-full
            border
            rounded-xl
            px-4
            py-3
          "
            onChange={(e) =>
              setWeight(Number(e.target.value))
            }
          />

        </div>

        {/* Machine */}

        <div>

          <label
            className="
            block
            text-sm
            text-slate-700
            mb-2
          "
          >
            Loom Number
            <span className="text-red-500">
              {" "}*
            </span>
          </label>

          <input
            type="number"
            placeholder="Machine No"
            className="
            w-full
            border
            rounded-xl
            px-4
            py-3
          "
            onChange={(e) =>
              setMachine(Number(e.target.value))
            }
          />

        </div>

        {/* Button */}

        <button
          onClick={handleGenerate}
          className="
          bg-blue-900
          text-white
          rounded-xl
          py-3
          font-semibold
          hover:bg-blue-950
        "
        >
          Generate Barcode
        </button>

      </div>

      {/* Divider */}

      <div
        className="
        border-t
        border-dashed
        border-slate-300
        my-8
      "
      />

      {/* Preview Section */}

      <div
        className="
        flex
        flex-col
        lg:flex-row
        gap-8
        items-start
      "
      >

        <div className="flex-1">

          <LabelledPreview
            ref={printRef}
            barcodeData={previewData}
          />

        </div>

        {previewData && (

          <div className="w-[180px]">

            <BarcodeActions
              onPrint={handlePrint}
            />

          </div>

        )}

      </div>

      {/* Divider */}

      <div
        className="
        border-t
        border-dashed
        border-slate-300
        my-8
      "
      />

      {/* Table */}

      <BarcodeTable
        onDelete={handleDelete}
        onPrint={handleTablePrint}
        onEdit={handleEdit}
      />


      <EditBarcode
        open={editOpen}
        barcode={editingBarcode}
        onClose={() => setEditOpen(false)}
        onUpdated={handleUpdated}
      />

    </div>

  );

}

export default BarcodeGenerator;
