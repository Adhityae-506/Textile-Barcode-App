import { Printer, PrinterCheck } from "lucide-react";

function BarcodeActions({
  onPrint,
  onLabelPrint
}) {
  return (
    <div className="flex flex-col gap-3">

      <button
        onClick={onPrint}
        className="
          flex items-center justify-center gap-2
          bg-blue-900 text-white
          px-6 py-3 rounded-xl
        "
      >
        <Printer size={18} />
        Preview Print
      </button>

      <button
        onClick={onLabelPrint}
        className="
          flex items-center justify-center gap-2
          bg-green-700 text-white
          px-6 py-3 rounded-xl
        "
      >
        <PrinterCheck size={18} />
        Print Label
      </button>

    </div>
  );
}

export default BarcodeActions;