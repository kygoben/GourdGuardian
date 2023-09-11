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
  const weeks = [1, 2, 'Both']; // Update with your desired weeks
  const stages = ["Printing", "Cutting", 'Tracing', "Carving"]; // Update with your desired stages

  const handleYearChange = (newYear) => {
    const parsedYear = parseInt(newYear);
    if (!isNaN(parsedYear)) {
      updateYear(parsedYear);
    }
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
    if(s === "Printing") return 1;
    else if(s === "Cutting") return 2;
    else if(s === "Tracing") return 3;
    else if(s === "Carving") return 4;
  }

  return (
    <div style={{ padding: "5px", backgroundColor: "#f0f0f0" }}>
      <div style={{ marginBottom: "20px" }}>
        <label
          htmlFor="year"
          style={{ marginRight: "10px", fontWeight: "bold" }}
        >
          Year:
        </label>
        <div style={{ display: "flex", alignItems: "center" }}>
          <button
            style={{ padding: "5px", borderRadius: "50%", marginRight: "10px" }}
            onClick={() => handleYearChange(year - 1)}
          >
            &#8592;
          </button>
          <input
            type="number"
            id="year"
            value={year}
            onChange={(e) => handleYearChange(e.target.value)}
            style={{
              width: "60px",
              padding: "5px",
              borderRadius: "5px",
              textAlign: "center",
            }}
          />
          <button
            style={{ padding: "5px", borderRadius: "50%", marginLeft: "10px" }}
            onClick={() => handleYearChange(year + 1)}
          >
            &#8594;
          </button>
        </div>
      </div>
      <div style={{ marginBottom: "20px" }}>
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
                backgroundColor: week === w ? "#007bff" : "transparent",
                color: week === w ? "#fff" : "#000",
                border: "1px solid #ccc",
                cursor: "pointer",
              }}
            >
              {w}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label
          htmlFor="stage"
          style={{ marginRight: "10px", fontWeight: "bold" }}
        >
          Stage:
        </label>
        <div style={{ display: "flex", flexDirection: 'column', gap: "5px" }}>
          {stages.map((s) => (
            <button
              key={s}
              className={stage === s ? "selected" : ""}
              onClick={() => updateStage(s)}
              style={{
                padding: "5px 10px",
                borderRadius: "20px",
                backgroundColor: stage === stageCalc(s) ? "#007bff" : "transparent",
                color: stage === stageCalc(s) ? "#fff" : "#000",
                border: "1px solid #ccc",
                cursor: "pointer",
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <label
          htmlFor="isConfirmed"
          style={{ fontWeight: "bold" }}
        >
          Confirmed:
        </label>
        <button
          className={isConfirmed ? "selected" : ""}
          onClick={handleNotConfirmedToggle}
          style={{
            padding: "5px 10px",
            borderRadius: "20px",
            backgroundColor: notConfirmed ? "#007bff" : "transparent",
            color: notConfirmed ? "#fff" : "#000",
            border: "1px solid #ccc",
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
            backgroundColor: isConfirmed ? "#007bff" : "transparent",
            color: isConfirmed ? "#fff" : "#000",
            border: "1px solid #ccc",
            cursor: "pointer",
          }}
        >
          Is Confirmed
        </button>
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
              backgroundColor: notStarted ? "#007bff" : "transparent",
              color: notStarted ? "#fff" : "#000",
              border: "1px solid #ccc",
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
              backgroundColor: inProgress ? "#007bff" : "transparent",
              color: inProgress ? "#fff" : "#000",
              border: "1px solid #ccc",
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
              backgroundColor: completed ? "#007bff" : "transparent",
              color: completed ? "#fff" : "#000",
              border: "1px solid #ccc",
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
