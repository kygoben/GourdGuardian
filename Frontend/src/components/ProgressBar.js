import React, { useState, useEffect } from "react";
import { supabase } from "./../../supabaseConnection.js";

const ProgressBar = () => {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const getPercentage = async () => {
      const { data: totalData, error: totalError } = await supabase.from('sstatus').select('sid');
      const { data: completeData, error: completeError } = await supabase.from('sstatus').select('sid').not('carving_confirmed', 'is', null);
  
      if (!totalError && !completeError) {
        const totalCount = totalData.length;
        const completeCount = completeData.length;
        const temp = Math.round((completeCount / totalCount) * 100 * 2) / 2;
        setPercentage(temp);
      }
    };

    getPercentage();
  }, []);

  return (
    <div className="text-gray-900 p-2 flex items-center">
      <div className="flex gap-2.5 items-center">
        <div>Progress:</div>
        <div className="w-32 h-2 bg-orange-500 rounded-full relative overflow-hidden">
          <div className="absolute top-0 left-0 h-full bg-yellow-800 rounded-full flex items-center justify-center" style={{ width: `${percentage}%` }}>
            {percentage > 5 && <span className="text-xs">{percentage}%</span>}
          </div>
        </div>
        {percentage <= 5 && <span className="ml-2.5">{percentage}%</span>}
      </div>
    </div>
  );
};

export default ProgressBar;
