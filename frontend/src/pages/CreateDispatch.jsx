import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import axios from "axios";
import DashboardLayout from "./DashboardLayout";


function CreateDispatch() {

    const navigate = useNavigate();

    const [fabrics, setFabrics] = useState([]);
    const [customerName, setCustomerName] = useState("");
    const [vehicleNo, setVehicleNo] = useState("");

    const [search, setSearch] = useState("");
    const [selectedFabric, setSelectedFabric] = useState(null);
    const [showSuggestions, setShowSuggestions] = useState(false)

    const filteredFabrics = fabrics.filter(
        fabric =>
            fabric.type
                .toLowerCase()
                .startsWith(search.toLowerCase())
    );


    {/*If Dispatch deatils already in local storage restore*/}
    useEffect(() => {

        const saved = localStorage.getItem("dispatch");

        if (saved) {

            const dispatch = JSON.parse(saved);

            setCustomerName(dispatch.customer_name || "");
            setVehicleNo(dispatch.vehicle_no || "");
            setSelectedFabric(dispatch.fabric_type || "");

        }

    }, []);

    useEffect(() => {
        
        const fetchFabrics = async () => {
            try {
                const res = await axios.get("http://127.0.0.1:8000/api/fabrics/");
                console.log(res.data);
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
  <DashboardLayout>
    <div className="bg-slate-100 h-full p-4 md:p-6">

      <div className="bg-white rounded-3xl shadow-md p-8 h-full">

        <h2 className="text-3xl font-bold text-blue-700 mb-10">
          Create New Dispatch
        </h2>

        <div className="flex flex-col gap-10">

          {/* Vehicle Number */}

          <div className="flex items-center gap-6">

            <div
              className="
                w-16
                h-16
                rounded-xl
                bg-slate-100
                flex
                items-center
                justify-center
                text-3xl
              "
            >
              🚚
            </div>

            <div className="flex-1">
              <label className="text-sm text-slate-500">
                Vehicle Number
              </label>

              <input
                value={vehicleNo}
                onChange={(e) =>
                  setVehicleNo(e.target.value)
                }
                className="
                  w-full
                  h-14
                  mt-2
                  px-4
                  rounded-xl
                  border
                  border-slate-200
                  shadow-sm
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-500
                "
              />
            </div>

          </div>

          {/* Company Name */}

          <div className="flex items-center gap-6">

            <div
              className="
                w-16
                h-16
                rounded-xl
                bg-slate-100
                flex
                items-center
                justify-center
                text-3xl
              "
            >
              🏢
            </div>

            <div className="flex-1">
              <label className="text-sm text-slate-500">
                Company Name
              </label>

              <input
                value={customerName}
                onChange={(e) =>
                  setCustomerName(e.target.value)
                }
                className="
                  w-full
                  h-14
                  mt-2
                  px-4
                  rounded-xl
                  border
                  border-slate-200
                  shadow-sm
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-500
                "
              />
            </div>

          </div>

          {/* Fabric Selection */}

          <div className="flex items-start gap-6">

            <div
              className="
                w-16
                h-16
                rounded-xl
                bg-slate-100
                flex
                items-center
                justify-center
                text-3xl
              "
            >
              🧵
            </div>

            <div className="flex-1 relative">

              <label className="text-sm text-slate-500">
                Fabric Type
              </label>

              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setShowSuggestions(true);
                  setSelectedFabric(null);
                }}
                placeholder="Select Fabric Type"
                className="
                  w-full
                  h-14
                  mt-2
                  px-4
                  rounded-xl
                  border
                  border-slate-200
                  shadow-sm
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-500
                "
              />

              {showSuggestions &&
                search &&
                filteredFabrics.length > 0 && (

                  <div
                    className="
                      absolute
                      top-20
                      left-0
                      right-0
                      bg-white
                      border
                      rounded-xl
                      shadow-lg
                      max-h-60
                      overflow-y-auto
                      z-50
                    "
                  >

                    {filteredFabrics.map(
                      (fabric) => (

                        <div
                          key={fabric.id}
                          className="
                            p-3
                            cursor-pointer
                            hover:bg-slate-100
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

                      )
                    )}

                  </div>

                )}

            </div>

          </div>

        </div>

        {/* Footer */}

        <div
          className="
            border-t
            border-dashed
            mt-16
            pt-6
            flex
            justify-end
          "
        >

          <button
            onClick={handleContinue}
            className="
              bg-blue-700
              hover:bg-blue-800
              text-white
              px-10
              py-3
              rounded-xl
              font-medium
            "
          >
            Next
          </button>

        </div>

      </div>

    </div>
  </DashboardLayout>
);
}

export default CreateDispatch;