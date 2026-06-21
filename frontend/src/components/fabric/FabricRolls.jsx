import {
  useEffect,
  useState
} from "react";

import {
  useParams,
  useNavigate
} from "react-router-dom";

import api from "../../services/api";

function FabricRolls() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [data, setData] =
    useState(null);

  useEffect(() => {

    api
      .get(
        `fabrics/${id}/rolls/`
      )
      .then((res) => {

        setData(res.data);

      });

  }, [id]);

  if (!data) {

    return <p>Loading...</p>;

  }

  return (

    <div
      className="
        max-w-7xl
        mx-auto
        bg-white
        p-6
        rounded-xl
        shadow
        print-page
      "
    >

      <div
        className="
          flex flex-col
          gap-10
          mb-6
        "
      >

        <h1
            className="
              text-center 
              text-3xl
              font-bold
              text-blue-900
            "
          >
            {data.fabric_name}
          </h1>
        <div className="flex justify-between">

          <div> 
            <p className="text-lg font-semibold">
              Total Rolls :
              {" "}
              {data.total_rolls}
            </p>

            <p className="text-lg font-semibold">
              Total Meters :
              {" "}
              {data.total_meters}
            </p>

            <p className="text-lg font-semibold">
              Total Weight :
              {" "}
              {data.total_weight}
            </p>
          </div>

          <div
            className="
              flex
              gap-3
              no-print
            "
          >

            <button
              onClick={() => window.print()}
              className="
                self-center
                bg-blue-700
                text-white
                px-6
                py-3
                rounded-lg
                hover:bg-blue-800
              "
            >
              Print
            </button>

            <button
              onClick={() =>
                navigate("/stocks")
              }
              className="
                self-center
                bg-green-600
                text-white
                px-6
                py-3
                rounded-lg
                hover:bg-green-700
              "
            >
              Back
            </button>

          </div>

        </div>

        

      </div>

      <table
        className="
          w-full
          border
        "
      >

        <thead>

          <tr
            className="
              bg-blue-900
              text-white
            "
          >

            <th className="p-3">
              Roll No
            </th>

            <th className="p-3">
              Loom No
            </th>

            <th className="p-3">
              Meters
            </th>

            <th className="p-3">
              Weight
            </th>

          </tr>

        </thead>

        <tbody>

          {data.rolls.map(
            (roll) => (

              <tr
                key={roll.id}
                className="
                  border-b
                  text-center
                "
              >

                <td className="p-3">
                  {roll.roll_no}
                </td>

                <td className="p-3">
                  {roll.machine_no}
                </td>

                <td className="p-3">
                  {roll.meters}
                </td>

                <td className="p-3">
                  {roll.weight}
                </td>

              </tr>

            )
          )}

        </tbody>

      </table>

    </div>

  );

}

export default FabricRolls;