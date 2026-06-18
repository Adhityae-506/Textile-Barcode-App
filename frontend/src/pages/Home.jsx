import DashboardLayout from "./DashboardLayout";
import StockPieChart from "../components/dashboard/StockPieChart";
import ProductionBarChart from "../components/dashboard/ProductionBarChart";
import DispatchCard from "../components/dashboard/DispatchCard"

function Home() {

  return (
    <DashboardLayout>
      <div className="bg-slate-100 h-[calc(100vh-80px)] px-4 pt-2 pb-4 flex flex-col gap-4">

        {/* Top Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">

          {/* Recent Dispatch */}
          <div className="bg-white rounded-3xl p-5 shadow-md">
            <DispatchCard />
          </div>

          {/* Stocks */}
          <div className="bg-white rounded-3xl p-5 shadow-md">

            <h2 className="text-2xl font-bold text-slate-800 mb-4">
              Stocks Overview
            </h2>

            <div className="h-[280px]">
              <StockPieChart />
            </div>

          </div>

        </div>

        {/* Production Chart */}

        <div className="bg-white rounded-3xl p-5 shadow-md flex-1">

          <div className="flex flex-col justify-between h-full ">
            
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 ">
                Running Production
              </h2>
              <span className="text-sm text-slate-500 mx-5 italic">Previous 30 days Production</span>
            </div>
            

            <div className="flex h-[440px] ">
              <ProductionBarChart />
            </div>

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}

export default Home;