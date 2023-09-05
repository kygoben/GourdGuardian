import React from "react";

const ProgressBar = () => {
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
    width: "39%", // Set the initial progress value here
    height: "100%",
    backgroundColor: "#007bff", // Change the color of the progress bar fill
    borderRadius: "10px",
    textAlign: "center",
    lineHeight: "20px",
    color: "#fff",
  };

  return (
    <div style={navbarStyle}>
      {/* <div style={logoStyle}>Your App Name</div> */}
      <div style={progressBarContainer}>
        <div>Progress: </div>
        <div style={progressBarStyle}>
          <div style={progressBarFillStyle}>39%</div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
