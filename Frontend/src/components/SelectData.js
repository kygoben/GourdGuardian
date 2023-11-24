import React, { useEffect, useMemo, useState } from "react";
import { supabase } from "./../../supabaseConnection.js";
import styles from "@/styles/selectData.module.css";
import PaginationButtons from "./PaginationButtons";
import SearchBarSelect from "./SearchBarSelect.js";

const SelectData = ({
  initialData,
  year,
  week,
  searchTerm,
  updateSearchTerm,
  updateShowQuickAdd,
  showStatusAdd
}) => {
  const [data, setData] = useState(initialData || []);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(100);
  const currentDate = new Date();

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
      const { data: stencilRawData, error } = await supabase
        .from("stencils")
        .select("sid,title,cid");
      
      const { data: storageData, error: storageError } = await supabase
        .storage
        .from("stencils")
        .list('', {limit: 50000}); // 50000 is some high integer to get all the listing of all files in the bucket
      
      if(storageError) { 
        console.error("Error fetching data from storage:", error);
        return;
      }

      if (error) {
        console.error("Error fetching data:", error);
        return;
      }

      console.log("storageData length:", storageData.length)

      const storageFileSet = new Set();
      for(let storageFile of storageData){
        storageFileSet.add(storageFile.name.split('.')[0]);
      }

      const stencilData = stencilRawData.filter((data, idx) => { return storageFileSet.has(data.sid); });

      console.log("stencilData length:", stencilData.length);

      stencilData.sort((a, b) => {
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
      // console.log(stencilData);

      setData(stencilData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  function fetchPdf(currentStencilId) {
    // console.log("Fetching PDF for stencilId:", currentStencilId);
    try {
      const { data, error } = supabase.storage
        .from("stencils")
        .getPublicUrl(`${currentStencilId}.pdf`);

      if (error) {
        throw error;
      }

      return data.publicUrl;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  function fetchImg(currentStencilId) {
    // console.log("Fetching PDF for stencilId:", currentStencilId);
    try {
      const { data, error } = supabase.storage
        .from("stencils/JPG")
        .getPublicUrl(`${currentStencilId}.pdf.jpg`);

      if (error) {
        throw error;
      }

      return data.publicUrl;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const filteredData = useMemo(() => {
    setCurrentPage(1);
    if (data)
      return data.filter((item) => {
        if ((item.sid.toLowerCase().indexOf(searchTerm.toLowerCase()) < 0 &&
            searchTerm !== "" &&
            item.cid != searchTerm &&
            item.title
              .toLowerCase()
              .indexOf(searchTerm.toLowerCase()) < 0)
        ) {
          return false;
        }
        return true;
      });
  }, [
    data,
    searchTerm
  ]);

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

      <div className={styles.stencilGrid}>
        {paginatedData.map((item, rowIndex) => (
        <div className={styles.stencilCard} key={rowIndex}>
            {/* { item.sid[0] != '1' && <iframe 
                src={fetchPdf(item.sid)}
              ></iframe>}
            {item.sid[0] == '1' && <img
                src={fetchImg(item.sid)}
              ></img>} */}
            <iframe 
                src={fetchPdf(item.sid)}
            ></iframe>
            {/* <object class="affichage-pdf" data={fetchPdf(item.sid)}></object> */}
            <h3>{item.title}</h3>
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
