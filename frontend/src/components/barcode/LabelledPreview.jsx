import { useState, useEffect, forwardRef } from "react";
import api from "../../services/api"

const LabelledPreview = forwardRef(
  ({ barcodeData }, ref) => {

    
    const [imageUrl, setImageUrl] = useState("");
    
    useEffect(() => {
      const loadBarcode = async () => {
        try {
          const response = await api.get(
            `barcode/${barcodeData.id}/preview/`,
            {
              responseType: "blob"
            }
          );

          const url = URL.createObjectURL(response.data);
          setImageUrl(url);
        } catch (err) {
          console.error(err);
        }
      };

      if (barcodeData?.id) {
        loadBarcode();
      }
    }, [barcodeData]);


    return (

      <div
        ref={ref}
        className="
          print-area
          bg-white
          border
          rounded-xl
          shadow-md
          min-h-[160px]
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
                src={imageUrl}
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