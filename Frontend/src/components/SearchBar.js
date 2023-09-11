import React from "react";

const SearchBar = ({ searchTerm, updateSearchTerm }) => {
  const searchBarStyle = {
    background: "#181818",  // Dark background color
    color: "#b0b0b0",  // Lighter text color for better contrast against the dark background
    padding: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: "5px",  // Adding border-radius for a rounded corner effect
  };

  const inputStyle = {
    flex: 1,
    marginRight: "10px",
    padding: "5px",
    borderRadius: "4px",
    border: "1px solid #333",  // Adding a subtle border
    fontSize: "16px",
    color: "#b0b0b0",  // Lighter text color for better contrast against the dark background
    background: "#282828",  // Dark background color for the input field
  };

  const buttonStyle = {
    backgroundColor: "#007bff",  // Blue background color for the buttons
    color: "#fff",  // White text color for the buttons
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    marginLeft: "5px",
    padding: "5px 10px",
  };

  return (
    <div style={searchBarStyle}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateSearchTerm(document.getElementById("search").value);
        }}
      >
        <input
          id="search"
          type="text"
          placeholder="Search Here"
          defaultValue={searchTerm}
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>
          Search ✓
        </button>
        <button
          onClick={() => {
            updateSearchTerm("");
            document.getElementById("search").value = "";
          }}
          style={buttonStyle}
        >
          Clear X
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
