import React from "react";

const LeftPane = ({
  year,
  week,
  stage,
  isConfirmed,
  notConfirmed,
  notStarted,
  inProgress,
  completed,
  updateYear,
  updateWeek,
  updateStage,
  updateIsConfirmed,
  updateNotConfirmed,
  updateNotStarted,
  updateInProgress,
  updateCompleted,
}) => {
  const weeks = [1, 2, "Both"]; // Update with your desired weeks

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
    <div style={{ padding: "5px", width: "15%" }}>
      <div className="mb-5">
        <label htmlFor="stage" className="mr-2 font-bold text-black">
          Mode:
        </label>
        <select
          id="stage"
          value={stageCalc(stage)}
          onChange={handleModeChange}
          style={{
            padding: "5px",
            borderRadius: "5px",
            border: "1px solid #333",
          }}
        >
          <option value={"Printing"}>Printing</option>
          <option value={"Cutting"}>Cutting</option>
          <option value={"Tracing"}>Tracing</option>
          <option value={"Carving"}>Carving</option>
        </select>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <label
          htmlFor="year"
          style={{ marginRight: "10px", fontWeight: "bold" }}
        >
          Year:
        </label>
        <div style={{ display: "flex", alignItems: "center", textAlign: "center" }}>
          <button
            style={{ padding: "5px", borderRadius: "50%" }}
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
              marginLeft: "10px"
            }}
            onClick={() => handleYearChange(year + 1)}
          >
            &#8594;
          </button>
        </div>
      </div>
      <div>
        <label
          htmlFor="week"
          style={{ marginRight: "10px", fontWeight: "bold" }}
        >
          Week:
        </label>
        <div style={{ display: "flex", gap: "10px" }}>
          {weeks.map((w) => (
            <button
              key={w}
              className={week === w ? "selected" : ""}
              onClick={() => updateWeek(w)}
              style={{
                padding: "5px 10px",
                borderRadius: "20px",
                backgroundColor: week === w ? "#f97316" : "transparent",
                color: week === w ? "#fff" : "#b0b0b0",
                border: "1px solid #333",
                cursor: "pointer",
              }}
            >
              {w}
            </button>
          ))}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginBottom: "20px",
        }}
      >
        <label
          htmlFor="year"
          style={{ marginRight: "10px", fontWeight: "bold" }}
        >
          Confirmed:
        </label>
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            className={isConfirmed ? "selected" : ""}
            onClick={handleNotConfirmedToggle}
            style={{
              padding: "5px 10px",
              borderRadius: "20px",
              backgroundColor: notConfirmed ? "#f97316" : "transparent",
              color: notConfirmed ? "#fff" : "#b0b0b0",
              border: "1px solid #333",
              cursor: "pointer",
            }}
          >
            Not Confirmed
          </button>
          <button
            className={isConfirmed ? "selected" : ""}
            onClick={handleIsConfirmedToggle}
            style={{
              padding: "5px 10px",
              borderRadius: "20px",
              backgroundColor: isConfirmed ? "#f97316" : "transparent",
              color: isConfirmed ? "#fff" : "#b0b0b0",
              border: "1px solid #333",
              cursor: "pointer",
            }}
          >
            Is Confirmed
          </button>
        </div>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <label
          htmlFor="status"
          style={{ marginRight: "10px", fontWeight: "bold" }}
        >
          Status:
        </label>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <button
            // className={notStarted ? "selected" : ""}
            onClick={handleNotStartedToggle}
            style={{
              padding: "5px 10px",
              borderRadius: "20px",
              backgroundColor: notStarted ? "#f97316" : "transparent",
              color: notStarted ? "#fff" : "#b0b0b0",
              border: "1px solid #333",
              cursor: "pointer",
            }}
          >
            Not Started
          </button>

          <button
            onClick={handleInProgressToggle}
            style={{
              padding: "5px 10px",
              borderRadius: "20px",
              backgroundColor: inProgress ? "#f97316" : "transparent",
              color: inProgress ? "#fff" : "#b0b0b0",
              border: "1px solid #333",
              cursor: "pointer",
            }}
          >
            In Progress
          </button>
          <button
            // className={notStarted ? "selected" : ""}
            onClick={handleCompletedToggle}
            style={{
              padding: "5px 10px",
              borderRadius: "20px",
              backgroundColor: completed ? "#f97316" : "transparent",
              color: completed ? "#fff" : "#b0b0b0",
              border: "1px solid #333",
              cursor: "pointer",
            }}
          >
            Completed
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeftPane;
