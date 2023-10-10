import React, { useEffect } from "react";
import styles from "@/styles/statusData.module.css";
import { useState } from "react";
import { debounce, set } from "lodash";
import Viewer from "./Viewer";
import { da, it } from "date-fns/locale";
import "@fortawesome/fontawesome-free/css/all.css";

function TracingStatus({ item, handleEdit, week, currentDate, showPdf }) {
  const [isEditingTracingBy, setIsEditingTracingBy] = useState(false);
  const [tracingByValue, setTracingByValue] = useState(item.tracing_by || "");
  const [tracingTemp, setTracingTemp] = useState(item.tracing_by || "");

  useEffect(() => {
    // console.log("item", item);
  }, [item]);

  const handleTracingByChange = (e) => {
    setTracingTemp(e.target.value);
    // setTracingByValue(e.target.value);
  };

  const submitTracingBy = (e) => {
    if (e.key === "Enter") {
      handleEdit(item, "tracing_by", tracingTemp);
      setTracingByValue(tracingTemp);
      setIsEditingTracingBy(false);
    }
  };

  const handleUnfocus = (e) => {
    setTracingTemp(tracingByValue);
    setIsEditingTracingBy(false);
  };

  const formatTracingDate = (date) => {
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

  const formattedTracingStart = formatTracingDate(item.tracing_start);
  const formattedTracingEnd = item.tracing_end
    ? formatTracingDate(item.tracing_end)
    : "";

  return (
    <>
      <td className={styles.tableCell}>
        <Viewer stencilId={item.sid} showPdf={showPdf} />
      </td>
      {week === "Both" && (
        <td
          className={styles.tableCell}
        >
          {item.week}
        </td>
      )}

      <td className={styles.tableCell}>{item.stencils.title}</td>
      <td className={styles.tableCell}>
        <div className="flex items-center justify-between">
          <div>{formattedTracingStart}</div>
          <div className="flex space-x-2">
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
        </div>
      </td>
      <td className={styles.tableCell}>
        <div className="flex items-center justify-between">
          <div>{formattedTracingEnd}</div>
          <div className="flex space-x-2">
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
        </div>
      </td>
      <td className={styles.tableCell}>
        <div style={{ position: "relative", width: "200px" }}>
          {isEditingTracingBy ? (
            <input
              style={{ width: "100%", boxSizing: "border-box" }}
              value={tracingTemp}
              onChange={handleTracingByChange}
              onKeyDown={submitTracingBy}
              onBlur={handleUnfocus}
              autoFocus
            />
          ) : (
            <span onClick={() => setIsEditingTracingBy(true)}>
              {item.tracing_by || "No Tracer"}
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
                "tracing_confirmed",
                item.tracing_confirmed ? null : new Date().toISOString()
              )
            }
          >
            {item.tracing_confirmed ? (
              <span className="text-green-500">
                <i className="fas fa-check-square"></i> Tracing Confirmed
              </span>
            ) : (
              <span className="text-red-500">
                <i className="far fa-square"></i> Tracing Unconfirmed
              </span>
            )}
          </div>
        </div>
      </td>
    </>
  );
}

export default TracingStatus;
