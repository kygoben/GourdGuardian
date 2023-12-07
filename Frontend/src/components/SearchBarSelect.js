import React, { useEffect } from "react";
import { debounce } from "lodash";
import Switch from "react-switch";

const SearchBarSelect = ({
  searchTerm,
  updateSearchTerm,
  autoFocus,
  showAllStencils,
  updateShowAllStencils,
  printStencils,
  mergedPdfUrl,
  markAsPrinted,
  markAsNotPrinted,
}) => {
  useEffect(() => { }, [searchTerm]);

  const updateSearchTermDebounced = debounce(updateSearchTerm, 300);

  return (
    <div className="flex items-center justify-between w-full" style={{ top: "15px", position: "sticky", backgroundColor: "white"}}>
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
      <div className="flex items-center">
        <button
          className="px-1 py-1 rounded bg-orange-500 text-white"  // Adjusted padding and background color
          onClick={printStencils}
        >
          Generate PDF
        </button>

        {mergedPdfUrl && (
          <a
            href={mergedPdfUrl}
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1 rounded bg-orange-500 text-white ml-2"  // Adjusted padding and background color
          >
            Print
          </a>
        )}
        <button
          className="px-3 py-1 rounded bg-orange-500 text-white ml-2"  // Adjusted padding and background color
          onClick={markAsPrinted}
        >
          Mark as printed
        </button>
        <button
          className="px-3 py-1 rounded bg-orange-500 text-white ml-2"  // Adjusted padding and background color
          onClick={markAsNotPrinted}
        >
          Mark as not printed
        </button>
      </div>
      <div className="flex items-center ">
        <div className="flex items-center">
          <span> Show all stencils </span>
          <Switch
            checked={showAllStencils}
            onChange={() => updateShowAllStencils(!showAllStencils)}
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
    </div >
  );
};

export default SearchBarSelect;
