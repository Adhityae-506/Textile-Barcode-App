import CreateFabric from "../components/fabric/CreateFabric";
import DashboardLayout from "./DashboardLayout";

const Barcode = () => {
  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto min-h-screen bg-slate-100 p-8 flex flex-col items-center">
        <div className="flex justify-center">
          <h1 className="text-3xl font-bold mb-6">
          Create new Fabric Type
        </h1> 
        </div>

        <CreateFabric />
      </div>
    </DashboardLayout>
  );
}

export default Barcode;