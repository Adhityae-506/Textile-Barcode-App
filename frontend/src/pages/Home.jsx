import DashboardLayout from "./DashboardLayout";
import StockPieChart from "../components/dashboard/StockPieChart";
import ProductionBarChart from "../components/dashboard/ProductionBarChart";
import DispatchCard from "../components/dashboard/DispatchCard"

function Home() {

  return (
    <DashboardLayout>
      <div className="bg-slate-100 min-h-[calc(100vh-80px)] px-2 sm:px-3 md:px-4 py-3 flex flex-col gap-10 md:gap-8 lg:gap-4">

        {/* Top Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 md:gap-8 lg:gap-4">

          {/* Recent Dispatch */}
          <div className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-5 shadow-md">
            <DispatchCard />
          </div>

          {/* Stocks */}
          <div className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-5 shadow-md">

            <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-4">
              Stocks Overview
            </h2>

            <div className="h-[360px] lg:h-[280px]">
              <StockPieChart />
            </div>

          </div>

        </div>

        {/* Production Chart */}

        <div className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-5 shadow-md">

          <div className="flex flex-col">
            
            <div className="mb-4 md:mb-8">
              <h2 className="text-xl md:text-2xl font-bold text-slate-800 ">
                Running Production
              </h2>
              <span className=" text-xs md:text-sm text-slate-500 mx-5 italic">Previous 30 days Production</span>
            </div>
            

            <div className="flex h-[300px] md:h-[450px] ">
              <ProductionBarChart />
            </div>

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}

export default Home;