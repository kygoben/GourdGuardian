import { set } from "date-fns";
import React, { use } from "react";
import { supabase } from "./../../supabaseConnection.js";
import { useState, useEffect } from "react"; // Import useEffect and useState

const ProgressBar = () => {

  //state var for percentage
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    //call the function to get the percentage
    getPercentage();
  }, []);

  const navbarStyle = {
    background: "#111",
    color: "#fff",
    padding: "10px",
    display: "flex",
    alignItems: "center",
  };

  const logoStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    textDecoration: "none",
    color: "#fff",
  };

  const progressBarContainer = {
    display: "flex",
    alignItems: "center",
  };

  const progressBarStyle = {
    width: "200px", // Adjust the width as needed
    height: "20px",
    backgroundColor: "#ccc",
    borderRadius: "10px",
    margin: "0 10px",
  };

  const progressBarFillStyle = {
    width: percentage*2, // Set the initial progress value here
    height: "100%",
    backgroundColor: "#007bff", // Change the color of the progress bar fill
    borderRadius: "10px",
    textAlign: "center",
    lineHeight: "20px",
    color: "#fff",
  };


  const getPercentage = async () => {
     const { data: totalData, totalError } = await supabase
      .from('sstatus')
      .select('sid');

      const { data: completeData, completeError } = await supabase
      .from('sstatus')
      .select('sid')
      .not('carving_confirmed', 'is', null);

      // console.log(totalData);
      // console.log(completeData);

      if (totalError || completeError) {
        // Handle the error
      } else {
        // Access the count result
        const totalCount = totalData.length;
        const completeCount = completeData.length;

        let temp = completeCount/totalCount*100;
        temp = Math.round(temp * 2) / 2;

        // console.log(completeCount/totalCount);
        setPercentage(temp);


        // console.log(`Count: ${count}`);
      }
} 
  return (
    <div style={navbarStyle}>
      <div style={progressBarContainer}>
        <div>Progress: </div>
        <div style={progressBarStyle}>
          <div style={progressBarFillStyle}>{percentage}%</div>
        </div>
        <button onClick={getPercentage}>
          refresh
        </button>
      </div>
    </div>
  );
};

export default ProgressBar;
