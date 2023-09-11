import React, { useEffect, useState } from "react";
import { supabase } from "./../../supabaseConnection.js";
import styles from "@/styles/statusData.module.css";
import PrintingStatus from "./PrintingStatus";
import CuttingStatus from "./CuttingStatus";
import TracingStatus from "./TracingStatus";
import CarvingStatus from "./CarvingStatus";

const StatusData = ({
  initialData,
  year,
  week,
  stage,
  isConfirmed,
  notConfirmed,
  notStarted,
  inProgress,
  completed,
  searchTerm,
}) => {
  const [data, setData] = useState(initialData || []);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(100);
  const currentDate = new Date();

  useEffect(() => {
    if (year !== null) {
      getData();
    }
  }, [year]);

  const getData = async () => {
    console.log("Getting data");
    try {
      const { data: sstatusData, error } = await supabase
        .from("sstatus")
        .select("*, stencils(title)");

      if (error) {
        console.error("Error fetching data:", error);
        return;
      }
      sstatusData.sort((a, b) => {
        const sidA = a.sid.split("-").map(Number);
        const sidB = b.sid.split("-").map(Number);

        for (let i = 0; i < Math.max(sidA.length, sidB.length); i++) {
          const diff = (sidA[i] || 0) - (sidB[i] || 0);
          if (diff !== 0) {
            return diff;
          }
        }

        return 0;
      });
      console.log(sstatusData);

      setData(sstatusData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleEdit = async (item, field, value) => {
    try {
      const updateObject = { [field]: value };
      const { data: updatedData, error } = await supabase
        .from("sstatus")
        .update(updateObject)
        .eq("sid", item.sid)
        .eq("year", item.year)
        .eq("week", item.week)
        .select("*, stencils(title)");

      if (!error) {
        setData((prevData) => {
          const newData = [...prevData];
          const itemIndex = newData.findIndex((el) => el.sid === item.sid);
          if (itemIndex !== -1) {
            newData[itemIndex] = updatedData[0];
          }
          return newData;
        });
      } else {
        // Handle error as needed
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const stageComponents = {
    1: PrintingStatus,
    2: CuttingStatus,
    3: TracingStatus,
    4: CarvingStatus,
  };

  const StageComponent = stageComponents[stage];

  const headers = {
    1:
      week === "Both"
        ? ["SID", "Week", "Title", "Printing"]
        : ["SID", "Title", "Printing"],
    2:
      week === "Both"
        ? ["SID", "Week", "Title", "Cutting"]
        : ["SID", "Title", "Cutting"],
    3:
      week === "Both"
        ? [
            "SID",
            "Week",
            "Title",
            "Tracing Start",
            "Tracing End",
            "tracing_by",
            "Confirm?",
          ]
        : [
            "SID",
            "Title",
            "Tracing Start",
            "Tracing End",
            "tracing_by",
            "Confirm?",
          ],
    4:
      week === "Both"
        ? [
            "SID",
            "Week",
            "Title",
            "Carving Start",
            "Carving End",
            "carving_by",
            "Confirm?",
          ]
        : [
            "SID",
            "Title",
            "Carving Start",
            "Carving End",
            "carving_by",
            "Confirm?",
          ],
  };

  return (
    <div>
      <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>
          Previous
        </button>
        <button
          onClick={() =>
            setCurrentPage((prev) =>
              Math.min(prev + 1, Math.ceil(data.length / itemsPerPage))
            )
          }
        >
          Next
        </button>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            {headers[stage].map((headerText, index) => (
              <th key={index} className={styles.tableHeader}>
                {headerText}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item, rowIndex) => (
            <tr key={`stencil_${item.sid}_${item.week}_${item.year}`}>
              <StageComponent
                item={item}
                handleEdit={handleEdit}
                week={week}
                searchTerm={searchTerm}
                notStarted={notStarted}
                inProgress={inProgress}
                completed={completed}
                isConfirmed={isConfirmed}
                notConfirmed={notConfirmed}
                currentDate={currentDate}
              />
            </tr>
          ))}
        </tbody>
      </table>
      <div
        style={{ display: "flex", justifyContent: "center", margin: "20px" }}
      >
        <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>
          Previous
        </button>
        <button
          onClick={() =>
            setCurrentPage((prev) =>
              Math.min(prev + 1, Math.ceil(data.length / itemsPerPage))
            )
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default StatusData;
