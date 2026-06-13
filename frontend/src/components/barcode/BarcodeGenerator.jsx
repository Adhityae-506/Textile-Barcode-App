import { useRef, useState, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import axios from "axios";

import LabelledPreview from "./LabelledPreview";
import BarcodeActions from "./BarcodeActions";
import BarcodeTable from "./BarcodeTable";


function BarcodeGenerator() {

  const [previewData, setPreviewData] = useState(null);
  const [generatedBarcodes, setGeneratedBarcodes] = useState([]);
  const [fabrics, setFabrics] = useState([]);
  const [fabric, setFabric] = useState("");
  const [meters, setMeters] = useState(0);
  const [weight, setWeight] = useState(0);
  const [machine, setMachine] = useState(0);

  const printRef = useRef();

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

      setGeneratedBarcodes(prev => [
        res.data,
        ...prev
      ]);

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

  return (

    <div className="space-y-8">

      {/* Form Card */}
      <div className="bg-white rounded-xl shadow p-8">
        <h2
          className="
            text-2xl
            font-bold
            mb-2
            text-blue-900
          "
        >
          Add New Barcode
        </h2>
        <p className="text-sm font-normal mb-4 text-blue-500">
          Fill in the details below to generated a new barcode.
        </p>

        <div
          className="
            grid
            md:grid-cols-2
            gap-8
          "
        >

          <div className="flex flex-col gap-2">

            <label className="font-semibold">
              Fabric Type <span className="text-red-500">*</span>
            </label>

            <select
              value={fabric}
              onChange={(e) =>
                setFabric(
                  Number(
                    e.target.value
                  )
                )
              }
              className="
                border
                rounded-xl
                px-4
                py-3
              "
            >

              <option value="">
                Select Fabric
              </option>

              {fabrics.map(f => (

                <option
                  key={f.id}
                  value={f.id}
                >
                  {f.type}
                </option>

              ))}

            </select>

          </div>

          <div className="flex flex-col gap-2">

            <label className="font-semibold">
              Meters
            </label>

            <input
              type="number"
              placeholder="Meters"
              className="
                border
                rounded-xl
                px-4
                py-3
              "
              onChange={(e) =>
                setMeters(
                  Number(
                    e.target.value
                  )
                )
              }
            />

          </div>

          <div className="flex flex-col gap-2">

            <label className="font-semibold">
              Weight
            </label>

            <input
              type="number"
              placeholder="Weight"
              className="
                border
                rounded-xl
                px-4
                py-3
              "
              onChange={(e) =>
                setWeight(
                  Number(
                    e.target.value
                  )
                )
              }
            />

          </div>

          <div className="flex flex-col gap-2">

            <label className="font-semibold">
              Machine No
            </label>

            <input
              type="number"
              placeholder="Machine No"
              className="
                border
                rounded-xl
                px-4
                py-3
              "
              onChange={(e) =>
                setMachine(
                  Number(
                    e.target.value
                  )
                )
              }
            />

          </div>

        </div>

        <div
          className="
            flex
            justify-center
            mt-10
          "
        >

          <button
            onClick={handleGenerate}
            className="
              bg-blue-900
              text-white
              px-10
              py-3
              rounded-xl
              hover:bg-blue-950
            "
          >
            Generate Barcode
          </button>

        </div>

      </div>

      {/* Preview Section */}

      <div>

        <h2
          className="
            text-xl
            font-bold
            mb-4
          "
        >
          Barcode Preview
        </h2>

        <LabelledPreview
          ref={printRef}
          barcodeData={previewData}
        />

        {previewData && (

          <BarcodeActions
            onPrint={handlePrint}
          />

        )}

      </div>

      {/* Generated Barcode Table */}

      <BarcodeTable
        data={generatedBarcodes}
        onDelete={handleDelete}
        onPrint={handleTablePrint}
      />

    </div>

  );

}

export default BarcodeGenerator;

