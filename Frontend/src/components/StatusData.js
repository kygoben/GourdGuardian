import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "./../../supabaseConnection.js";
import { useState } from "react"; // Import useEffect and useState
import compareAsc from "date-fns/compareAsc";

const StatusData = ({ year, week, stage }) => {
  const [data, setData] = useState([]); //db values

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
  }, [year, week, stage]);

  const getData = async () => {
    let { data, statusError } = await supabase
      .from("sstatus")
      .select("*")
      .eq("year", year)
      .eq("week", week)
      .is("tracing_confirmed", null);

    console.log(data, statusError);

    if (!data) {
      return;
    }

    data.sort((a, b) => {
      const [aSid] = a.sid.split("-").map(Number);
      const [bSid] = b.sid.split("-").map(Number);
      return compareAsc(aSid, bSid);
    });
    console.log(data, statusError);
    setData(data);
  };

  const handleEdit = async (item, field, value) => {
    //query
    console.log(item, field, value);


    const updateObject = { [field]: value };

    await supabase
    .from("sstatus")
    .update(updateObject)
    .eq("sid", item.sid)
    .select();

    getData();
  };

  if (data.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <div>
      <div style={navbarStyle}></div>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>sid</th>
            <th style={tableHeaderStyle}>title</th>
            <th style={tableHeaderStyle}>tracing_start</th>
            <th style={tableHeaderStyle}>tracing_end</th>
            <th style={tableHeaderStyle}>tracing_confirmed</th>
            <th style={tableHeaderStyle}>tracer</th>
            <th style={tableHeaderStyle}>confirm?</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td style={tableCellStyle}>
                <input
                  type="text"
                  value={item.sid}
                  onChange={(e) => handleEdit(item, "sid", e.target.value)}
                />
              </td>
              <td style={tableCellStyle}>{item.title}</td>
              <td style={tableCellStyle}>{item.tracing_start}</td>
              <td style={tableCellStyle}>{item.tracing_end}</td>
              <td style={tableCellStyle}>
                <input
                  type="datetime-local" // Use datetime-local input type for date and time
                  value={item.tracing_confirmed}
                  onChange={(e) =>
                    handleEdit(item, "tracing_confirmed", e.target.value)
                  }
                />
              </td>
              <td style={tableCellStyle}>
                <input
                  type="text"
                  value={item.tracer}
                  onChange={(e) => handleEdit(item, "tracer", e.target.value)}
                />
              </td>
              <td style={tableCellStyle}>
                <button>confirm</button>
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
