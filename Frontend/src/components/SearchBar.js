import React from "react";

const SearchBar = ({ searchTerm, updateSearchTerm }) => {
  const searchBarStyle = {
    background: "#111",
    color: "#fff",
    padding: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const inputStyle = {
    flex: 1,
    marginRight: "10px",
    padding: "5px",
    borderRadius: "4px",
    border: "none",
    fontSize: "16px",
    color: "black",
  };

  const buttonStyle = {
    backgroundColor: "#007bff",
    color: "#fff",
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
