import React, { useEffect } from "react";
import { debounce } from "lodash";
import Switch from "react-switch";

const SearchBar = ({
  updateShowQuickAdd,
  searchTerm,
  updateSearchTerm,
  autoFocus,
  showPdf,
  updateShowPdf,
  updateShowStatusAdd,
}) => {
  useEffect(() => {}, [searchTerm]);

  const updateSearchTermDebounced = debounce(updateSearchTerm, 300);

  return (
    <div className="flex items-center justify-between space-x-4 w-full">
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

      <div className="flex items-center space-x-4">
        <button
          onClick={() => updateShowQuickAdd((prev) => !prev)}
          className="px-5 py-2 text-white bg-orange-500 rounded shadow-md cursor-pointer"
        >
          Quick Confirm
        </button>

        <button
          onClick={() => updateShowStatusAdd((prev) => !prev)}
          className="px-5 py-2 text-white bg-orange-500 rounded shadow-md cursor-pointer"
        >
          Add Week to Stencil
        </button>

        <div className="flex items-center">
          <span >Show PDF</span>
          <Switch
            checked={showPdf}
            onChange={() => updateShowPdf(!showPdf)}
            onColor="#f97316"
            onHandleColor="#f97316"
            handleDiameter={30}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            height={20}
            width={48}
            className="ml-2"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
