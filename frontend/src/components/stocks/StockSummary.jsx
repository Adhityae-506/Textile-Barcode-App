import { useState, useEffect } from "react";
import { Package, Shirt, ScanLine, Layers3 } from "lucide-react";
import StockCard from "./StockCard";
import api from "../../services/api";

const StockSummary = () => {


    const [stocks, setStocks] = useState([]);

    useEffect(() => {
        api
            .get("fabrics/stock_distribution/")
            .then((res) => {
                setStocks(res.data);
            });
    }, []);

    const totalStock = stocks.reduce(
        (sum, item) => sum + (item.value || 0),
        0
    );

    const NumberBadge = ({ index }) => (
        <div className="w-16 h-16 flex items-center text-3xl justify-center rounded-full bg-blue-800 text-white font-bold">
            {index + 1}
        </div>
    );

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

            {/*Total card */}
            <StockCard 
                title="Total Stock" 
                value={totalStock}
                icon={
                    <Package 
                        size={30}
                        className="w-16 h-16 text-blue-900"
                    />
                }
            />

            {/*Top three fabrics */}
            {stocks.slice(0, 3).map((item, index) => (
                <StockCard
                    key={item.name}
                    title={item.name}
                    value={item.value}
                    icon={<NumberBadge index={index} />}
                />
            ))}
        </div>
    );
}

export default StockSummary;