import DashbordLayout from "../../src/pages/DashboardLayout";
import StockSummary from "../components/stocks/StockSummary";
import StockTable from "../components/stocks/StockTable";

const Stocks = () => {
    return (
        <DashbordLayout>
            <div className="space-y-8">

            <div className="flex justify-between">

                <h1
                    className="
                        text-4xl
                        font-bold
                        text-blue-950
                        self-end
                    "
                    >
                    Stocks Overview
                </h1>

                <div className="flex flex-col">
                    <h1
                        className="
                        text-2xl
                        font-bold
                        text-blue-950
                        "
                    >
                        New Fabric Creation
                    </h1>

                    <button
                        onClick = {() => navigate("/fabric")}
                        className="
                            bg-blue-700
                            text-white
                            px-6 py-3
                            rounded-xl
                            hover:bg-blue-800
                            transition
                        "
                        >
                        + Create Fabric
                    </button>
                </div>
                

            </div>
            

            

            <StockSummary />

            <StockTable />

            </div>
        </DashbordLayout>
    );
}

export default Stocks;
