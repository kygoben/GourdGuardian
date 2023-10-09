import React from "react";
import styles from "@/styles/statusData.module.css";
import { useState } from "react";
import Viewer from "./Viewer";

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
  currentDate, showPdf 
}) {

  const [isEditingCarvingBy, setIsEditingCarvingBy] = useState(false);
  const [carvingByValue, setCarvingByValue] = useState(item.carving_by || "");
  const [carvingTemp, setCarvingTemp] = useState(item.carving_by || "");

  const handleCarvingByChange = (e) => {
    setCarvingTemp(e.target.value);
    // setCarvingByValue(e.target.value);
  };

  const submitCarvingBy = (e) => {
    if (e.key === "Enter") {
      handleEdit(item, "carving_by", carvingTemp);
      setCarvingByValue(carvingTemp);
      setIsEditingCarvingBy(false);
    }
  };

  const handleUnfocus = (e) => {
    setCarvingTemp(carvingByValue);
    setIsEditingCarvingBy(false);
  };

  const formatCarvingDate = (date) => {
    if (!date) return "";
    const carvingDate = new Date(date);
    return carvingDate.toLocaleString("en-US", {
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
      <td className={styles.tableCell}>
        <Viewer stencilId={item.sid} showPdf={showPdf} />
      </td>
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
          {isEditingCarvingBy ? (
            <input
              style={{ width: "100%", boxSizing: "border-box" }}
              value={carvingTemp}
              onChange={handleCarvingByChange}
              onKeyDown={submitCarvingBy}
              onBlur={handleUnfocus}
              autoFocus
            />
          ) : (
            <span onClick={() => setIsEditingCarvingBy(true)}>
              {item.carving_by || "No Tracer"}
            </span>
          )}
        </div>
      </td>
      <td className={styles.tableCell}>
        <div className="flex items-center space-x-2">
          <div
            className="flex-shrink-0 cursor-pointer"
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
                <i className="fas fa-check-square"></i> Carving Confirmed
              </span>
            ) : (
              <span className="text-red-500">
                <i className="far fa-square"></i> Carving Unconfirmed
              </span>
            )}
          </div>
        </div>
      </td>
    </>
  );
}
export default CarvingStatus;
