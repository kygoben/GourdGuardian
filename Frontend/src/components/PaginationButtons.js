import React from "react";



const PaginationButtons = ( {setCurrentPage, itemsPerPage} ) => {
    return(
    <div className="flex justify-between items-center my-4">
  
  <div className="flex space-x-2">
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-l border border-white shadow"
      onClick={() => setCurrentPage(1)}
    >
      First
    </button>
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-white shadow"
      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
    >
      Previous
    </button>
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-white shadow"
      onClick={() =>
        setCurrentPage((prev) =>
          Math.min(prev + 1, Math.ceil(data.length / itemsPerPage))
        )
      }
    >
      Next
    </button>
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r border border-white shadow"
      onClick={() => setCurrentPage(Math.ceil(data.length / itemsPerPage))}
    >
      Last
    </button>
  </div>
  <div className="flex space-x-2 items-center">
    <label htmlFor="itemsPerPage" className="text-lg">
      Items per page:
    </label>
    <select
      id="itemsPerPage"
      className="border rounded py-2 px-4"
      value={itemsPerPage}
      onChange={(e) => setItemsPerPage(Number(e.target.value))}
    >
      <option value={100}>100</option>
      <option value={400}>400</option>
      <option value={800}>800</option>
      <option value={1800}>1800</option>
    </select>
  </div>
</div>);
  }

  export default PaginationButtons;