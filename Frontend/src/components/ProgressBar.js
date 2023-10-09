import React, { useState, useEffect } from "react";

const ProgressBar = ({ total, finished }) => {
  const percentage = total !== 0 ? (finished / total) * 100 : 0;

  useEffect(() => {
    console.log("total", total);
    console.log("finished", finished);
    console.log("percentage", percentage);
  }, [total, finished]);

  return (
    <div style={styles.container}>
      <div style={{ ...styles.progressBar, width: `${percentage}%` }}></div>
      <div style={styles.label}>
        {finished} / {total}
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "100%",
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    position: "relative",
    height: 20,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#3f51b5", // Color can be changed as per your choice
    transition: "width 0.3s ease-out",
  },
  label: {
    position: "absolute",
    top: 0,
    left: "50%",
    transform: "translateX(-50%)",
    fontSize: 12,
    color: "#333",
  },
};

export default ProgressBar;
