import React from "react";
import styles from "@/styles/statusData.module.css";

function PrintingStatus({
  item,
  handleEdit,
  week,
  searchTerm,
  notStarted,
  completed,
}) {
  if (
    (item.sid.toLowerCase() === searchTerm.toLowerCase() ||
      searchTerm === "") &&
    (item.week === week || week === "Both") &&
    ((!item.printing && notStarted) || (item.printing && completed))
  ) {
    return (
      <>
        <td className={styles.tableCell}>{item.sid}</td>
        {week === "Both" && <td className={styles.tableCell}>{item.week}</td>}
        <td className={styles.tableCell}>{item.stencils.title}</td>
        <td className={styles.tableCell}>
          {item.printing ? "Complete" : "Incomplete"}
          <button
            className={styles.greenButton}
            onClick={() => handleEdit(item, "printing", 1)}
          >
            ✓
          </button>
          <button
            className={styles.redButton}
            onClick={() => handleEdit(item, "printing", 0)}
          >
            X
          </button>
        </td>
      </>
    );
  }
  return null;
}

export default PrintingStatus;
