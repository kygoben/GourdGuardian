import { useState } from "react";
import { supabase } from "../../supabaseConnection.js";

function QuickAdd({stage, week, year, updateShowQuickAdd}) {
  const [sid, setSid] = useState("");
  const [stencils, setStencils] = useState([]);
  const [error, setError] = useState(null);
  const currentDate = new Date();
  const stageString = {
    1: "printing",
    2: "cutting",
    3: "tracing",
    4: "carving",
  }

  const handleAdd = async () => {
    try {
      setError(null); // Reset error on each new submission

      // Check if the sid is already in the stencils list
      if (stencils.some((stencil) => stencil.sid === sid)) {
        setError("This SID has already been added.");
        return;
      }
      const { data, error } = await supabase
        .from("sstatus") // update with your table name
        .select("*, stencils(title, category(cname))")
        .eq("sid", sid)
        .eq("week", week)
        .eq("year", year);
        // console.log(data);
        if(data.length === 0) {
            setError(`This SID is not in week ${week}.`);
            return;
        }
      if (data) {
        setStencils([...stencils, ...data]);
      }
      if (error) throw error;
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setSid("");
    }
  };

  const handleSubmit = async () => {
    try {
      const { data, error } = await supabase
        .from("sstatus") // update with your table name
        .update({ [`${stageString[stage]}_confirmed`]: `${currentDate.toISOString()}` })
        .in(
          "sid",
          stencils.map((stencil) => stencil.sid)
        )
        .eq("week", week)
        .eq("year", year)
        .select();
      console.log(data);
      if (error) throw error;
      //   onSubmit();
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
  }


  return (
    <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true" style={{ backdropFilter: 'blur(5px)' }}>
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-100" id="modal-title">
                  Add Stencil by SID
                </h3>
                <div className="mt-2 flex justify-between">
                  <input
                    type="text"
                    value={sid}
                    onChange={(e) => setSid(e.target.value)}
                    className="w-full px-2 py-1 border border-gray-300 rounded bg-gray-700 text-white"
                    placeholder="Enter SID"
                    onKeyDown={(e) => e.key === "Enter" && handleAdd()}
                  />
                  <button
                    onClick={handleAdd}
                    className="ml-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Add
                  </button>
                </div>
                {error && <div className="mt-2 text-red-600">{error}</div>}
                <div className="mt-4">
                  <table className="min-w-full bg-gray-700 text-white">
                    <thead>
                      <tr>
                        <th className="py-2">SID</th>
                        <th className="py-2">Title</th>
                        <th className="py-2">Category</th>
                        <th className="py-2">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stencils.map((stencil, index) => (
                        <tr key={index} className="border-t border-gray-600">
                          <td className="py-2 px-4">{stencil.sid}</td>
                          <td className="py-2 px-4">{stencil.stencils.title}</td>
                          <td className="py-2 px-4">{stencil.stencils.category.cname}</td>
                          <td className="py-2 px-4">
                            <button
                              onClick={() => handleRemove(index)}
                              className="text-red-600 hover:text-red-800 transition duration-150"
                            >
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
          <div className="bg-gray-900 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={handleSubmit}
            >
              Submit
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-700 shadow-sm px-4 py-2 bg-gray-800 text-base font-medium text-gray-400 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={() => updateShowQuickAdd((prev) => !prev)}
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
