import React, { useEffect, useMemo, useState } from "react";
import { supabase } from "./../../supabaseConnection.js";
import styles from "@/styles/select.module.css";
import PrintingStatus from "./PrintingStatus";
import CuttingStatus from "./CuttingStatus";
import TracingStatus from "./TracingStatus";
import CarvingStatus from "./CarvingStatus";
import PaginationButtons from "./PaginationButtons";
import SearchBarSelect from "./SearchBarSelect.js";
import { get } from "lodash";

const SelectData = ({
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
  const [showPdf, setShowPdf] = useState(true);
  const [pdfUrl, setPdfUrl] = useState(null);

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
          if (payload.new) {
            setData((currentData) => {
              console.log(payload.new);
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
        if ((item.sid.toLowerCase().indexOf(searchTerm.toLowerCase()) < 0 &&
            searchTerm !== "" &&
            item.stencils.cid != searchTerm &&
            item.stencils.title
              .toLowerCase()
              .indexOf(searchTerm.toLowerCase()) < 0) ||
            (item.week !== week && week !== "Both")
        ) {
          return false;
        }
        return true;
      });
  }, [
    data,
    week,
    searchTerm
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

  return (
    <div>
      <SearchBarSelect
        autoFocus={false}
        searchTerm={searchTerm}
        updateSearchTerm={updateSearchTerm}
        updateCurrentPage={updateCurrentPage}
        itemsPerPage={itemsPerPage}
        updateItemsPerPage={updateItemsPerPage}
        length={filteredData.length}
      />

      <div class="stencil-grid">
        {paginatedData.map((item, rowIndex) => (
        <div class="stencil-card">
            <iframe
                src={`${item.sid}.pdf`}
                width="250vw"
                height="250vh"
                style={{ border: "none" }}
            ></iframe>
            <h3>{item.stencils.title}</h3>
            <p>{item.sid}</p>
        </div>
        ))}
    </div>


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

export default SelectData;
