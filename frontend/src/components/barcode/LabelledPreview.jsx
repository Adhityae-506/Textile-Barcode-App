import { useState, useEffect } from "react";

function LabelledPreview({ barcodeData }) {

    if (!barcodeData) {
        return null;
    }


    return (
        <div
            className="border p-4 mt-4 bg-white w-[400px]"
        >

            <p>
                <strong>Roll No :</strong>
                {" "}
                {barcodeData.roll_no}
            </p>

            <p>
                <strong>Fabric :</strong>
                {" "}
                {barcodeData.fabric_name}
            </p>

            <p>
                <strong>Meters :</strong>
                {" "}
                {barcodeData.meters}
            </p>

            <p>
                <strong>Weight :</strong>
                {" "}
                {barcodeData.weight} kg
            </p>

            <div className="mt-4">

                <img
                    src={
                        `http://127.0.0.1:8000/api/barcode/${barcodeData.id}/preview/`
                    }
                    alt="barcode"
                />

            </div>

            <p className="mt-2">
                {barcodeData.barcode}
            </p>

        </div>
    );
}

export default LabelledPreview;