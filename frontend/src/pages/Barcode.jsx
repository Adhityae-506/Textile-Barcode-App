import BarcodeGenerator from "../components/barcode/BarcodeGenerator";

const Barcode = () => {
  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <h1 className="text-3xl font-bold mb-6">
        Barcode Generator
      </h1>

      <BarcodeGenerator />
    </div>
  );
}

export default Barcode;