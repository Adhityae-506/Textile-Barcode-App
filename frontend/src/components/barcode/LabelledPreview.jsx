import { forwardRef } from "react";

const LabelledPreview = forwardRef(
  ({ barcodeData }, ref) => {

    return (

      <div
        ref={ref}
        className="
          print-area
          bg-white
          border
          rounded-xl
          min-h-[280px]
          flex
          items-center
          justify-center
          p-6
        "
      >

        {!barcodeData ? (

          <div className="text-center">

            <h3
              className="
                text-lg
                font-semibold
                text-slate-500
              "
            >
              No Barcode Generated Yet
            </h3>

          </div>
          
        ) : (

          <div
            className="
              w-[380px]
              bg-white
              p-6
              flex
              flex-col
              items-center
              justify-center
            "
          >
    

            <div className="w-full space-y-2 text-base">

              <p>
                <strong>
                  Roll No :
                </strong>{" "}
                {barcodeData.roll_no}
              </p>

              <p>
                <strong>
                  Fabric :
                </strong>{" "}
                {barcodeData.fabric_name}
              </p>

              <p>
                <strong>
                  Meters :
                </strong>{" "}
                {barcodeData.meters}
              </p>

              <p>
                <strong>
                  Weight :
                </strong>{" "}
                {barcodeData.weight}
              </p>

            </div>

            <div className="mt-6 flex justify-center">

              <img
                src={`http://127.0.0.1:8000/api/barcode/${barcodeData.id}/preview/`}
                alt="barcode"
                className="max-w-[320px]"
              />

            </div>

            <p
              className="
                mt-4
                text-2xl
                font-bold
                tracking-wide
                text-center
              "
            >
              {barcodeData.barcode}
            </p>

          </div>

        )}

      </div>

    );

  }
);

export default LabelledPreview;