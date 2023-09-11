import React from "react";
import styles from "@/styles/statusData.module.css";

function TracingStatus({
  item,
  handleEdit,
  week,
  searchTerm,
  notStarted,
  inProgress,
  completed,
  isConfirmed,
  notConfirmed,
  currentDate,
}) {
  if (
    (item.sid.toLowerCase() === searchTerm.toLowerCase() ||
      searchTerm === "" ||
      item.tracing_by?.toLowerCase() === searchTerm.toLowerCase() ||
      searchTerm === "") &&
    (item.week === week || week === "Both") &&
    ((!item.tracing_start && notStarted) ||
      (!item.tracing_end && inProgress && item.tracing_start) ||
      (item.tracing_end && completed)) &&
    ((item.tracing_confirmed && isConfirmed) ||
      (!item.tracing_confirmed && notConfirmed))
  ) {
    return (
      
    <>
    <td className={styles.tableCell}>{item.sid}</td>
    {week === "Both" && <td className={styles.tableCell}>{item.week}</td>}
    <td className={styles.tableCell}>{item.stencils.title}</td>
    <td className={styles.tableCell}>
      <input
        type="datetime-local"
        value={item.tracing_start || ""}
        onChange={(e) => handleEdit(item, "tracing_start", e.target.value)}
        style={{ backgroundColor: "#282828", color: "#b0b0b0", border: "1px solid #333", borderRadius: "4px", padding: "5px", fontSize: "14px"  }}
      ></input>
      <div>
        <button
          className={styles.greenButton}
          onClick={() =>
            handleEdit(item, "tracing_start", currentDate.toISOString())
          }
        >
          ✓
        </button>
        <button
          className={styles.redButton}
          onClick={() => handleEdit(item, "tracing_start", null)}
        >
          X
        </button>
      </div>
    </td>
        <td className={styles.tableCell}>
          <input
            type="datetime-local"
            value={item.tracing_end || ""}
            style={{ backgroundColor: "#282828", color: "#b0b0b0", border: "1px solid #333", borderRadius: "4px", padding: "5px" , fontSize: "14px" }}
            onChange={(e) => handleEdit(item, "tracing_end", e.target.value)}
          ></input>
          <div>
            <button
              className={styles.greenButton}
              onClick={() =>
                handleEdit(item, "tracing_end", currentDate.toISOString())
              }
            >
              ✓
            </button>
            <button
              className={styles.redButton}
              onClick={() => handleEdit(item, "tracing_end", null)}
            >
              X
            </button>
          </div>
        </td>
        <td className={styles.tableCell}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleEdit(
                item,
                "tracing_by",
                document.getElementById(`tracing_by_${item.sid}_${item.index}`)
                  .value
              );
            }}
          >
            <input
              id={`tracing_by_${item.sid}_${item.index}`}
              type="text"
              style={{ backgroundColor: "#282828", color: "#b0b0b0", border: "1px solid #333", borderRadius: "4px", padding: "5px", fontSize: "14px"  }}
              placeholder={"No Tracer"}
              defaultValue={item.tracer}
            />
            <div>
              <button type="submit" className={styles.greenButton}>
                Save
              </button>
              <button
                className={styles.redButton}
                onClick={() => {
                  handleEdit(item, "tracing_by", null);
                  document.getElementById(
                    `tracing_by_${item.sid}_${item.index}`
                  ).value = null;
                }}
              >
                Clear
              </button>
            </div>
          </form>
        </td>
        <td className={styles.tableCell}>
          {item.tracing_confirmed ? "Confirmed" : "Not Confirmed"}
          <div>
            <button
              className={styles.greenButton}
              onClick={() =>
                handleEdit(item, "tracing_confirmed", currentDate.toISOString())
              }
            >
              Confirm
            </button>
            <button
              className={styles.redButton}
              onClick={() => handleEdit(item, "tracing_confirmed", null)}
            >
              Clear
            </button>
          </div>
        </td>
      </>
    );
  }
  return null;
}

export default TracingStatus;
