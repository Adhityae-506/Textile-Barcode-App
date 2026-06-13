import Navbar from "../components/layout/Navbar";
// import Sidebar from "../components/layout/Sidebar";
import DashboardLayout from "./DashboardLayout";

function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardLayout>
        <Navbar />
      </DashboardLayout>
      
    </div>
  );
}

export default Home;