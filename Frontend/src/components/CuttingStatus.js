import React from "react";
import styles from "@/styles/statusData.module.css";
import { useState, useEffect } from "react";
import Viewer from "./Viewer";

function CuttingStatus({
  item,
  handleEdit,
  week, showPdf, 
  searchTerm,
  notStarted,
  completed,
}) {
  return (
    <>
      <td className={styles.tableCell}>
        <Viewer stencilId={item.sid} showPdf={showPdf} />
      </td>
      {week === "Both" && <td className={styles.tableCell}>{item.week}</td>}
      <td className={styles.tableCell}>{item.stencils.title}</td>
      <td className={styles.tableCell}>
        <div className="flex items-center space-x-2">
          <div
            className="flex-shrink-0 cursor-pointer"
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
                <i className="fas fa-check-square"></i> Cutting Confirmed
              </span>
            ) : (
              <span className="text-red-500">
                <i className="far fa-square"></i> Cutting Unconfirmed
              </span>
            )}
          </div>
        </div>
      </td>
    </>
  );
}

export default CuttingStatus;
