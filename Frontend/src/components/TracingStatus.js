import React, { useEffect } from "react";
import styles from "@/styles/statusData.module.css";
import { useState } from "react";
import { debounce, set } from "lodash";
import Viewer from "./Viewer";
import { it } from "date-fns/locale";

function TracingStatus({ item, handleEdit, week, currentDate, showPdf }) {
  const [tracing_by, updateTracing_by] = useState(item.tracing_by);
  // const [showPdf, setShowPdf] = useState(false);

  useEffect(() => {
    handleEdit(item, "tracing_by", tracing_by);
  }, [tracing_by]);

  useEffect(() => {
    updateTracing_by(item.tracing_by);
  }, [item.tracing_by]);

  useEffect(() => {
  }, [item.tracing_confirmed]);

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
  const updateSearchTermDebounced = debounce(updateTracing_by, 300);

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
          className={`${
            item.week < 2
              ? "text-orange-500"
              : item.week > 1
              ? "text-black"
              : ""
          }`}
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
          <input
            id={`${item.sid}_${item.week}_tracing_by`}
            type="text"
            placeholder="No Tracer"
            defaultValue={tracing_by}
            autoComplete="off"
            style={{
              width: "100%",
              padding: "5px",
              paddingRight: "30px", // Make space for the "x"
              borderRadius: "5px",
              backgroundColor: "#282828",
              color: "#b0b0b0",
              border: "1px solid #333",
            }}
            onChange={(e) => {
              e.preventDefault();
              updateSearchTermDebounced(e.target.value);
            }}
          />
          {tracing_by && (
            <span
              onClick={() => {
                updateTracing_by("");
                document.getElementById(
                  `${item.sid}_${item.week}_tracing_by`
                ).value = "";
              }}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
            >
              x
            </span>
          )}
        </div>
      </td>
      <td className={styles.tableCell}>
        <div className="flex items-center space-x-2">
          <input
            id={`${item.sid}_${item.week}_${item.year}_confirmed`}
            type="checkbox"
            checked={item.tracing_confirmed}
            onChange={() => {
              handleEdit(
                item,
                "tracing_confirmed",
                item.tracing_confirmed ? null : new Date().toISOString()
              );
            }}
            className={`form-checkbox h-5 w-5 
      `}
          />
          <div className="flex-shrink-0">
            <span
              className={`${
                item.tracing_confirmed ? "text-green-500" : "text-red-500"
              }`}
            >
              {item.tracing_confirmed ? "Confirmed" : "Not Confirmed"}
            </span>
          </div>
        </div>
      </td>
    </>
  );
}

export default TracingStatus;
