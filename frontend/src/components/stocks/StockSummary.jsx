import { Package, Shirt, ScanLine, Layers3 } from "lucide-react";
import StockCard from "./StockCard";

const StockSummary = () => {

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            <StockCard 
                title="Total Stock" 
                value="8450" 
                icon={
                    <Package 
                        size={30}
                        className="text-blue-900"
                    />
                }
            />

            <StockCard 
                title="cotton"
                value="4250"
                icon={
                    <Shirt
                        size={30}
                        className="text-blue-900"
                    />
                }
            />

            <StockCard 
                title="Polyester"
                value="2150"
                icon={
                    <ScanLine
                        size={30}
                        className="text-blue-900"
                    />
                }
            />

            <StockCard 
                title="Silk"
                value="1250"
                icon={
                    <Layers3
                        size={30}
                        className="text-blue-900"
                    />
                }
            />
        </div>
    );
}

export default StockSummary;