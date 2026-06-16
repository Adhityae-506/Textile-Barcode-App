import StockSummary from "./StockSummary";
import StockTable from "./StockTable";

const StockPage = () => {

  return (
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
  );
}

export default StockPage;