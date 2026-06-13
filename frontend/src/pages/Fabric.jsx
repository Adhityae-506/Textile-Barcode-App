import CreateFabric from "../components/fabric/CreateFabric";
import DashboardLayout from "./DashboardLayout";

const Barcode = () => {
  return (
    <div className="max-w-6xl min-h-screen bg-slate-100 p-8">
      <h1 className="text-3xl font-bold mb-6">
        Create new Fabric Type
      </h1>
      <DashboardLayout>
        <CreateFabric />
      </DashboardLayout>
      
    </div>
  );
}

export default Barcode;