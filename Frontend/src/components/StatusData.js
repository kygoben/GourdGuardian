import React, { useEffect } from "react";
import { supabase } from "./../../supabaseConnection.js";
import { useState } from "react"; // Import useEffect and useState

const StatusData = ({
  year,
  week,
  stage,
  isConfirmed,
  notConfirmed,
  notStarted,
  inProgress,
  completed,
}) => {
  const [data, setData] = useState([]);
  const [successMessage, setSuccessMessage] = useState(null);

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
  }, [year, week, stage]);

  const getData = async () => {
    try {
      const { data: stencilsData } = await supabase
        .from("stencils")
        .select("sid, title");
      const { data: sstatusData } = await supabase
        .from("sstatus")
        .select(
          "sid, year, week, printing, cutting, tracing_start, tracing_end, tracing_confirmed, tracer, carving_start, carving_end, carving_confirmed, carver"
        );

      const combinedData = stencilsData
        .map((stencil) => {
          const relatedSStatus = sstatusData.find((s) => s.sid === stencil.sid);
          if (
            relatedSStatus &&
            relatedSStatus.year === year &&
            relatedSStatus.week === week
          ) {
            return {
              ...stencil,
              sstatus: relatedSStatus,
            };
          }
          return null;
        })
        .filter(Boolean);
      console.log(combinedData);

      setData(combinedData);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error as needed
    }
  };

  const handleEdit = async (item, field, value) => {
    try {
      const updateObject = { [field]: value };
      await supabase.from("sstatus").update(updateObject).eq("sid", item.sid);
      setSuccessMessage("Entry updated successfully");
      getData();
    } catch (error) {
      console.error("Error updating data:", error);
      // Handle error as needed
    }

    setTimeout(() => {
      setSuccessMessage(null);
    }
    , 2000);
  };

  const stageMappings = {
    1: {
      header: ["SID", "Title", "Printing"],
      render: (item) =>
        (!item.sstatus.printing && notStarted) ||
        (item.sstatus.printing && completed) ? (
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
        (!item.sstatus.cutting && notStarted) ||
        (item.sstatus.cutting && completed) ? (
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
        "Tracer",
        "Confirm?",
      ],
      render: (item) =>
        ((!item.sstatus.tracing_start && notStarted) ||
          (!item.sstatus.tracing_end && inProgress) ||
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
              <input
                type="text"
                value={item.sstatus.tracer || ""}
                onChange={(e) => handleEdit(item, "tracer", e.target.value)}
              />
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
        "Carver",
        "Confirm?",
      ],
      render: (item) =>
        ((!item.sstatus.carving_start && notStarted) ||
          (!item.sstatus.carving_end && inProgress) ||
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
              <input
                type="text"
                value={item.sstatus.carver || ""}
                onChange={(e) => handleEdit(item, "carver", e.target.value)}
              />
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
