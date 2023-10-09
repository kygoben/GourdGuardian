import { useState } from "react";
import { supabase } from "../../supabaseConnection.js";
import { set } from "lodash";

function QuickAdd({ stage, week, year, updateShowQuickAdd }) {
  const [sid, setSid] = useState("");
  const [stencils, setStencils] = useState([]);
  const [error, setError] = useState(null);
  const currentDate = new Date();
  const stageString = {
    1: "printing",
    2: "cutting",
    3: "tracing",
    4: "carving",
  };

  const handleAdd = async () => {
    // console.log(sid);
    setError(null); // Reset error on each new submission

    if (stencils.some((stencil) => stencil.sid === sid)) {
      setError("This SID has already been added.");
      return;
    }

    // Check if the sid is already in the stencils list


    
    if (week === 1 || week === 2) {
      const { data, error } = await supabase
      .from("sstatus") // update with your table name
      .select("*, stencils(title, category(cname))")
      .eq("sid", sid)
      .eq("week", week)
      .eq("year", year);
      // console.log(data);
      if (data.length === 0) {
        setError(`This SID is not in week ${week}.`);
        return;
      }

      if (data[0][`${stageString[stage]}_confirmed`] !== null) {
        setError(
          `This SID has already been confirmed for ${stageString[stage]}.`
        );
        return;
      }

      if (data) {
        setStencils([...stencils, ...data]);
      }

      setSid("");
      return;
    } else {
      // console.log("week 3");
      const { data, error } = await supabase
      .from("sstatus") // update with your table name
      .select("*, stencils(title, category(cname))")
      .eq("sid", sid)
      .eq("year", year);
      if (data.length === 0) {
        setError(`This SID is not in either week.`);
        return;
      }

      if (data.length === 1) {
        if (data[0][`${stageString[stage]}_confirmed`] !== null) {
          setError(
            `This SID has already been confirmed for ${data[0].week} and does not exist in the other week.`
          );
          return;
        } else {
          if (data) {
            setStencils([...stencils, ...data]);
          }
          console.log(stencils);

          setSid("");
          return;
        }
      } else if (data.length === 2) {
        if (
          data[0][`${stageString[stage]}_confirmed`] == null
        ) {
          if (data) {
            setStencils([...stencils, data[0]]);
            // console.log(stencils);
          }

          setSid("");
          console.log(stencils);
          return;
        } else if (data[1][`${stageString[stage]}_confirmed`] == null) {
          if (data) {
            setStencils([data[1], ...stencils]);
            // console.log(stencils);
          }

          setSid("");
          return;
        } else {
          setError(
            `This SID has already been confirmed for both weeks.`
          );
          return;
        }
      }
    }
  };

  const handleSubmit = async () => {
    console.log(stencils);

    try {
        for (const stencil of stencils) {
            const { data, error } = await supabase
                .from("sstatus")
                .update({
                    [`${stageString[stage]}_confirmed`]: `${currentDate.toISOString()}`,
                })
                .eq("sid", stencil.sid)
                .eq("week", stencil.week)
                .eq("year", year)
                .select();

            console.log(data);

            if (error) throw error;
        }
        
        // If you have any other operations after the loop like onSubmit
        // onSubmit();
    } catch (error) {
        console.error("Error updating data:", error);
    } finally {
        setStencils([]);
        setSid("");
        updateShowQuickAdd(false);
    }
};

  const handleRemove = (index) => {
    setStencils((prevStencils) => prevStencils.filter((_, i) => i !== index));
  };

  const onClose = () => {
    updateShowQuickAdd(false);
  };

  return (
    <div
      className="fixed z-10 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 transition-opacity"
          aria-hidden="true"
          style={{ backdropFilter: "blur(5px)" }}
        >
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <div className="inline-block align-bottom bg-white rounded-lg text-left shadow-md transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4 overflow-y-auto" style={{ maxHeight: '500px' }}>
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-bold text-white" id="modal-title">
                  Add Stencil by SID
                </h3>
                <div className="mt-2 flex justify-between">
                  <input
                    type="text"
                    value={sid}
                    onChange={(e) => setSid(e.target.value)}
                    className="w-full px-2 py-1 border border-brown-700 rounded bg-white"
                    placeholder="Enter SID"
                    onKeyDown={(e) => e.key === "Enter" && handleAdd()}
                    autoFocus
                  />
                  <button
                    onClick={handleAdd}
                    className="ml-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-brown-700"
                  >
                    Add
                  </button>
                </div>
                {error && <div className="mt-2 text-red-600">{error}</div>}
                <div className="mt-4">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        {['SID', 'Title', 'Category', 'Week', 'Action'].map((header) => (
                          <th className="py-2 px-4 bg-gray-200 text-left text-xs font-bold uppercase tracking-wider">
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-300">
                      {stencils.slice().reverse().map((stencil, index) => (
                        <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                          <td className="py-2 px-4">{stencil.sid}</td>
                          <td className="py-2 px-4">{stencil.stencils.title}</td>
                          <td className="py-2 px-4">{stencil.stencils.category.cname}</td>
                          <td className="py-2 px-4">{stencil.week}</td>
                          <td className="py-2 px-4">
                            <button onClick={() => handleRemove(index)} className="text-red-600 hover:text-red-800 transition duration-150">
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              onClick={handleSubmit}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-orange-500 text-white hover:bg-brown-700 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Submit
            </button>
            <button
              onClick={() => updateShowQuickAdd((prev) => !prev)}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-orange-500 shadow-sm px-4 py-2 bg-white text-orange-500 hover:bg-orange-200 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  
}

export default QuickAdd;
