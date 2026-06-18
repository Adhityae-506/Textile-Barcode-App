const StockCard = ({
    title, value, icon,
}) => {

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <p className="text-blue-900 font-medium">
                {title}
                <span className="font-normal">
                    {" "} (Meters)
                </span>
            </p>
            <div className="flex gap-5 mt-5">
                <div className="w-24 h-24 rounded-full flex justify-center">
                    {icon}
                </div>

                <div>
                    <h2 className="text-5xl font-bold text-blue-950">
                        {value}
                    </h2>

                    <p className="text-slate-500 mt-1">
                        Meters
                    </p>
                </div>
            </div>
        </div>
    );
}

export default StockCard;