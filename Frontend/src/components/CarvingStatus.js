import React from "react";
import styles from "@/styles/statusData.module.css";

function CarvingStatus({
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

  const formatCarvingDate = (date) => {
    if (!date) return "";
    const tracingDate = new Date(date);
    return tracingDate.toLocaleString("en-US", {
      timeZone: "America/Chicago",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formattedCarvingStart = formatCarvingDate(item.carving_start);
  const formattedCarvingEnd = item.carving_end
    ? formatCarvingDate(item.carving_end)
    : "";
  return (
    <>
      <td className={styles.tableCell}>{item.sid}</td>
      {week === "Both" && <td className={styles.tableCell}>{item.week}</td>}
      <td className={styles.tableCell}>{item.stencils.title}</td>
      <td className={styles.tableCell}>
        <div className="flex items-center justify-between">
          <div>{formattedCarvingStart}</div>
          <div className="flex space-x-2">
            <button
              className={styles.greenButton}
              onClick={() =>
                handleEdit(item, "carving_start", currentDate.toISOString())
              }
            >
              ✓
            </button>
            <button
              className={styles.redButton}
              onClick={() => handleEdit(item, "carving_start", null)}
            >
              X
            </button>
          </div>
        </div>
      </td>
      <td className={styles.tableCell}>
        <div className="flex items-center justify-between">
          <div>{formattedCarvingEnd}</div>
          <div className="flex space-x-2">
            <button
              className={styles.greenButton}
              onClick={() =>
                handleEdit(item, "carving_end", currentDate.toISOString())
              }
            >
              ✓
            </button>
            <button
              className={styles.redButton}
              onClick={() => handleEdit(item, "carving_end", null)}
            >
              X
            </button>
          </div>
        </div>
      </td>
      <td className={styles.tableCell}>
        <div style={{ position: "relative", width: "200px" }}>
          {item.carving_by}
        </div>
      </td>
      <td className={styles.tableCell}>
        <div className="flex items-center space-x-2">
          <div
            className="flex-shrink-0"
            onClick={() =>
              handleEdit(
                item,
                "carving_confirmed",
                item.carving_confirmed ? null : new Date().toISOString()
              )
            }
          >
            {item.carving_confirmed ? (
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
export default CarvingStatus;
