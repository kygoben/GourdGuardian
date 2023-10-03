import React from "react";
import styles from "@/styles/statusData.module.css";

function CuttingStatus({
  item,
  handleEdit,
  week,
  searchTerm,
  notStarted,
  completed,
}) {
  return (
    <>
      <td className={styles.tableCell}>{item.sid}</td>
      {week === "Both" && <td className={styles.tableCell}>{item.week}</td>}
      <td className={styles.tableCell}>{item.stencils.title}</td>
      <td className={styles.tableCell}>
        <div className="flex items-center space-x-2">
          <div
            className="flex-shrink-0"
            onClick={() =>
              handleEdit(
                item,
                "cutting_confirmed",
                item.cutting_confirmed ? 0 : 1
              )
            }
          >
            {item.cutting_confirmed ? (
              <span className="text-green-500">
                <i className="fas fa-check-square"></i> Confirmed
              </span>
            ) : (
              <span className="text-red-500">
                <i className="far fa-square"></i> Not Confirmed
              </span>
            )}
          </div>
        </div>
      </td>
    </>
  );
}

export default CuttingStatus;
