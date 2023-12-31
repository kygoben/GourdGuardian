import React, { useEffect, useMemo, useState } from "react";
import { supabase } from "./../../supabaseConnection.js";
import styles from "@/styles/statusData.module.css";
import PrintingStatus from "./PrintingStatus";
import CuttingStatus from "./CuttingStatus";
import TracingStatus from "./TracingStatus";
import CarvingStatus from "./CarvingStatus";
import PaginationButtons from "./PaginationButtons";
import SearchBar from "./SearchBar.js";
import { get } from "lodash";

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
  updateSearchTerm,
  updateShowQuickAdd,
  showQuickAdd,
  updateTotal,
  updateFinished,
  updateShowStatusAdd,
  showStatusAdd
}) => {
  const [data, setData] = useState(initialData || []);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(100);
  const currentDate = new Date();
  const [showPdf, setShowPdf] = useState(false);
  const [showName, setShowName] = useState(false); // show/hide tracer, carver name

  const updateShowPdf = (newValue) => {
    console.log(newValue);
    setShowPdf(newValue);
  };

  const updateShowName = (newValue) => {
    console.log(newValue);
    setShowName(newValue);
  };

  const updateItemsPerPage = (newValue) => {
    setItemsPerPage(newValue);
  };

  const updateCurrentPage = (newValue) => {
    setCurrentPage(newValue);
  };

  useEffect(() => {
    getData();
    let subscription;
    console.log("subscribing");
    (async () => {
      subscription = await subscribe(data);
    })();

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [year, showStatusAdd]);

  // useEffect(() => {
  //   getData();
  // }, [showStatusAdd]);


  useEffect(() => {
    const stageMap = {
      1: "printing_confirmed",
      2: "cutting_confirmed",
      3: "tracing_confirmed",
      4: "carving_confirmed",
    };
  
    const filteredData = week === "Both" 
        ? data 
        : data.filter(item => item.week === week);  // assuming week is a property in your data items

    //TODO
    
    updateTotal(filteredData.length);
    updateFinished(filteredData.filter(item => item[stageMap[stage]]).length);
    
  }, [year, week, stage, data]);
  

  const subscribe = async (data) => {
    // console.log(data);
    const subscription = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: 'update',
          schema: 'public',
          table: 'sstatus',
        },
        (payload) => {
          console.log("Payload happened");
          console.log(payload)
          console.log(payload.old ? "old ok" : "old not ok")
          console.log(payload.new ? "new ok" : "new not ok")
          if (payload.eventType === "UPDATE") {
            setData((currentData) => {
              console.log("?", payload.new);
                // Copy the current data to avoid direct mutations
                const newData = [...currentData];
                const updatedItem = payload.new;
                
                const itemIndex = newData.findIndex(
                    (el) => el.sid === updatedItem.sid &&
                            el.year === updatedItem.year &&
                            el.week === updatedItem.week
                );
        
                if (itemIndex !== -1) {
                    const oldItem = newData[itemIndex];
                    newData[itemIndex] = updatedItem;
                    newData[itemIndex].stencils = oldItem.stencils;
                    if(!newData[itemIndex].stencils.title){
                      
                    }
                } else {
                    // This is a new item, so we push it to the array:
                    console.log("So does this branch ever execute?")
                    newData.push(updatedItem);
                    newData.sort((a, b) => {
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
                }
                return newData;
            });
        } 
        }
      )
      .subscribe();
  
    return subscription;
  };

  const getData = async () => {
    // console.log("Getting data");
    try {
      const { data: sstatusData, error } = await supabase
        .from("sstatus")
        .select("*, stencils(title, cid)")
        .eq("year", year);

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
      // console.log(sstatusData);

      setData(sstatusData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const filteredData = useMemo(() => {
    setCurrentPage(1);
    if (data)
      return data.filter((item) => {
        if (
          stage === 1 &&
          ((item.sid.toLowerCase().indexOf(searchTerm.toLowerCase()) < 0 &&
            searchTerm !== "" &&
            item.stencils.cid != searchTerm &&
            item.stencils.title
              .toLowerCase()
              .indexOf(searchTerm.toLowerCase()) < 0) ||
            (item.week !== week && week !== "Both") ||
            (!item.printing && !notStarted) ||
            (item.printing && !completed))
        ) {
          return false;
        }

        if (
          stage === 2 &&
          ((item.sid.toLowerCase().indexOf(searchTerm.toLowerCase()) < 0 &&
            searchTerm !== "" &&
            item.stencils.cid != searchTerm &&
            item.stencils.title
              .toLowerCase()
              .indexOf(searchTerm.toLowerCase()) < 0) ||
            (item.week !== week && week !== "Both") ||
            (!item.cutting && !notStarted) ||
            (item.cutting && !completed))
        ) {
          return false;
        }

        if (
          stage === 3 &&
          ((item.sid.toLowerCase().indexOf(searchTerm.toLowerCase()) < 0 &&
            searchTerm !== "" &&
            item.stencils.cid != searchTerm &&
            item.stencils.title
              .toLowerCase()
              .indexOf(searchTerm.toLowerCase()) < 0 &&
            (item.tracing_by?.toLowerCase().indexOf(searchTerm.toLowerCase()) <
              0 ||
              !item.tracing_by)) ||
            (item.week !== week && week !== "Both") ||
            (!item.tracing_start && !notStarted) ||
            (item.tracing_end && !completed) ||
            (!inProgress && item.tracing_start && !item.tracing_end) ||
            (!isConfirmed && item.tracing_confirmed) ||
            (!notConfirmed && !item.tracing_confirmed))
        ) {
          // console.log(!isConfirmed && item.tracing_confirmed);
          return false;
        }

        if (
          stage === 4 &&
          ((item.sid.toLowerCase() !== searchTerm.toLowerCase() &&
            searchTerm !== "" &&
            item.stencils.cid != searchTerm &&
            item.stencils.title
              .toLowerCase()
              .indexOf(searchTerm.toLowerCase()) < 0 &&
            (item.carving_by?.toLowerCase().indexOf(searchTerm.toLowerCase()) <
              0 ||
              !item.carving_by)) ||
            (item.week !== week && week !== "Both") ||
            (!item.carving_start && !notStarted) ||
            (item.carving_end && !completed) ||
            (!inProgress && item.carving_start && !item.carving_end) ||
            (!isConfirmed && item.carving_confirmed) ||
            (!notConfirmed && !item.carving_confirmed))
        ) {
          return false;
        }
        return true;
      });
  }, [
    data,
    stage,
    week,
    searchTerm,
    notStarted,
    completed,
    inProgress,
    isConfirmed,
    notConfirmed,
  ]);

  // console.log(filteredData);

  const paginatedData = (filteredData || []).slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleEdit = async (item, field, value) => {
    const updateObject = { [field]: value };
    const { data: updatedData, error } = await supabase
      .from("sstatus")
      .update(updateObject)
      .eq("sid", item.sid)
      .eq("year", item.year)
      .eq("week", item.week)
      .select("*, stencils(title)");

    if (error) {
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
        ? (showName 
          ? ["SID", "Week", "Title", "Tracing Start", "Tracing End", "Tracer", "Confirm?",]
          : ["SID", "Week", "Title", "Tracing Start", "Tracing End", "Confirm?",])
        : (showName
          ? ["SID", "Title", "Tracing Start", "Tracing End", "Tracer", "Confirm?",]
          : ["SID", "Title", "Tracing Start", "Tracing End", "Confirm?",]
          ),
    4:
      week === "Both"
        ? (showName 
          ? ["SID", "Week", "Title", "Carving Start", "Carving End", "Carver", "Confirm?",]
          : ["SID", "Week", "Title", "Carving Start", "Carving End", "Confirm?",])
        : (showName
          ? ["SID", "Title", "Carving Start", "Carving End", "Carver", "Confirm?",]
          : ["SID", "Title", "Carving Start", "Carving End", "Confirm?",]
          ),
  };
  //if data lenth is 0 return There is no Data to show

  return (
    <div>
      <SearchBar
        autoFocus={false}
        searchTerm={searchTerm}
        updateSearchTerm={updateSearchTerm}
        updateCurrentPage={updateCurrentPage}
        updateShowQuickAdd={updateShowQuickAdd}
        itemsPerPage={itemsPerPage}
        updateItemsPerPage={updateItemsPerPage}
        length={filteredData.length}
        showPdf={showPdf}
        updateShowPdf={updateShowPdf}
        showName={showName}
        updateShowName={updateShowName}
        updateShowStatusAdd={updateShowStatusAdd}
      />

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
                showPdf={showPdf}
                showName={showName}
                updateShowStatusAdd={updateShowStatusAdd}
              />
            </tr>
          ))}
        </tbody>
      </table>
      <PaginationButtons
        autoFocus={false}
        searchTerm={searchTerm}
        updateSearchTerm={updateSearchTerm}
        updateCurrentPage={updateCurrentPage}
        updateShowQuickAdd={updateShowQuickAdd}
        itemsPerPage={itemsPerPage}
        updateItemsPerPage={updateItemsPerPage}
        length={filteredData.length}
      />
    </div>
  );
};

export default StatusData;
