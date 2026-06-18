import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { useParams } from "react-router-dom";

function DispatchDC() {

  const { id } = useParams();
  const navigate = useNavigate();
  const [dispatch, setDispatch] =
    useState(null);

  useEffect(() => {

    api
      .get(
        `dispatch/${id}/dc/`
      )
      .then((res) => {

        setDispatch(res.data);

      })
      .catch((err) => {

        console.error(err);

      });

  }, [id]);

  if (!dispatch) {

    return <p>Loading...</p>;

  }

  const rolls = dispatch.rolls || [];

  const ROLLS_PER_PAGE = 60;

  const pages = [];

  for (
    let i = 0;
    i < rolls.length;
    i += ROLLS_PER_PAGE
  ) {

    pages.push(
      rolls.slice(
        i,
        i + ROLLS_PER_PAGE
      )
    );

  }

  return (
    <>
      {pages.map(
        (
          pageRolls,
          pageIndex
        ) => {

          const isLastPage =
            pageIndex ===
            pages.length - 1;

          const leftRows =
            pageRolls.slice(
              0,
              30
            );

          const rightRows =
            pageRolls.slice(
              30,
              60
            );

          const totalMeters =
            pageRolls.reduce(
              (sum, r) =>
                sum +
                Number(
                  r.meters
                ),
              0
            );

          const totalWeight =
            pageRolls.reduce(
              (sum, r) =>
                sum +
                Number(
                  r.weight
                ),
              0
            );

          return (

            <div
              key={pageIndex}
              className="
                bg-white
                py-2
                px-4
                max-w-[1200px]
                mx-auto
                border
                text-sm
                dispatch-page
                mb-8
              "
            >

              {/* Header */}

              <div className="flex justify-between border-b pb-2">

                <div>

                  <h1 className="font-semibold text-lg">
                    SAKTHI TEXTILES
                  </h1>

                  <p className="font-semibold">
                    KAVINDAPADI
                  </p>

                </div>

                <div className="text-center">

                  <h2 className="text-xl font-bold">
                    {dispatch.customer_name}
                  </h2>

                  <div className="p-2">
                    {dispatch.fabric_name}
                  </div>

                </div>

                <div>

                  <p>
                    <b>Date :</b>{" "}
                    {new Date(
                      dispatch.dispatched_at
                    ).toLocaleDateString(
                      "en-GB"
                    )}
                  </p>

                  <p>
                    <b>D.C No :</b>{" "}
                    {dispatch.dispatch_no}
                  </p>

                  <p>
                    Page{" "}
                    {pageIndex + 1}
                  </p>

                </div>

              </div>

              {/* Roll Tables */}

              <div className="grid grid-cols-2 border-l border-r">

                <table className="w-full border-r">

                  <thead>

                    <tr className="border-b">

                      <th>S.NO</th>
                      <th>ROLL</th>
                      <th>L.NO</th>
                      <th>KG</th>
                      <th>MTRS</th>
                      <th>GRAM</th>

                    </tr>

                  </thead>

                  <tbody>

                    {leftRows.map(
                      (
                        roll,
                        index
                      ) => (

                        <tr
                          key={
                            roll.roll_no
                          }
                          className="
                            text-center
                            h-7
                          "
                        >

                          <td>
                            {pageIndex *
                              60 +
                              index +
                              1}
                          </td>

                          <td>
                            {roll.roll_no}
                          </td>

                          <td>
                            {roll.machine_no}
                          </td>

                          <td>
                            {roll.weight}
                          </td>

                          <td>
                            {roll.meters}
                          </td>

                          <td>
                            {roll.gram}
                          </td>

                        </tr>

                      )
                    )}

                  </tbody>

                </table>

                <table className="w-full">

                  <thead>

                    <tr className="border-b">

                      <th>S.NO</th>
                      <th>ROLL</th>
                      <th>L.NO</th>
                      <th>KG</th>
                      <th>MTRS</th>
                      <th>GRAM</th>

                    </tr>

                  </thead>

                  <tbody>

                    {rightRows.map(
                      (
                        roll,
                        index
                      ) => (

                        <tr
                          key={
                            roll.roll_no
                          }
                          className="
                            text-center
                            h-7
                          "
                        >

                          <td>
                            {pageIndex *
                              60 +
                              31 +
                              index}
                          </td>

                          <td>
                            {roll.roll_no}
                          </td>

                          <td>
                            {roll.machine_no}
                          </td>

                          <td>
                            {roll.weight}
                          </td>

                          <td>
                            {roll.meters}
                          </td>

                          <td>
                            {roll.gram}
                          </td>

                        </tr>

                      )
                    )}

                  </tbody>

                </table>

              </div>

              {/* Totals */}

              <div className="border p-4">

                <div className="flex justify-between">

                  <div>
                    <b>Total Weight :</b>{" "}
                    {totalWeight}
                  </div>

                  <div>
                    <b>Total Meters :</b>{" "}
                    {totalMeters}
                  </div>

                  <div>
                    <b>No Of Rolls :</b>{" "}
                    {pageRolls.length}
                  </div>

                </div>

              </div>

              {/* Footer */}

              <div className="flex justify-between mt-5">

                <div>

                  <b>Vehicle No :</b>{" "}
                  {dispatch.vehicle_no}

                </div>

                {isLastPage && (

                  <div className="text-center">

                    <div className="border px-8 py-1">

                      <div>

                        <b>
                          Grand Total
                          Meters :
                        </b>{" "}
                        {
                          dispatch.total_meters
                        }

                      </div>

                      <div>

                        <b>
                          Grand Total
                          Weight :
                        </b>{" "}
                        {
                          dispatch.total_weight
                        }

                      </div>

                    </div>

                  </div>

                )}

                <div className="text-center">

                  <b>Received By</b>

                  <div className="border-b w-40 mt-8" />

                </div>

              </div>

            </div>

          );

        }
      )}

      <div className="flex justify-center gap-4 my-8">

        <button
          onClick={() =>
            window.print()
          }
          className="
            bg-blue-600
            text-white
            px-6
            py-2
            rounded
          "
        >
          Print
        </button>

        <button
          onClick={() => navigate("/")}
          className="
            bg-green-600
            text-white
            px-6
            py-2
            rounded
          "
        >
          Go Home
        </button>

      </div>
    </>
  );
}

export default DispatchDC;