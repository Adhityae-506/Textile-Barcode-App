import { useRef, useState, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import LabelledPreview from "./LabelledPreview";
import PrintLabels from "./LabelledPreview";
import axios from "axios";

function BarcodeGenerator() {

  const [previewData, setPreviewData] = useState(null);
  const [fabrics, setFabrics] = useState([]);


  const [fabric, setFabric] = useState("");
  const [meters, setMeters] = useState(0);
  const [weight, setWeight] = useState(0);
  const [machine, setMachine] = useState(0);
  
  const [labels, setLabels] = useState([]);
  const printRef = useRef();


  useEffect(() => {

    const fetchFabrics = async () => {

        try {

          const res = await axios.get("http://127.0.0.1:8000/api/fabrics/");
          console.log(res.data);
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



  const handlePrint = async() => {

    try{
      const res = await axios.get("http://127.0.0.1:8000/api/barcode/6/preview/")
    }
    catch (err) {

    }
  }

  const handleGenerate = async() => {
    
    try{

        const res = await axios.post("http://127.0.0.1:8000/api/barcode/", {
          fabric_type: fabric,
          machine_no: machine,
          meters: meters,
          weight: weight
        })
        
        setPreviewData(res.data);

    }
    catch (err) {
        alert(err.response?.data?.message || "Barcode creation failed");
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white px-6 py-8 rounded shadow">
        <div className="grid md:grid-cols-2 gap-15">
          
          <div className="flex flex-col gap-2">
            <div className="text-md font-bold">Fabric</div>
            <select
                value={fabric}
                onChange={(e) => setFabric(Number(e.target.value))}
                className="border px-2 py-2 rounded-xl"
            >
                <option value="">Select Fabric</option>

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
              <div className="text-md font-bold">Meters</div>
              <input
                placeholder="Meters"
                className="border p-2 rounded-xl"
                onChange={(e) => setMeters(Number(e.target.value))}
              />
          </div>
          
          <div className="flex flex-col gap-2">
            <div className="text-md font-bold">Weight</div>
              <input
                placeholder="Weight"
                className="border p-2 rounded-xl"
                onChange={(e) => setWeight(Number(e.target.value))}
              />
          </div>
          
          <div className="flex flex-col gap-2">
              <div className="text-md font-bold">Machine No</div>
              <input
                placeholder="Machine No"
                className="border p-2 rounded-xl"
                onChange={(e) => setMachine(Number(e.target.value))}
              />

          </div>
          
        </div>

        <div className="flex justify-center gap-3 mt-15">
          <button
            onClick={handleGenerate}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl"
          >
            Generate
          </button>

          <button
            onClick={handlePrint}
            className="bg-green-600 text-white px-6 py-2 rounded-xl"
          >
            Print
          </button>
        </div>
      </div>
      
      <div className="w-full flex justify-center">
          <LabelledPreview 
            barcodeData={previewData}
          />
      </div>

    </div>
  );
}

export default BarcodeGenerator;