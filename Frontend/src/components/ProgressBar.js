import { set } from "date-fns";
import React from "react";
import { supabase } from "./../../supabaseConnection.js";
import { useState, useEffect } from "react";

const ProgressBar = () => {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    getPercentage();
  }, []);

  const getPercentage = async () => {
    const { data: totalData, totalError } = await supabase.from('sstatus').select('sid');
    const { data: completeData, completeError } = await supabase.from('sstatus').select('sid').not('carving_confirmed', 'is', null);

    if (!totalError && !completeError) {
      const totalCount = totalData.length;
      const completeCount = completeData.length;
      let temp = (completeCount / totalCount) * 100;
      temp = Math.round(temp * 2) / 2;
      setPercentage(temp);
    }
  };

  return (
    <div className="bg-gray-800 text-white p-4 flex items-center">
      <div className="flex items-center space-x-2">
        <div>Progress:</div>
        <div className="relative w-52 h-5 bg-gray-300 rounded-full overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-blue-500 rounded-full flex items-center justify-center"
            style={{ width: `${percentage}%` }}
          >
            {percentage > 5 && <span>{percentage}%</span>}
          </div>
        </div>
        {percentage <= 5 && <span className="ml-2">{percentage}%</span>}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded shadow"
          onClick={getPercentage}
        >
          Refresh
        </button>
      </div>
    </div>
  );
  
};

export default ProgressBar;
