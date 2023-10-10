import { useState } from "react";
import { supabase } from "../../supabaseConnection.js";
import { set } from "lodash";
import Router from "next/router";

import { useEffect } from "react";
import { ro } from "date-fns/locale";

function StatusAdd({ year, updateShowStatusAdd }) {
  const [sid, setSid] = useState("");
  const [stencils, setStencils] = useState([]);
  const [isWeek1Toggled, setIsWeek1Toggled] = useState(false);
  const [isWeek2Toggled, setIsWeek2Toggled] = useState(false);
  const [error, setError] = useState(null);
 const [data, setData] = useState([]);

  // useEffect(() => {
  //     if (stencils.length > 0) {
  //       setIsWeek1Toggled(stencils.some(entry => entry.week === 1));
  //       setIsWeek2Toggled(stencils.some(entry => entry.week === 2));
  //     }
  //   }, [stencils]);

  const handleAdd = async () => {
    // console.log(sid);
    setError(null); // Reset error on each new submission

    setIsWeek1Toggled(false);
    setIsWeek2Toggled(false);

    // if (data.length === 0) {
    //   setError(`This SID does not exist.`);
    //   return;
    // }

    const { data: stencils, error: stencilError } = await supabase
      .from("stencils") // update with your table name
      .select("*, cid(cname)")
      .eq("sid", sid);

    const { data, error } = await supabase
      .from("sstatus") // update with your table name
      .select("*")
      .eq("sid", sid)
      .eq("year", year);

    if (data.length === 1) {
      data[0].week === 1 && setIsWeek1Toggled(true);
      data[0].week === 2 && setIsWeek2Toggled(true);
    } else if (data.length === 2) {
      setIsWeek1Toggled(true);
      setIsWeek2Toggled(true);
    }

    setStencils(stencils);
    setData(data);
  };

  const handleSubmit = async () => {

    for (let weekIndex = 1; weekIndex <= 2; weekIndex++) {
      const isWeekToggled = weekIndex === 1 ? isWeek1Toggled : isWeek2Toggled;
      console.log(data);
      const existingEntry = data.find((entry) => entry.week === weekIndex);
      console.log(existingEntry);

      if (isWeekToggled && !existingEntry) {
        // Insert new entry
        await supabase
          .from("sstatus")
          .insert([{ sid, year: year, week: weekIndex }])
        //   .select();
      } else if (!isWeekToggled && existingEntry) {
        console.log(existingEntry);
        // Delete the existing entry
        await supabase
          .from("sstatus")
          .delete()
          .eq("sid", sid)
          .eq("year", year)
          .eq("week", weekIndex)
        //   .select();
      }
    }

    updateShowStatusAdd((prev) => !prev);
    // Router.reload();
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="inline-block align-middle bg-white rounded-lg shadow-md p-6 transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <h3 className="text-xl leading-6 font-bold mb-4" id="modal-title">
                    Add Stencil to week
                </h3>
                <div className="flex items-center mb-3">
                    <input
                        type="text"
                        value={sid}
                        onChange={(e) => setSid(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded mr-3 focus:ring-orange-500 focus:border-orange-500"
                        placeholder="Enter SID"
                        onKeyDown={(e) => e.key === "Enter" && handleAdd()}
                        autoFocus
                    />
                    <button onClick={handleAdd} className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-brown-700 focus:outline-none focus:border-brown-700 focus:ring-2 focus:ring-offset-2 focus:ring-brown-500">
                        Search
                    </button>
                </div>
                {error && <p className="text-red-600 mb-2">{error}</p>}
                {stencils.length >= 0 && (
                    <div className="mb-4">
                        {stencils.length >= 0 && (
                  <div className="mt-2">
                    <p>
                      <strong>SID:</strong> {stencils[0]?.sid}
                    </p>
                    <p>
                      <strong>Year:</strong> {data[0]?.year}
                    </p>
                    <p>
                      <strong>Title:</strong> {stencils[0]?.title}
                    </p>
                    <p>
                      <strong>Category Name:</strong>{" "}
                      {stencils[0]?.cid?.cname}
                    </p>

                    <button
                      onClick={() => setIsWeek1Toggled((prev) => !prev)}
                      className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md ${
                        isWeek1Toggled
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {isWeek1Toggled ? "Week 1: On" : "Week 1: Off"}
                    </button>

                    <button
                      onClick={() => setIsWeek2Toggled((prev) => !prev)}
                      className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md ${
                        isWeek2Toggled
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {isWeek2Toggled ? "Week 2: On" : "Week 2: Off"}
                    </button>
                  </div>
                )}
                    </div>
                )}
                <div className="flex justify-end">
                    <button onClick={handleSubmit} className="mr-2 inline-flex justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-brown-700 focus:outline-none focus:border-brown-700 focus:ring-2 focus:ring-offset-2 focus:ring-brown-500">
                        Submit
                    </button>
                    <button onClick={() => updateShowStatusAdd((prev) => !prev)} className="inline-flex justify-center px-4 py-2 border border-orange-500 text-sm font-medium rounded-md text-orange-500 bg-white hover:bg-orange-200 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    </div>
);


 
}

export default StatusAdd;
