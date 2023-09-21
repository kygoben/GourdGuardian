import React, { use } from "react";
import { useEffect } from "react";
import { debounce } from "lodash";

const PaginationButtons = ({
  updateCurrentPage,
  itemsPerPage,
  length,
  updateItemsPerPage,
  updateShowQuickAdd,
  searchTerm,
  updateSearchTerm,
  autoFocus,
}) => {
  useEffect(() => {}, [searchTerm]);
  const updateSearchTermDebounced = debounce(updateSearchTerm, 300);
  const buttonStyle = {
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "4px",
    color: "#fff",
    padding: "10px 20px",
    cursor: "pointer",
    fontSize: "16px",
    margin: "0 5px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
  };

  const activeButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#0056b3",
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "#b0b0b0",
      }}
    >
      <div style={{ display: 'flex', gap: '10px' }}>
        <div style={{ position: "relative", width: "200px" }}>
          <input
            id="search"
            type="text"
            placeholder="Search Here"
            defaultValue={searchTerm}
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
            autoFocus={autoFocus}
            onChange={(e) => {
              e.preventDefault();
              updateSearchTermDebounced(e.target.value);
            }}
          />
          {searchTerm && (
            <span
              onClick={() => {
                updateSearchTerm("");
                document.getElementById("search").value = "";
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
      </div>
  
      <button
        onClick={() => updateShowQuickAdd((prev) => !prev)}
        style={buttonStyle}
      >
        Quick Add
      </button>
  
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
              border: "1px solid #333",
              borderRadius: "4px",
              padding: "10px 20px",
              backgroundColor: "#282828",
              color: "#b0b0b0",
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
