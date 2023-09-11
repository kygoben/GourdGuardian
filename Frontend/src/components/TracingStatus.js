import React from 'react';
import styles from "@/styles/statusData.module.css";

function TracingStatus({ item, handleEdit, week, searchTerm, notStarted, inProgress, completed, isConfirmed, notConfirmed, currentDate }) {
  if (
    (item.sid.toLowerCase() !== searchTerm.toLowerCase() && item.tracing_by?.toLowerCase() !== searchTerm.toLowerCase() && searchTerm !== "") ||
    (item.week !== week && week !== "Both") ||
    ((item.tracing_start && notStarted) || (item.tracing_end && !completed && !inProgress) || (!item.tracing_end && !inProgress && !notStarted)) ||
    ((item.tracing_confirmed && !isConfirmed) || (!item.tracing_confirmed && !notConfirmed))
  ) {
    return null;
  }

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
        ></input>
        <button className={styles.greenButton} onClick={() => handleEdit(item, "tracing_start", currentDate.toISOString())}>
          ✓
        </button>
        <button className={styles.redButton} onClick={() => handleEdit(item, "tracing_start", null)}>
          X
        </button>
      </td>
      <td className={styles.tableCell}>
        <input
          type="datetime-local"
          value={item.tracing_end || ""}
          onChange={(e) => handleEdit(item, "tracing_end", e.target.value)}
        ></input>
        <button className={styles.greenButton} onClick={() => handleEdit(item, "tracing_end", currentDate.toISOString())}>
          ✓
        </button>
        <button className={styles.redButton} onClick={() => handleEdit(item, "tracing_end", null)}>
          X
        </button>
      </td>
      <td className={styles.tableCell}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleEdit(item, "tracing_by", document.getElementById(`tracing_by_${item.sid}_${item.index}`).value);
          }}
        >
          <input
            id={`tracing_by_${item.sid}_${item.index}`}
            type="text"
            placeholder={"No Tracer Assigned"}
            defaultValue={item.tracer}
          />
          <button type="submit" className={styles.greenButton}>
            ✓
          </button>
          <button
            className={styles.redButton}
            onClick={() => {
              handleEdit(item, "tracing_by", null);
              document.getElementById(`tracing_by_${item.sid}_${item.index}`).value = null;
            }}
          >
            X
          </button>
        </form>
      </td>
      <td className={styles.tableCell}>
        {item.tracing_confirmed ? "Confirmed" : "Not Confirmed"}
        <button className={styles.greenButton} onClick={() => handleEdit(item, "tracing_confirmed", currentDate.toISOString())}>
          ✓
        </button>
        <button className={styles.redButton} onClick={() => handleEdit(item, "tracing_confirmed", null)}>
          X
        </button>
      </td>
    </>
  );
}

export default TracingStatus;
