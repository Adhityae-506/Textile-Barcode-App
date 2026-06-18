import api from "../../services/api";
import { useState } from "react";


const CreateFabric = () => {

    const [fabric,setFabric] = useState("");
    const [stock,setStock] = useState(0);

    const handleCreate = async() =>{
        try{
            const res = await api.post("fabrics/",{
                type: fabric,
                stock: stock,
            })

            alert("New Fabric created")
        }
        catch (err){
            alert(err.response?.data?.message || "Fabric creation failed");
        }
    }
    return (
        <div className="w-full space-y-6">
            <div className="bg-white px-6 py-8 rounded shadow">

                <div className="flex flex-col justify-center items-center gap-15">

                    <div className="flex flex-col gap-2">
                        <div className="text-md font-bold">Fabric</div>
                        <input
                        placeholder="Fabric Type"
                        className="border p-2 rounded-xl"
                        onChange={(e) => setFabric(e.target.value)}
                        />
                    </div>
                    
                    <div className="flex flex-col gap-2">
                        <div className="text-md font-bold">Available stock</div>
                            <input
                            placeholder="Stocks"
                            className="border p-2 rounded-xl"
                            onChange={(e) => setStock(Number(e.target.value))}
                            />
                        </div>
                    
                </div>

                <div className="flex justify-center gap-3 mt-15">
                    <button
                    onClick={handleCreate}
                    className="bg-blue-600 text-white px-4 py-2 rounded-xl"
                    >
                    Create
                    </button>
                </div>

            </div>
        </div>
    )
}

export default CreateFabric;