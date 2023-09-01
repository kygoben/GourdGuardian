import React from "react";

const LeftPane = ({
  year,
  week,
  stage,
  isConfirmed,
  updateYear,
  updateWeek,
  updateStage,
  updateIsConfirmed,
}) => {
  const weeks = [1, 2]; // Update with your desired weeks
  const stages = [1, 2, 3, 4]; // Update with your desired stages

  const handleYearChange = (newYear) => {
    const parsedYear = parseInt(newYear);
    if (!isNaN(parsedYear)) {
      updateYear(parsedYear);
    }
  };

  const handleIsConfirmedToggle = () => {
    updateIsConfirmed(!isConfirmed);
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#f0f0f0" }}>
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
        <div style={{ display: "flex", gap: "10px" }}>
          {stages.map((s) => (
            <button
              key={s}
              className={stage === s ? "selected" : ""}
              onClick={() => updateStage(s)}
              style={{
                padding: "5px 10px",
                borderRadius: "20px",
                backgroundColor: stage === s ? "#007bff" : "transparent",
                color: stage === s ? "#fff" : "#000",
                border: "1px solid #ccc",
                cursor: "pointer",
              }}
            >
              Stage {s}
            </button>
          ))}
        </div>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <label
          htmlFor="isConfirmed"
          style={{ marginRight: "10px", fontWeight: "bold" }}
        >
          Confirmed:
        </label>
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
          {isConfirmed ? "Confirmed" : "Not Confirmed"}
        </button>
      </div>
    </div>
  );
};

export default LeftPane;
