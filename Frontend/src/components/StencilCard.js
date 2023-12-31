import React from "react";
import styles from "@/styles/selectData.module.css";
import { useState, useEffect } from "react";
import { supabase } from "./../../supabaseConnection.js";

function StencilCard({
  item,
  year,
  rowIndex,
  handleEdit,
  week, showPdf
}) {

  useEffect(() => {
    // console.log("item", item);
  }, []);

  function fetchImg(stencil) {
    // console.log("Fetching PDF for stencilId:", currentStencilId);

    try {
      if (!stencil.pdfAvailable) {
        const { data, error } = supabase.storage
          .from("extras")
          .getPublicUrl(`unavailablePdf.jpg`);

        if (error) {
          throw error;
        }

        return data.publicUrl;
      } else {
        const { data, error } = supabase.storage
          .from("stencils_img")
          .getPublicUrl(`${stencil.sid}.jpg`);

        if (error) {
          throw error;
        }

        return data.publicUrl;
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSelection = async () => {
    if (item.selectionWeek === 0) {
      const { data, error } = await supabase
        .from("sstatus")
        .insert([{ sid: item.sid, year: year, week: 1 }])
        .select();
      if (error) {
        console.error("Error inserting data", error);
      }
      console.log("Inserted row:", data);

    } else if (item.selectionWeek === 1) {
      const { data, error } = await supabase
        .from("sstatus")
        .update({ week: 2 })
        .eq("sid", item.sid)
        .eq("year", year)
        .eq("week", item.selectionWeek)
        .select();
      if (error) {
        console.error("Error updating data", error);
      }
      console.log("Updated row:", data);

    } else if (item.selectionWeek === 2) {
      const { data, error } = await supabase
        .from("sstatus")
        .insert([{ sid: item.sid, year: year, week: 1 }])
        .select();
      if (error) {
        console.error("Error inserting data", error);
      }
      console.log("Inserted row:", data);

    } else if (item.selectionWeek === 3) {
      const { error } = await supabase
        .from('sstatus')
        .delete()
        .eq('sid', item.sid)
        .eq('year', year);
      if (error) {
        console.error("Error deleting data", error);
      }
      console.log("Deleted rows");
    }
  };

  const backGroundColors = ["transparent", "#9adb97", "#d18287", "#72a1d4"];

  return (
    <>
      <div
        className={styles.stencilCard}
        onClick={handleSelection}
        // key={rowIndex}
        style={{
          backgroundColor: backGroundColors[item.selectionWeek],
          // color: week backGroundColors[]
          cursor: "pointer",
        }}
      >
        <img
          src={fetchImg(item)}
        ></img>
        <h3>{item.title}</h3>
        <p>{item.sid}</p>
      </div>
    </>
  );
}

export default StencilCard;
