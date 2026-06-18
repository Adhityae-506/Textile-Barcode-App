import { useEffect, useState } from "react";
import api from "../../services/api";

function EditBarcodeModal({ open, barcode, onClose, onUpdated }) {

  const [meters, setMeters] = useState("");
  const [weight, setWeight] = useState("");
  const [machineNo, setMachineNo] = useState("");

  useEffect(() => {

    if (barcode) {
      setMeters(barcode.meters);
      setWeight(barcode.weight);
      setMachineNo(barcode.machine_no);
    }

  }, [barcode]);

  const handleSave = async () => {

    try {

      const res = await api.patch(
        `barcode/${barcode.id}/`,
        {
          meters,
          weight,
          machine_no: machineNo
        }
      );

      onUpdated(res.data);
      onClose();

    }
    catch (err) {

      alert("Update failed");

    }

  };

  if (!open) return null;

  return (

    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

      <div className="bg-white p-8 rounded-xl w-[400px]">

        <h2 className="text-xl font-bold mb-5">
          Edit Barcode
        </h2>
        
        <div>
            <div>Meters</div>
            <input
                className="w-full border p-3 mb-4"
                value={meters}
                onChange={(e)=>setMeters(e.target.value)}
                placeholder="Meters"
            />
        </div>
        
        <div>
            <div>Weight</div>
            <input
                className="w-full border p-3 mb-4"
                value={weight}
                onChange={(e)=>setWeight(e.target.value)}
                placeholder="Weight"
            />
        </div>
        
        <div>
            <div>Machine No</div>
            <input
                className="w-full border p-3 mb-5"
                value={machineNo}
                onChange={(e)=>setMachineNo(e.target.value)}
                placeholder="Machine Number"
            />
        </div>
        

        <div className="flex gap-3">

          <button
            onClick={handleSave}
            className="bg-blue-900 text-white px-5 py-2 rounded"
          >
            Save
          </button>

          <button
            onClick={onClose}
            className="border px-5 py-2 rounded"
          >
            Cancel
          </button>

        </div>

      </div>

    </div>
  );

}

export default EditBarcodeModal;