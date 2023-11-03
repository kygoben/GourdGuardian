import React, { useEffect } from "react";
import { debounce } from "lodash";
import Switch from "react-switch";

const SearchBarSelect = ({
  searchTerm,
  updateSearchTerm,
  autoFocus
}) => {
  useEffect(() => {}, [searchTerm]);

  const updateSearchTermDebounced = debounce(updateSearchTerm, 300);

  return (
    <div className="flex items-center justify-between space-x-4 w-full" style={{top: "10px", position: "sticky"}}>
      <div className="relative w-48">
        <input
          id="search"
          type="text"
          placeholder="Search Here"
          defaultValue={searchTerm}
          autoComplete="off"
          className="w-full px-5 py-1 pr-8 rounded border border-gray-600"
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
            className="absolute right-2.5 top-1/2 transform -translate-y-1/2 cursor-pointer"
          >
            x
          </span>
        )}
      </div>
    </div>
  );
};

export default SearchBarSelect;
