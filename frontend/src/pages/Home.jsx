import Navbar from "../components/layout/Navbar";
import DashboardLayout from "./DashboardLayout";

function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardLayout>
        {/* <Navbar /> */}
      </DashboardLayout>
      
    </div>
  );
}

export default Home;