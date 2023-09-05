import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "./../../supabaseConnection.js";
import { useState } from "react"; // Import useEffect and useState
import compareAsc from "date-fns/compareAsc";
import index from "@/pages/index.js";

const StatusData = ({ year, week, stage, isConfirmed }) => {
  const [data, setData] = useState([]); //db values
  const [successMessage, setSuccessMessage] = useState(null);

  /* CSS in a separate .css file or within your component */
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

  const navbarStyle = {
    background: "#111",
    color: "#fff",
    padding: "10px",
    // display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const logoStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    textDecoration: "none",
    color: "#fff",
  };

  const linkStyle = {
    textDecoration: "none",
    color: "#fff",
    marginLeft: "10px",
  };

  useEffect(() => {
    getData();
  }, [year, week, stage, isConfirmed]);

  const getData = async () => {
    let { data: stencilsData, error: stencilsError } = await supabase
      .from("stencils")
      .select("sid, title");

    console.log(stencilsData, stencilsError);

    let { data: sstatusData, error: sstatusError } = await supabase
      .from("sstatus")
      .select(
        "sid, year, week, tracing_start, tracing_end, tracing_confirmed, tracer"
      );

    console.log(sstatusData, sstatusError);

    const combinedData = stencilsData
      .map((stencil) => {
        const relatedSStatus = sstatusData.find((s) => s.sid === stencil.sid);
        if (
          relatedSStatus &&
          relatedSStatus.year === year &&
          relatedSStatus.week === week &&(
            (isConfirmed && relatedSStatus.tracing_confirmed) || // Check if isConfirmed is true and tracing_confirmed is not null
            (!isConfirmed && !relatedSStatus.tracing_confirmed) // Check if isConfirmed is false and tracing_confirmed is null
          )
        ) {
          return {
            ...stencil,
            sstatus: relatedSStatus,
          };
        }
        return null; // Exclude entries with no matching "sstatus" or "year" not equal to '2024'
      })
      .filter(Boolean);

    console.log(combinedData);

    if (!combinedData) {
      console.log("no data");
      return;
    }

    combinedData.sort((a, b) => {
      const [aSid, aSuffix] = a.sid.split("-").map(Number);
      const [bSid, bSuffix] = b.sid.split("-").map(Number);

      // Compare the main "sid" values numerically
      if (aSid !== bSid) {
        return aSid - bSid;
      }

      // If the main "sid" values are equal, compare the suffixes numerically
      return aSuffix - bSuffix;
    });
    // console.log(data, statusError);
    setData(combinedData);
  };

  const handleEdit = async (item, field, value) => {
    console.log(item, field, value);
    // Update the database
    const updateObject = { [field]: value };
    let { data, error } = await supabase
      .from("sstatus")
      .update(updateObject)
      .eq("sid", item.sid)
      .select();

    console.log(data, error);

    if (!error) {
      setSuccessMessage("Entry updated successfully"); // Set success message
      getData();
    } else {
      // Handle error if needed
    }

    // Optionally, you can clear the success message after a few seconds
    setTimeout(() => {
      setSuccessMessage(null);
    }, 3000); // Clear the message after 5 seconds

    // getData();
  };

  if (data.length === 0) {
    return <div>No data available</div>;
  }

  const currentDate = new Date();

  return (
    <div>
      {successMessage && <div style={successStyle}>{successMessage}</div>}

      <div style={navbarStyle}></div>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>SID</th>
            <th style={tableHeaderStyle}>Title</th>
            <th style={tableHeaderStyle}>Start</th>
            <th style={tableHeaderStyle}>End</th>
            {/* <th style={tableHeaderStyle}>tracing_confirmed</th> */}
            <th style={tableHeaderStyle}>Author</th>
            <th style={tableHeaderStyle}>Confirm?</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIndex) => (
            <tr key={item.sid}>
              <td style={tableCellStyle}>{item.sid}</td>
              <td style={tableCellStyle}>{item.title}</td>
              <td style={tableCellStyle}>
                <input
                  type="datetime-local" // Use datetime-local input type for date and time
                  value={item.sstatus.tracing_start || ""}
                  onChange={(e) =>
                    handleEdit(item, "tracing_start", e.target.value)
                  }
                ></input>
              </td>
              <td style={tableCellStyle}>
                <input
                  type="datetime-local" // Use datetime-local input type for date and time
                  value={item.sstatus.tracing_end || ""}
                  onChange={(e) =>
                    handleEdit(item, "tracing_end", e.target.value)
                  }
                ></input>
              </td>
              {/* <td style={tableCellStyle}>
                <input
                  type="datetime-local" // Use datetime-local input type for date and time
                  value={item.sstatus.tracing_confirmed || ""}
                  onChange={(e) =>
                    handleEdit(item, "tracing_confirmed", e.target.value)
                  }
                />
              </td> */}
              <td style={tableCellStyle}>
                <input
                  type="text"
                  value={item.sstatus.tracer || ""}
                  onChange={(e) => handleEdit(item, "tracer", e.target.value)}
                />
              </td>
              <td style={tableCellStyle}>
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
              </td>
            </tr>
          ))}
        </tbody>
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
