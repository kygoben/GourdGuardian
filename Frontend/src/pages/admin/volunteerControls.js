import React, { use } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/AdminNav";
import { supabase } from "./../../../supabaseConnection.js";
import { useState, useEffect } from "react"; // Import useEffect and useState

export default function Status() {
  const router = useRouter();
  const [year, setYear] = useState("");
  const [week, setWeek] = useState("");
  const [stage, setStage] = useState("");

  useEffect(() => {

    getAdminData();
  }, []);

    async function getAdminData() {
    // Fetch data from cookie when the component mounts
    let { data, error } = await supabase
      .from("admin_data")
      .select("*");

    if (data.length > 0) {
      setYear(data[0].year);
      setWeek(data[0].week);
      setStage(data[0].stage);
    
      console.log(data);
  }
}


  const handleSubmit = async () => {

    let { data, error } = await supabase
      .from("admin_data")
      .update({ year: year, week: week, stage: stage })
      .eq("uid", "admin")
      .select();
  };

  return (
    <>
      <Navbar />
      <div>
        This is the screen for the admin to change the year, week, stage for volunteer interface.
      </div>
      <input
            className="border-2 border-black rounded-md w-72 p-2 mb-2"
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="year"
          />
      <input
            className="border-2 border-black rounded-md w-72 p-2 mb-2"
            type="number"
            value={week}
            onChange={(e) => setWeek(e.target.value)}
            placeholder="week"
          />
      <input
            className="border-2 border-black rounded-md w-72 p-2 mb-2"
            type="number"
            value={stage}
            onChange={(e) => setStage(e.target.value)}
            placeholder="stage"
          />
      <button
            className="border-2 border-black rounded-md w-32 p-2 m-2"
            onClick={handleSubmit}
          >
            Submit
          </button>
    </>
  );
}
