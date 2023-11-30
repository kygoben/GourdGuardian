import React from "react";
import { useEffect } from "react";
import { supabase } from "../../supabaseConnection.js";
import styles from "@/styles/leftPaneSelect.module.css";

const LeftPaneSelect = ({
  year,
  week,
  stage,
  categoryData,
  isConfirmed,
  notConfirmed,
  notStarted,
  inProgress,
  completed,
  updateYear,
  updateWeek,
  updateStage,
  week1Total,
  week2Total,
  uniqueTotal,
  updateIsConfirmed,
  updateNotConfirmed,
  updateNotStarted,
  updateInProgress,
  updateCompleted,
  handleToggleSelectionCategory
}) => {
  const weeks = [1, 2, "Both"]; // Update with your desired weeks

  // useEffect(() => {
  //   console.log("year", year);
  //   console.log("week", week);
  //   console.log("stage", stage);
  //   console.log("isConfirmed", isConfirmed);
  //   console.log("notConfirmed", notConfirmed);

  // }, [year, week, stage]);

  const handleYearChange = (newYear) => {
    updateYear(newYear);
  };

  const handleIsConfirmedToggle = () => {
    updateIsConfirmed(!isConfirmed);
  };

  const handleNotStartedToggle = () => {
    updateNotStarted(!notStarted);
  };

  const handleInProgressToggle = () => {
    updateInProgress(!inProgress);
  };

  const handleCompletedToggle = () => {
    updateCompleted(!completed);
  };

  const handleNotConfirmedToggle = () => {
    updateNotConfirmed(!notConfirmed);
  };

  const stageCalc = (s) => {
    if (s === "Printing") return 1;
    else if (s === "Cutting") return 2;
    else if (s === "Tracing") return 3;
    else if (s === "Carving") return 4;
  };

  const handleModeChange = (e) => {
    updateStage(e.target.value);
  };

  return (
    <div style={{ padding: "5px", width: "15%", top: "10px", position: "sticky" }}>
      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <label
          htmlFor="year"
          style={{ marginRight: "10px", fontWeight: "bold" }}
        >
          Year:
        </label>
        <div style={{ display: "flex", alignItems: "center", "justifyContent": "center", textAlign: "center" }}>
          <button
            style={{
              padding: "5px",
              borderRadius: "50%",
              marginRight: "10px",
              textAlign: "center"
            }}
            onClick={() => handleYearChange(year - 1)}
          >
            &#8592;
          </button>
          <div style={{
            textAlign: "center"
          }}>{year}</div>
          <button
            style={{
              padding: "5px",
              borderRadius: "50%",
              marginLeft: "10px",
              textAlign: "center"
            }}
            onClick={() => handleYearChange(year + 1)}
          >
            &#8594;
          </button>
        </div>

        <div>
          <button className={styles.weekButton} style={{ backgroundColor: "#9adb97" }}>
            Week 1: {week1Total}
          </button>
        </div>
        <div>
          <button className={styles.weekButton} style={{ backgroundColor: "#d18287" }}>
            Week 2: {week2Total}
          </button>
        </div>
        <div>
          <button className={styles.weekButton} style={{ backgroundColor: "#72a1d4" }}>
            Both: {uniqueTotal}
          </button>
        </div>
      </div>

      <div className={styles.categoryBlock} style={{ position: "relative", height: "65%", overflow: "auto" }}>
        <div style={{ display: "flex", flexDirection: "column", width: "95%"}}>
        <button
              className={styles.selectedButton}
              onClick={() => handleToggleSelectionCategory(-1)}
              style={{ fontWeight: "bold" }}>
              Show All
        </button>
          {categoryData.map((item, index) => (
            <div key={`category_${item.cid}`} style={{ width: "100%" }}>
              <button
                // className={notStarted ? "selected" : ""}
                onClick={() => handleToggleSelectionCategory(index)}
                className={item.isSelected ? styles.selectedButton : styles.notSelectedButton}
              // style={{
              //   width: "90%",
              //   diplay: "block",
              //   padding: "5px 10px",
              //   borderRadius: "20px",
              //   backgroundColor: completed ? "#f97316" : "transparent",
              //   color: completed ? "#fff" : "#b0b0b0",
              //   border: "1px solid #333",
              //   cursor: "pointer",
              //   margin: "auto",
              // }}
              >
                {`${item.cname}\n`}
                <b>{`(${item.isSelected ? item.selectedCount : 0}/${item.isSelected ? item.totalCount : 0})`}</b>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeftPaneSelect;