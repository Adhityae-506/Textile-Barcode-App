import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function CreateDispatch() {

    const navigate = useNavigate();

    const [fabrics, setFabrics] = useState([]);
    const [customerName, setCustomerName] = useState("");
    const [vehicleNo, setVehicleNo] = useState("");
    const [fabricType, setFabricType] = useState("");

    const [search, setSearch] = useState("");
    const [selectedFabric, setSelectedFabric] = useState(null);
    const [showSuggestions, setShowSuggestions] = useState(false)

    const filteredFabrics = fabrics.filter(
        fabric =>
            fabric.type
                .toLowerCase()
                .includes(search.toLowerCase())
    );


    {/*If Dispatch deatils already in local storage restore*/}
    useEffect(() => {

        const saved = localStorage.getItem("dispatch");

        if (saved) {

            const dispatch = JSON.parse(saved);

            setCustomerName(dispatch.customer_name || "");
            setVehicleNo(dispatch.vehicle_no || "");
            setFabricType(dispatch.fabric_type || "");

        }

    }, []);

    useEffect(() => {
        
        const fetchFabrics = async () => {
            try {
                const res = await axios.get("http://127.0.0.1:8000/api/fabrics/");
                setFabrics(res.data);
            }
            catch (err) {
                console.error(err);
            }
        };

        fetchFabrics();

    }, []);

    const handleContinue = () => {

        if (
            !customerName ||
            !vehicleNo ||
            !selectedFabric
        ) {

            alert("Fill all fields");

            return;
        }

        {/*Write dispatch details to local storage*/}
        localStorage.setItem(
            "dispatch",
            JSON.stringify({
                customer_name: customerName,
                vehicle_no: vehicleNo,
                fabric_type: selectedFabric.id
            })
        );

        localStorage.removeItem(
            "dispatch_rolls"
        );

        navigate("/dispatch/scan");
    };

    return (

        <div className="p-6">

            <h2 className="text-2xl mb-4">
                Create Dispatch
            </h2>

            <div className="space-y-4">

                <input
                    className="border p-2 w-full"
                    placeholder="Customer Name"
                    value={customerName}
                    onChange={(e) =>
                        setCustomerName(
                            e.target.value
                        )
                    }
                />

                <input
                    className="border p-2 w-full"
                    placeholder="Vehicle Number"
                    value={vehicleNo}
                    onChange={(e) =>
                        setVehicleNo(
                            e.target.value
                        )
                    }
                />

                <input
                    type="text"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setShowSuggestions(true);
                        setSelectedFabric(null);
                    }}
                    className="border p-2 w-full"
                    placeholder="Type fabric..."
                />


                 {
                    showSuggestions &&
                    search &&
                    filteredFabrics.length > 0 && (

                        <div
                            className="
                                absolute
                                bg-white
                                border
                                w-full
                                max-h-48
                                overflow-y-auto
                                z-10
                            "
                        >

                            {
                                filteredFabrics.map(fabric => (

                                    <div
                                        key={fabric.id}
                                        className="
                                            p-2
                                            cursor-pointer
                                            hover:bg-gray-100
                                        "
                                        onClick={() => {

                                            setSearch(
                                                fabric.type
                                            );

                                            setSelectedFabric(
                                                fabric
                                            );

                                            setShowSuggestions(
                                                false
                                            );

                                        }}
                                    >
                                        {fabric.type}
                                    </div>

                                ))
                            }

                        </div>

                    )
                }
                            

                <button
                    onClick={handleContinue}
                    className="
                        bg-blue-600
                        text-white
                        px-4
                        py-2
                        rounded
                    "
                >
                    Continue
                </button>

            </div>

        </div>
    );
}

export default CreateDispatch;