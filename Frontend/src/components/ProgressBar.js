import React, { useState, useEffect } from "react";

const ProgressBar = ({ total, finished }) => {
  const percentage = total !== 0 ? (finished / total) * 100 : 0;

  useEffect(() => {
    // console.log("total", total);
    // console.log("finished", finished);
    // console.log("percentage", percentage);
  }, [total, finished]);

  return (
    <div className="w-1/3 mx-auto bg-e0e0e0 rounded h-5 relative overflow-hidden border border-gray-400">
      <div className={`bg-orange-500 transition-width ease-out duration-300 h-full`} style={{ width: `${percentage}%` }}></div>
      <div className="absolute inset-0 flex justify-center items-center text-sm text-black font-medium">
        {finished} / {total}
      </div>
    </div>
  );
};

export default ProgressBar;
