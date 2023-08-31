import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "./../../supabaseConnection.js";
import { useState } from "react"; // Import useEffect and useState


const StatusData = () => {
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
  }, []);

  const getData = async () => {
    let { data, statusError } = await supabase.from("sstatus").select("*");

    setData(data);
  };

  return (
    <div>
      <div style={navbarStyle}>
      </div>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>sid</th>
            <th style={tableHeaderStyle}>week</th>
            <th style={tableHeaderStyle}>year</th>
            <th style={tableHeaderStyle}>tracing_start</th>
            <th style={tableHeaderStyle}>tracing_end</th>
            <th style={tableHeaderStyle}>tracing_confirmed</th>
            <th style={tableHeaderStyle}>tracer</th>
            <th style={tableHeaderStyle}>carving_start</th>
            <th style={tableHeaderStyle}>carving_end</th>
            <th style={tableHeaderStyle}>carving_confirmed</th>
            <th style={tableHeaderStyle}>carver</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td style={tableCellStyle}>{item.sid}</td>
              <td style={tableCellStyle}>{item.week}</td>
              <td style={tableCellStyle}>{item.year}</td>
              <td style={tableCellStyle}>{item.tracing_start}</td>
              <td style={tableCellStyle}>{item.tracing_end}</td>
              <td style={tableCellStyle}>{item.tracing_confirmed}</td>
              <td style={tableCellStyle}>{item.tracer}</td>
              <td style={tableCellStyle}>{item.carving_start}</td>
              <td style={tableCellStyle}>{item.carving_end}</td>
              <td style={tableCellStyle}>{item.carving_confirmed}</td>
              <td style={tableCellStyle}>{item.carver}</td>
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