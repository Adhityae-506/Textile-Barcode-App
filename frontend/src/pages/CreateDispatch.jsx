import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function CreateDispatch() {

    const navigate = useNavigate();

    const [fabrics, setFabrics] = useState([]);

    const [customerName, setCustomerName] = useState("");

    const [vehicleNo, setVehicleNo] = useState("");

    const [fabricType, setFabricType] = useState("");

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
            !fabricType
        ) {

            alert("Fill all fields");

            return;
        }

        localStorage.setItem(
            "dispatch",
            JSON.stringify({
                customer_name: customerName,
                vehicle_no: vehicleNo,
                fabric_type: Number(fabricType)
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

                <select
                    className="border p-2 w-full"
                    value={fabricType}
                    onChange={(e) =>
                        setFabricType(
                            e.target.value
                        )
                    }
                >

                    <option value="">
                        Select Fabric
                    </option>

                    {
                        fabrics.map(fabric => (

                            <option
                                key={fabric.id}
                                value={fabric.id}
                            >
                                {fabric.type}
                            </option>

                        ))
                    }

                </select>

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