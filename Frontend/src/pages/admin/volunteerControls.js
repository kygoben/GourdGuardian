import React from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/AdminNav";
import { supabase } from "./../../../supabaseConnection.js";
import { useState, useEffect } from "react";

export default function Status() {
  const router = useRouter();
  const [year, setYear] = useState("");
  const [week, setWeek] = useState("");
  const [stage, setStage] = useState("");

  useEffect(() => {
    getAdminData();
  }, []);

  async function getAdminData() {
    let { data, error } = await supabase.from("admin_data").select("*");

    if (data.length > 0) {
      setYear(data[0].year);
      setWeek(data[0].week);
      setStage(data[0].stage);
      console.log(data);
    }
  }

  const handleSubmit = async () => {
    let { data, error } = await supabase
      .from("admin_data")
      .update({ year: year, week: week, stage: stage })
      .eq("uid", "admin")
      .select();
  };

  return (
    <>
      <Navbar />
      <div style={{ color: "#b0b0b0", backgroundColor: "#181818", padding: "20px" }}>
        <div style={{ marginBottom: "20px" }}>
          This is the screen for the admin to change the year, week, stage for volunteer interface.
        </div>
        <div style={{ color: "#b0b0b0", marginBottom: "10px" }}>Year</div>
        <input
          style={{ backgroundColor: "#282828", color: "#b0b0b0", border: "1px solid #333", borderRadius: "4px", padding: "10px", width: "100%", marginBottom: "20px" }}
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          placeholder="year"
        />
        <div style={{ color: "#b0b0b0", marginBottom: "10px" }}>Week</div>
        <input
          style={{ backgroundColor: "#282828", color: "#b0b0b0", border: "1px solid #333", borderRadius: "4px", padding: "10px", width: "100%", marginBottom: "20px" }}
          type="number"
          value={week}
          onChange={(e) => setWeek(e.target.value)}
          placeholder="week"
        />
        <div style={{ color: "#b0b0b0", marginBottom: "10px" }}>Stage</div>
        <input
          style={{ backgroundColor: "#282828", color: "#b0b0b0", border: "1px solid #333", borderRadius: "4px", padding: "10px", width: "100%", marginBottom: "20px" }}
          type="number"
          value={stage}
          onChange={(e) => setStage(e.target.value)}
          placeholder="stage"
        />
        <button
          style={{ backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "4px", padding: "10px 20px", cursor: "pointer", fontSize: "16px" }}
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </>
  );
}
