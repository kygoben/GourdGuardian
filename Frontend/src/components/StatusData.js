import React, { useEffect } from "react";
import { supabase } from "./../../supabaseConnection.js";
import { useState } from "react"; // Import useEffect and useState
import { set } from "date-fns";




const StatusData = ({
  year,
  week,
  stage,
  isConfirmed,
  notConfirmed,
  notStarted,
  inProgress,
  completed,
  searchTerm,
}) => {
  const [data, setData] = useState([]);
  const [successMessage, setSuccessMessage] = useState(null);
  //loading state
  const [loading, setLoading] = useState(true);

  const successStyle = {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    background: "rgba(0, 128, 0, 0.7)" /* Use rgba to set transparency */,
    color: "#fff",
    padding: "10px",
    alignItems: "center",
    z: 9999 /* Ensure it appears on top of everything */,
  };

  const buttonStyle = {
    backgroundColor: "green",
    width: "24px",
    height: "24px",
    border: "none",
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: "white",
    fontSize: "16px",
  };
  const buttonStyle2 = {
    backgroundColor: "red",
    width: "24px",
    height: "24px",
    border: "none",
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: "white",
    fontSize: "16px",
  };

  useEffect(() => {
    getData();
  }, [year]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    try {
      const { data: stencilsData } = await supabase
        .from("stencils")
        .select("sid, title");
      const { data: sstatusData } = await supabase
        .from("sstatus")
        .select(
          "sid, year, week, printing, cutting, tracing_start, tracing_end, tracing_confirmed, tracing_by, carving_start, carving_end, carving_confirmed, carving_by"
        );
      console.log(sstatusData);

      const combinedData = stencilsData
        .map((stencil) => {
          const relatedSStatus = sstatusData.find((s) => s.sid === stencil.sid);
          if (relatedSStatus && relatedSStatus.year === year) {
            return {
              ...stencil,
              sstatus: relatedSStatus,
            };
          }
          return null;
        })
        .filter(Boolean);
      // console.log(combinedData);

      combinedData.sort((a, b) => {
        const sidA = a.sid.split("-").map(Number);
        const sidB = b.sid.split("-").map(Number);

        for (let i = 0; i < Math.max(sidA.length, sidB.length); i++) {
          const diff = (sidA[i] || 0) - (sidB[i] || 0);
          if (diff !== 0) {
            return diff;
          }
        }

        return 0;
      });
      console.log(combinedData);
      setData(combinedData);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error as needed
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (item, field, value) => {
    try {
      const updateObject = { [field]: value };
      const { data: updatedData, error } = await supabase
        .from("sstatus")
        .update(updateObject)
        .eq("sid", item.sid)
        .select();
      if (!error) {
        setSuccessMessage("Entry updated successfully");

        // Create a new copy of the data array and update the relevant item
        setData((prevData) => {
          const newData = [...prevData];
          const itemIndex = newData.findIndex((el) => el.sid === item.sid);
          if (itemIndex !== -1) {
            newData[itemIndex].sstatus = updatedData[0];
          }
          return newData;
        });
      } else {
        // Handle error as needed
      }
    } catch (error) {
      console.error("Error updating data:", error);
      // Handle error as needed
    }

    setTimeout(() => {
      setSuccessMessage(null);
    }, 2000);
  };

  const stageMappings = {
    1: {
      header: ["SID", "Title", "Printing"],
      render: (item) =>
        (item.sid.toLowerCase() === searchTerm.toLowerCase() || searchTerm === "") &&
        (item.sstatus.week === week || week === "Both") &&
        ((!item.sstatus.printing && notStarted) ||
          (item.sstatus.printing && completed)) ? (
          <>
            <td style={tableCellStyle}>{item.sid}</td>
            <td style={tableCellStyle}>{item.title}</td>
            <td style={tableCellStyle}>
              {item.sstatus.printing ? "Complete" : "Incomplete"}
              <button
                style={buttonStyle}
                onClick={() => handleEdit(item, "printing", 1)}
              >
                ✓
              </button>
              <button
                style={buttonStyle2}
                onClick={() => handleEdit(item, "printing", null)}
              >
                X
              </button>
            </td>
          </>
        ) : (
          <></>
        ),
    },
    2: {
      header: ["SID", "Title", "Cutting"],
      render: (item) =>
        (item.sid.toLowerCase() === searchTerm.toLowerCase() || searchTerm === "") &&
        (item.sstatus.week === week || week === "Both") &&
        ((!item.sstatus.cutting && notStarted) ||
          (item.sstatus.cutting && completed)) ? (
          <>
            <td style={tableCellStyle}>{item.sid}</td>
            <td style={tableCellStyle}>{item.title}</td>
            <td style={tableCellStyle}>
              {item.sstatus.cutting ? "Complete" : "Incomplete"}
              <button
                style={buttonStyle}
                onClick={() => handleEdit(item, "cutting", 1)}
              >
                ✓
              </button>
              <button
                style={buttonStyle2}
                onClick={() => handleEdit(item, "cutting", null)}
              >
                X
              </button>
            </td>
          </>
        ) : (
          <></>
        ),
    },
    3: {
      header: [
        "SID",
        "Title",
        "Tracing Start",
        "Tracing End",
        "tracing_by",
        "Confirm?",
      ],
      render: (item) =>
        (item.sid.toLowerCase() === searchTerm.toLowerCase() ||
          searchTerm === "" ||
          item.sstatus.tracer?.toLowerCase() === searchTerm.toLowerCase() ||
          searchTerm === "") &&
        (item.sstatus.week === week || week === "Both") &&
        ((!item.sstatus.tracing_start && notStarted) ||
          (!item.sstatus.tracing_end &&
            inProgress &&
            item.sstatus.tracing_start) ||
          (item.sstatus.tracing_end && completed)) &&
        ((item.sstatus.tracing_confirmed && isConfirmed) ||
          (!item.sstatus.tracing_confirmed && notConfirmed)) ? (
          <>
            <td style={tableCellStyle}>{item.sid}</td>
            <td style={tableCellStyle}>{item.title}</td>
            <td style={tableCellStyle}>
              <input
                type="datetime-local"
                value={item.sstatus.tracing_start || ""}
                onChange={(e) =>
                  handleEdit(item, "tracing_start", e.target.value)
                }
              ></input>
              <button
                style={buttonStyle}
                onClick={() =>
                  handleEdit(item, "tracing_start", currentDate.toISOString())
                }
              >
                ✓
              </button>
              <button
                style={buttonStyle2}
                onClick={() => handleEdit(item, "tracing_start", null)}
              >
                X
              </button>
            </td>
            <td style={tableCellStyle}>
              <input
                type="datetime-local"
                value={item.sstatus.tracing_end || ""}
                onChange={(e) =>
                  handleEdit(item, "tracing_end", e.target.value)
                }
              ></input>
              <button
                style={buttonStyle}
                onClick={() =>
                  handleEdit(item, "tracing_end", currentDate.toISOString())
                }
              >
                ✓
              </button>
              <button
                style={buttonStyle2}
                onClick={() => handleEdit(item, "tracing_end", null)}
              >
                X
              </button>
            </td>
            <td style={tableCellStyle}>
              <form
                onSubmit={(e) => {
                  e.preventDefault(); // Prevent the default form submission behavior
                  handleEdit(
                    item,
                    "tracer",
                    document.getElementById(`tracer_${item.sid}_${item.index}`)
                      .value
                  ); // Call your edit handler when the form is submitted
                }}
              >
                <input
                  id={`tracer_${item.sid}_${item.index}`}
                  type="text"
                  placeholder={"No Tracer Assigned"}
                  defaultValue={item.sstatus.tracer}
                />
                <button
                  type="submit" // Specify the button type as "submit"
                  style={buttonStyle}
                >
                  ✓
                </button>
                <button
                  style={buttonStyle2}
                  onClick={() => {
                    handleEdit(item, "tracer", null);
                    document.getElementById(
                      `tracer_${item.sid}_${item.index}`
                    ).value = null;
                  }}
                >
                  X
                </button>
              </form>
            </td>
            <td style={tableCellStyle}>
              {item.sstatus.tracing_confirmed ? "Confirmed" : "Not Confirmed"}
              <button
                style={buttonStyle}
                onClick={() =>
                  handleEdit(
                    item,
                    "tracing_confirmed",
                    currentDate.toISOString()
                  )
                }
              >
                ✓
              </button>
              <button
                style={buttonStyle2}
                onClick={() => handleEdit(item, "tracing_confirmed", null)}
              >
                X
              </button>
            </td>
          </>
        ) : (
          <></>
        ),
    },
    4: {
      header: [
        "SID",
        "Title",
        "Carving Start",
        "Carving End",
        "carving_by",
        "Confirm?",
      ],
      render: (item) =>
        (item.sid.toLowerCase() === searchTerm.toLowerCase() ||
          searchTerm === "" ||
          item.sstatus.carving_by?.toLowerCase() === searchTerm.toLowerCase() ||
          searchTerm === "") &&
        (item.sstatus.week === week || week === "Both") &&
        ((!item.sstatus.carving_start && notStarted) ||
          (!item.sstatus.carving_end &&
            inProgress &&
            item.sstatus.carving_start) ||
          (item.sstatus.carving_end && completed)) &&
        ((item.sstatus.carving_confirmed && isConfirmed) ||
          (!item.sstatus.carving_confirmed && notConfirmed)) ? (
          <>
            <td style={tableCellStyle}>{item.sid}</td>
            <td style={tableCellStyle}>{item.title}</td>
            <td style={tableCellStyle}>
              <input
                type="datetime-local"
                value={item.sstatus.carving_start || ""}
                onChange={(e) =>
                  handleEdit(item, "carving_start", e.target.value)
                }
              ></input>
              <button
                style={buttonStyle}
                onClick={() =>
                  handleEdit(item, "carving_start", currentDate.toISOString())
                }
              >
                ✓
              </button>
              <button
                style={buttonStyle2}
                onClick={() => handleEdit(item, "carving_start", null)}
              >
                X
              </button>
            </td>
            <td style={tableCellStyle}>
              <input
                type="datetime-local"
                value={item.sstatus.carving_end || ""}
                onChange={(e) =>
                  handleEdit(item, "carving_end", e.target.value)
                }
              ></input>
              <button
                style={buttonStyle}
                onClick={() =>
                  handleEdit(item, "carving_end", currentDate.toISOString())
                }
              >
                ✓
              </button>
              <button
                style={buttonStyle2}
                onClick={() => handleEdit(item, "carving_end", null)}
              >
                X
              </button>
            </td>
            <td style={tableCellStyle}>
              <form
                onSubmit={(e) => {
                  e.preventDefault(); // Prevent the default form submission behavior
                  handleEdit(
                    item,
                    "carving_by",
                    document.getElementById(`carving_by_${item.sid}_${item.index}`)
                      .value
                  ); // Call your edit handler when the form is submitted
                }}
              >
                <input
                  id={`carving_by_${item.sid}_${item.index}`}
                  type="text"
                  placeholder={"No carving_by Assigned"}
                  defaultValue={item.sstatus.carving_by}
                />
                <button
                  type="submit" // Specify the button type as "submit"
                  style={buttonStyle}
                >
                  ✓
                </button>
                <button
                  style={buttonStyle2}
                  onClick={() => {
                    handleEdit(item, "carving_by", null);
                    document.getElementById(
                      `carving_by_${item.sid}_${item.index}`
                    ).value = null;
                  }}
                >
                  X
                </button>
              </form>
            </td>
            <td style={tableCellStyle}>
              {item.sstatus.carving_confirmed ? "Confirmed" : "Not Confirmed"}
              <button
                style={buttonStyle}
                onClick={() =>
                  handleEdit(
                    item,
                    "carving_confirmed",
                    currentDate.toISOString()
                  )
                }
              >
                ✓
              </button>
              <button
                style={buttonStyle2}
                onClick={() => handleEdit(item, "carving_confirmed", null)}
              >
                X
              </button>
            </td>
          </>
        ) : (
          <></>
        ),
    },
  };

  const currentDate = new Date();
  const stageMapping = stageMappings[stage];

  return (
    <div>
      {successMessage && <div style={successStyle}>{successMessage}</div>}

      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 bg-gray-900 text-white">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white"></div>
        </div>
      ) : (
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          {stageMapping && (
            <>
              <thead>
                <tr>
                  {stageMapping.header.map((headerText, index) => (
                    <th key={index} style={tableHeaderStyle}>
                      {headerText}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((item, rowIndex) => (
                  <tr key={item.sid}>{stageMapping.render(item)}</tr>
                ))}
              </tbody>
            </>
          )}
        </table>
      )}
    </div>
  );
};

const tableHeaderStyle = {
  border: "1px solid #ddd",
  padding: "8px",
  fontWeight: "bold",
  textAlign: "center",
};

const tableCellStyle = {
  border: "1px solid #ddd",
  padding: "8px",
  textAlign: "center",
};

export default StatusData;
