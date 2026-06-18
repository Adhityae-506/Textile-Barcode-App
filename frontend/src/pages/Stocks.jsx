import DashbordLayout from "../../src/pages/DashboardLayout";
import StockSummary from "../components/stocks/StockSummary";
import StockTable from "../components/stocks/StockTable";

const Stocks = () => {
    return (
        <DashbordLayout>
            <div className="space-y-8">

            <h1
                className="
                text-4xl
                font-bold
                text-blue-950
                "
            >
                Stocks Overview
            </h1>

            <StockSummary />

            <StockTable />

            </div>
        </DashbordLayout>
    );
}

export default Stocks;
