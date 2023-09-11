import { set } from "date-fns";
import React from "react";
import { supabase } from "./../../supabaseConnection.js";
import { useState, useEffect } from "react";

const ProgressBar = () => {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    getPercentage();
  }, []);

  const getPercentage = async () => {
    const { data: totalData, totalError } = await supabase.from('sstatus').select('sid');
    const { data: completeData, completeError } = await supabase.from('sstatus').select('sid').not('carving_confirmed', 'is', null);

    if (!totalError && !completeError) {
      const totalCount = totalData.length;
      const completeCount = completeData.length;
      let temp = (completeCount / totalCount) * 100;
      temp = Math.round(temp * 2) / 2;
      setPercentage(temp);
    }
  };

  return (
    <div style={{ background: "#181818", color: "#b0b0b0", padding: "10px", display: "flex", alignItems: "center" }}>
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <div>Progress:</div>
        <div style={{ width: "130px", height: "10px", background: "#282828", borderRadius: "50px", overflow: "hidden", position: "relative" }}>
          <div
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              height: "100%",
              background: "#007bff",
              borderRadius: "50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: `${percentage}%`,
            }}
          >
            {percentage > 5 && <span>{percentage}%</span>}
          </div>
        </div>
        {percentage <= 5 && <span style={{ marginLeft: "10px" }}>{percentage}%</span>}
        <button
          style={{
            background: "#007bff",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "5px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
            border: "none",
            cursor: "pointer",
          }}
          onClick={getPercentage}
        >
          Refresh
        </button>
      </div>
    </div>
  );
  
};

export default ProgressBar;
