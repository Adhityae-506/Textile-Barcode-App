import { useEffect, useState } from "react";
import axios from "axios";

const DispatchRolls = () => {

    const [dispatchInfo, setDispatchInfo] = useState(null);
    const [barcode, setBarcode] = useState("");
    const [scannedRolls, setScannedRolls] = useState(() => { {/*If 'scannedRolls' already in local storage directly set them*/}

    const saved = localStorage.getItem(
        "dispatch_rolls"
    );

    return saved ? JSON.parse(saved) : [];

});


    {/*Set 'dispatchInfo' and 'scannedRoll' from local storage*/}
    useEffect(() => {

        const dispatch =
            JSON.parse(
                localStorage.getItem(
                    "dispatch"
                )
            );

        const rolls =
            JSON.parse(
                localStorage.getItem(
                    "dispatch_rolls"
                )
            ) || [];

        setDispatchInfo(dispatch);

        setScannedRolls(rolls);

    }, []);


    {/* At each state render, the local storage 'scannedRoll' is updated */}
    useEffect(() => {

        localStorage.setItem(
            "dispatch_rolls",
            JSON.stringify(scannedRolls)
        );
    }, [scannedRolls]);

    const handleScan = async () => {

        try {

            const res = await axios.post(
                "http://127.0.0.1:8000/api/dispatch/add_roll/",
                {
                    barcode,
                    fabric_type:
                        dispatchInfo.fabric_type
                }
            );

            const exists =
                scannedRolls.some(
                    roll =>
                        roll.barcode ===
                        res.data.barcode
                );

            if (exists) {

                alert(
                    "Already scanned"
                );

                return;
            }

            setScannedRolls([
                ...scannedRolls,
                res.data
            ]);

            setBarcode("");

        }
        catch (err) {

            alert(
                err.response?.data?.error
            );

        }
    };

    const removeRoll = (barcode) => {

        setScannedRolls(
            scannedRolls.filter(
                roll =>
                    roll.barcode !== barcode
            )
        );
    };

    const finalizeDispatch = async () => {

        try {

            const res = await axios.post("http://127.0.0.1:8000/api/dispatch/finalize/",
                {
                    customer_name:
                        dispatchInfo.customer_name,

                    vehicle_no:
                        dispatchInfo.vehicle_no,

                    fabric_type:
                        dispatchInfo.fabric_type,

                    barcodes:
                        scannedRolls.map(
                            roll =>
                                roll.barcode
                        )
                }
            );

            alert(
                `Dispatch Created : ${res.data.dispatch_no}`
            );

            localStorage.removeItem(
                "dispatch"
            );

            localStorage.removeItem(
                "dispatch_rolls"
            );

            setScannedRolls([]);

        }
        catch (err) {

            alert(
                err.response?.data?.error
            );

        }
    };

    return (

        <div className="p-6">

            <h2 className="text-2xl mb-4">
                Scan Rolls
            </h2>

            <input
                className="border p-2 w-full"
                placeholder="Scan Barcode"
                value={barcode}
                onChange={(e) =>
                    setBarcode(
                        e.target.value
                    )
                }
                onKeyDown={(e) => {

                    if (
                        e.key === "Enter"
                    ) {

                        handleScan();

                    }

                }}
            />

            <table className="w-full mt-6 border">

                <thead>

                    <tr>

                        <th>Roll</th>
                        <th>Meters</th>
                        <th>Weight</th>
                        <th></th>

                    </tr>

                </thead>

                <tbody>

                    {
                        scannedRolls.map(
                            roll => (

                                <tr
                                    key={
                                        roll.barcode
                                    }
                                >

                                    <td>
                                        {
                                            roll.roll_no
                                        }
                                    </td>

                                    <td>
                                        {
                                            roll.meters
                                        }
                                    </td>

                                    <td>
                                        {
                                            roll.weight
                                        }
                                    </td>

                                    <td>

                                        <button
                                            onClick={() =>
                                                removeRoll(
                                                    roll.barcode
                                                )
                                            }
                                        >
                                            Remove
                                        </button>

                                    </td>

                                </tr>

                            )
                        )
                    }

                </tbody>

            </table>

            <div className="mt-4">

                <strong>
                    Total Rolls :
                </strong>

                {" "}

                {scannedRolls.length}

            </div>

            <button
                onClick={finalizeDispatch}
                className="
                    mt-4
                    bg-green-600
                    text-white
                    px-4
                    py-2
                    rounded
                "
            >
                Dispatch
            </button>

        </div>
    );
}

export default DispatchRolls;