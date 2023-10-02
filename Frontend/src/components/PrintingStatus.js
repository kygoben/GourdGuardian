import React from "react";
import styles from "@/styles/statusData.module.css";
import { useState, useEffect } from "react";

function PrintingStatus({
  item,
  handleEdit,
  week,
  searchTerm,
  notStarted,
  completed,
}) {

  useEffect(() => {
    console.log("item", item);
  }, [item]);
  
    return (
      <>
        <td className={styles.tableCell}>{item.sid}</td>
        {week === "Both" && <td className={styles.tableCell}>{item.week}</td>}
        <td className={styles.tableCell}>{item.stencils.title}</td>
        <td className={styles.tableCell}>
        <span
          className={
            item.printing_confirmed ? styles.confirmed : styles.notConfirmed
          }
        >
          {item.printing_confirmed ? "Confirmed" : "Not Confirmed"}
        </span>
          <div>
            <button
              className={styles.greenButton}
              onClick={() => handleEdit(item, "printing_confirmed", 1)}
            >
              Complete
            </button>
            <button
              className={styles.redButton}
              onClick={() => handleEdit(item, "printing_confirmed", 0)}
            >
              Clear
            </button>
            </div>
        </td>
      </>
    );
  }

export default PrintingStatus;
