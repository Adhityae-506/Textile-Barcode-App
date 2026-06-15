import { Printer } from "lucide-react";

function BarcodeActions({ onPrint }) {
  return (
    <div className="flex justify-center">
      <button
        onClick={onPrint}
        className="
          flex
          items-center
          gap-2
          bg-blue-900
          text-white
          px-6
          py-3
          rounded-xl
          hover:bg-blue-950
          transition
        "
      >
        <Printer size={18} />
        Print
      </button>
    </div>
  );
}

export default BarcodeActions;