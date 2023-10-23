import React, { use } from "react";
import { useEffect } from "react";
import { debounce } from "lodash";

const PaginationButtons = ({
  updateCurrentPage,
  itemsPerPage,
  length,
  updateItemsPerPage,
}) => {
  const buttonStyle = {
    backgroundColor: "#f97316",
    border: "none",
    borderRadius: "4px",
    color: "#fff",
    padding: "10px 20px",
    cursor: "pointer",
    fontSize: "16px",
    margin: "0 5px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
  };


  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "#b0b0b0",
        padding: "10px",
      }}
    >

  
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <button
          style={buttonStyle}
          onClick={() => updateCurrentPage((prev) => Math.max(prev - 1, 1))}
        >
          Previous
        </button>
        <button
          style={buttonStyle}
          onClick={() =>
            updateCurrentPage((prev) =>
              Math.min(prev + 1, Math.ceil(length / itemsPerPage))
            )
          }
        >
          Next
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <label htmlFor="itemsPerPage" style={{ fontSize: "16px" }}>
            Items per page:
          </label>
          <select
            id="itemsPerPage"
            style={{
              borderRadius: "4px",
              padding: "10px 20px",
              backgroundColor: "#f97316",
              color: "#fff",
            }}
            value={itemsPerPage}
            onChange={(e) => updateItemsPerPage(Number(e.target.value))}
          >
            <option value={100}>100</option>
            <option value={400}>400</option>
            <option value={800}>800</option>
            <option value={1800}>1800</option>
          </select>
        </div>
      </div>
    </div>
  );
  
};

export default PaginationButtons;
