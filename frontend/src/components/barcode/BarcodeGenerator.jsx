import { useRef, useState, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import axios from "axios";

import LabelledPreview from "./LabelledPreview";
import BarcodeActions from "./BarcodeActions";
import BarcodeTable from "./BarcodeTable";


function BarcodeGenerator() {

  const [previewData, setPreviewData] = useState(null);
  const [fabrics, setFabrics] = useState([]);
  const [fabric, setFabric] = useState("");
  const [search, setSearch] = useState("");
  const [selectedFabric, setSelectedFabric] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [meters, setMeters] = useState(0);
  const [weight, setWeight] = useState(0);
  const [machine, setMachine] = useState(0);

  const printRef = useRef();

  const filteredFabrics = fabrics.filter(
    fabric =>
      fabric.type
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  useEffect(() => {

    const fetchFabrics = async () => {

      try {

        const res = await axios.get(
          "http://127.0.0.1:8000/api/fabrics/"
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

      const res = await axios.post(
        "http://127.0.0.1:8000/api/barcode/",
        {
          fabric_type: fabric,
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

  // return (

  //   <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">

  //     {/* Form Card */}
  //     <div className="bg-white rounded-xl shadow p-8">
  //       <h2
  //         className="
  //           text-2xl
  //           font-bold
  //           mb-2
  //           text-blue-900
  //         "
  //       >
  //         Add New Barcode
  //       </h2>
  //       <p className="text-sm font-normal mb-4 text-blue-500">
  //         Fill in the details below to generated a new barcode.
  //       </p>

  //       <div
  //         className="
  //           grid
  //           grid-cols-1
  //           lg:grid-cols-5
  //           gap-5
  //           items-end
  //         "
  //       >

  //         <div className="flex flex-col gap-2">

  //           <label className="font-semibold">
  //             Fabric Type <span className="text-red-500">*</span>
  //           </label>

  //           <select
  //             value={fabric}
  //             onChange={(e) =>
  //               setFabric(
  //                 Number(
  //                   e.target.value
  //                 )
  //               )
  //             }
  //             className="
  //               border
  //               rounded-xl
  //               px-4
  //               py-3
  //             "
  //           >

  //             <option value="">
  //               Select Fabric
  //             </option>

  //             {fabrics.map(f => (

  //               <option
  //                 key={f.id}
  //                 value={f.id}
  //               >
  //                 {f.type}
  //               </option>

  //             ))}

  //           </select>

  //         </div>

  //         <div className="flex flex-col gap-2">

  //           <label className="font-semibold">
  //             Meters
  //           </label>

  //           <input
  //             type="number"
  //             placeholder="Meters"
  //             className="
  //               border
  //               rounded-xl
  //               px-4
  //               py-3
  //             "
  //             onChange={(e) =>
  //               setMeters(
  //                 Number(
  //                   e.target.value
  //                 )
  //               )
  //             }
  //           />

  //         </div>

  //         <div className="flex flex-col gap-2">

  //           <label className="font-semibold">
  //             Weight
  //           </label>

  //           <input
  //             type="number"
  //             placeholder="Weight"
  //             className="
  //               border
  //               rounded-xl
  //               px-4
  //               py-3
  //             "
  //             onChange={(e) =>
  //               setWeight(
  //                 Number(
  //                   e.target.value
  //                 )
  //               )
  //             }
  //           />

  //         </div>

  //         <div className="flex flex-col gap-2">

  //           <label className="font-semibold">
  //             Machine No
  //           </label>

  //           <input
  //             type="number"
  //             placeholder="Machine No"
  //             className="
  //               border
  //               rounded-xl
  //               px-4
  //               py-3
  //             "
  //             onChange={(e) =>
  //               setMachine(
  //                 Number(
  //                   e.target.value
  //                 )
  //               )
  //             }
  //           />

  //         </div>

  //       </div>

  //       <div
  //         className="
  //           flex
  //           justify-center
  //           mt-10
  //         "
  //       >
  //         <div>
  //           <button
  //             onClick={handleGenerate}
  //             className="
  //               w-full
  //             bg-blue-900
  //             text-white
  //               py-3
  //               rounded-xl
  //               hover:bg-blue-950
  //             "
  //           >
  //             Generate Barcode
  //           </button>
  //         </div>

  //       </div>

  //     </div>

  //     <div
  //       className="
  //       border-t
  //       border-dashed
  //     border-slate-300
  //       my-8
  //       "
  //     />

  //     {/* Preview Section */}

  //     <div
  //       className="
  //   flex
  //   flex-col
  //   lg:flex-row
  //   items-center
  //   gap-8
  // "
  //     >

  //       <div className="flex-1 w-full">

  //         <LabelledPreview
  //           ref={printRef}
  //           barcodeData={previewData}
  //         />

  //       </div>

  //       <div
  //         className="
  //         flex
  //         items-center
  //         justify-center
  //         min-w-[180px]
  //         "
  //       >

  //         {previewData && (

  //           <BarcodeActions
  //             onPrint={handlePrint}
  //           />

  //         )}

  //       </div>

  //     </div>
  //     <div
  //       className="
  //   border-t
  //   border-dashed
  //   border-slate-300
  //   my-8
  // "
  //     />

  //     {/* Generated Barcode Table */}

  //     <BarcodeTable
  //       onDelete={handleDelete}
  //       onPrint={handleTablePrint}
  //     />

  //   </div>

  // );
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

        <div>

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

          <div className="relative">

            <input
              type="text"
              value={search}
              placeholder="Type fabric..."
              className="
        w-full
        border
        rounded-xl
        px-4
        py-3
      "
              onChange={(e) => {

                setSearch(e.target.value);

                setShowSuggestions(true);

                setSelectedFabric(null);

                setFabric("");

              }}
            />

            {
              showSuggestions &&
              search &&
              filteredFabrics.length > 0 && (

                <div
                  className="
            absolute
            top-full
            left-0
            right-0
            bg-white
            border
            rounded-xl
            shadow-lg
            mt-1
            max-h-48
            overflow-y-auto
            z-50
          "
                >

                  {
                    filteredFabrics.map(item => (

                      <div
                        key={item.id}
                        className="
                  p-3
                  cursor-pointer
                  hover:bg-slate-100
                "
                        onClick={() => {

                          setSearch(item.type);

                          setSelectedFabric(item);

                          setFabric(item.id);

                          setShowSuggestions(false);

                        }}
                      >
                        {item.type}
                      </div>

                    ))
                  }

                </div>

              )
            }

          </div>

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
            placeholder="500"
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
            placeholder="Loom No"
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
      />

    </div>

  );

}

export default BarcodeGenerator;
