import React, { useEffect, useMemo, useState } from "react";
import { supabase } from "./../../supabaseConnection.js";
import styles from "@/styles/selectData.module.css";
import PaginationButtons from "./PaginationButtons";
import SearchBarSelect from "./SearchBarSelect.js";
import StencilCard from "./StencilCard.js";
import { PDFDocument } from "pdf-lib";

const SelectData = ({
  initialData,
  year,
  week,
  searchTerm,
  categoryData,
  updateSearchTerm,
  updateShowQuickAdd,
  showStatusAdd,
  handleToggleSelectionCategory,
  updateCategoryData,
  week1Total,
  week2Total,
  uniqueTotal,
  updateWeek1Total,
  updateWeek2Total,
  updateUniqueTotal,
}) => {
  const [data, setData] = useState(initialData || []);
  const [storageData, setStorageData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(100);
  const [showAllStencils, setShowAllStencils] = useState(false);
  const [mergedPdfUrl, setMergedPdfUrl] = useState(null);

  const currentDate = new Date();

  const updateShowAllStencils = (newValue) => {
    console.log(newValue);
    setShowAllStencils(newValue);
  };

  const updateItemsPerPage = (newValue) => {
    setItemsPerPage(newValue);
  };

  const updateCurrentPage = (newValue) => {
    setCurrentPage(newValue);
  };

  useEffect(() => {
    getData();
    console.log("data", data);
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

  const fetchAndMergePDFs = async (pdfUrls) => {
    const mergedPdfDoc = await PDFDocument.create();

    console.log("pdfUrls:", pdfUrls);

    for (const url of pdfUrls) {
      console.log("url:", url);
      let response = 0;
      try{
      response = await fetch(url);}
      catch(error){
        console.log("error:", error);
        continue;
      }
      if (!response.ok) {
        console.log("response:", response);
        continue;
        // throw new Error(`Failed to fetch PDF: ${response.statusText}`);
      }
      const contentType = response.headers.get("content-type");
      if (!contentType.includes("application/pdf")) {
        throw new Error(`URL did not return a PDF: ${contentType}`);
      }

      const arrayBuffer = await response.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const copiedPages = await mergedPdfDoc.copyPages(
        pdfDoc,
        pdfDoc.getPageIndices()
      );
      copiedPages.forEach((page) => mergedPdfDoc.addPage(page));
    }
    console.log("mergedPdfDoc:", mergedPdfDoc);
    console.log("COMPLETE");

    const pdfBytes = await mergedPdfDoc.save(); // Use save() instead of saveAsBlob()
  return new Blob([pdfBytes], { type: "application/pdf" });
  };

  const printMergedPDF = async (stencilIDs) => {
    const pdfUrls = stencilIDs.map((sid) => fetchPdf(sid));
    const mergedPdfBlob = await fetchAndMergePDFs(pdfUrls);
    const blobUrl = URL.createObjectURL(mergedPdfBlob);
  
    setMergedPdfUrl(blobUrl); // Update state with the Blob URL
  };
  

  const fetchStencilsToPrint = async () => {
    try {
      const { data, error } = await supabase
        .from("sstatus")
        .select("sid")
        .neq("printing_confirmed", 1)
        .eq("year", year);

      if (error) {
        throw error;
      }

      return data.map((item) => item.sid);
    } catch (error) {
      console.error("Error fetching stencils to print:", error);
      return [];
    }
  };

  const printStencils = async () => {
    console.log("Printing stencils");
    const stencilIDs = await fetchStencilsToPrint();
    console.log("stencilIDs:", stencilIDs);
    await printMergedPDF(stencilIDs);
  };

  const markAsPrinted = async () => {
    console.log("Marking as printed");

      try {
        const { data, error } = await supabase
          .from('sstatus')  // Replace 'status' with your actual table name
          .update({ printing_confirmed: 1 })
          .eq('year', year);

    
        if (error) {
          throw error;
        }
    
        console.log('Update successful:', data);
      } catch (error) {
        console.error('Error updating records:', error);
      }
    };

    const markAsNotPrinted = async () => {
      console.log("Marking as printed");
  
        try {
          const { data, error } = await supabase
            .from('sstatus')  // Replace 'status' with your actual table name
            .update({ printing_confirmed: 0 })
            .eq('year', year);
  
      
          if (error) {
            throw error;
          }
      
          console.log('Update successful:', data);
        } catch (error) {
          console.error('Error updating records:', error);
        }
      };
    


  const subscribe = async (data) => {
    // console.log(data);
    const subscription = supabase
      .channel("schema-db-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "sstatus",
        },
        (payload) => {
          console.log("Received payload", payload);
          if (payload.new) {
            setData((currentData) => {
              console.log("double counted payload?", payload);
              console.log("Payload.old:", payload.old);
              console.log("Payload.new:", payload.new);
              // Copy the current data to avoid direct mutations
              const newData = structuredClone(currentData);
              if (payload.eventType === "INSERT") {
                const insertedItem = payload.new;

                const itemIndex = newData.findIndex(
                  (el) =>
                    el.sid === insertedItem.sid && year === insertedItem.year
                );

                console.log("Inserted item idex:", itemIndex);
                if (itemIndex !== -1) {
                  console.log(
                    "Selection Week:",
                    newData[itemIndex].selectionWeek
                  );
                  newData[itemIndex].selectionWeek++; // if 0 becomes 1, if 2 becomes 3
                }
              } else if (payload.eventType === "UPDATE") {
                const updatedItem = payload.new;

                const itemIndex = newData.findIndex(
                  (el) =>
                    el.sid === updatedItem.sid && year === updatedItem.year
                );

                console.log("Updated item idex:", itemIndex);
                if (itemIndex !== -1) {
                  console.log(
                    "Selection Week:",
                    newData[itemIndex].selectionWeek
                  );
                  newData[itemIndex].selectionWeek = 2;
                }
              } else if (payload.eventType === "DELETE") {
                const deletedItem = payload.old;

                const itemIndex = newData.findIndex(
                  (el) =>
                    el.sid === deletedItem.sid && year === deletedItem.year
                );

                console.log("Deleted item idex:", itemIndex);
                if (itemIndex !== -1) {
                  console.log(
                    "Selection Week:",
                    newData[itemIndex].selectionWeek
                  );
                  newData[itemIndex].selectionWeek = 0;
                }
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
      const { data: stencilRawData, stencilError } = await supabase
        .from("stencils")
        .select("sid,title,cid");

      const { data: newStorageData, error: storageError } =
        await supabase.storage.from("stencils").list("", { limit: 50000 }); // 50000 is some high integer to get all the listing of all files in the bucket

      const { data: sstatusData, sstatusError } = await supabase
        .from("sstatus")
        .select("*")
        .eq("year", year);

      if (sstatusError || stencilError || storageError) {
        console.error("Error fetching data:", error);
        return;
      }

      console.log("Raw stencil data length:", stencilRawData.length);
      console.log("storageData length:", newStorageData.length);

      const storageFileSet = new Set();
      for (const storageFile of newStorageData) {
        storageFileSet.add(storageFile.name.split(".")[0]);
      }

      for (const stencil of stencilRawData) {
        stencil.pdfAvailable = storageFileSet.has(stencil.sid);
      }

      // const stencilFilteredData = stencilRawData.filter((data, idx) => {
      //   return showAllStencils || storageFileSet.has(data.sid);
      // });
      // const missingPdfData = stencilRawData.filter((data, idx) => { return !storageFileSet.has(data.sid); });
      // console.log("Filtered stencil data length:", stencilFilteredData.length);
      // console.log("Missing count:", missingPdfData.length)
      // console.log(missingPdfData);

      const sstatusMap = new Map();
      for (const stencilStatus of sstatusData) {
        if (sstatusMap.has(stencilStatus.sid)) {
          sstatusMap.set(stencilStatus.sid, 3);
        } else {
          sstatusMap.set(stencilStatus.sid, stencilStatus.week);
        }
      }

      const stencilData = stencilRawData.map((data, idx) => {
        const newdata = { ...data };
        newdata.selectionWeek = sstatusMap.has(newdata.sid)
          ? sstatusMap.get(newdata.sid)
          : 0;
        return newdata;
      });

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
      console.log("StencilData in getData():", stencilData);

      setData(stencilData);
      setStorageData(newStorageData);
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
  }

  const filteredData = useMemo(() => {
    // setCurrentPage(1);
    if (data) {
      // console.log("Data at the start of useMemo:", data);
      const storageFileSet = new Set();
      for (const storageFile of storageData) {
        storageFileSet.add(storageFile.name.split(".")[0]);
      }
      for (const stencil of data) {
        stencil.pdfAvailable = storageFileSet.has(stencil.sid);
      }

      console.log("filtering in usememo", storageData.length);
      const categories = new Set();
      for (const category of categoryData) {
        if (category.isSelected) {
          categories.add(category.cid);
        }
      }
      return data.filter((item) => {
        if (
          (item.sid.toLowerCase().indexOf(searchTerm.toLowerCase()) < 0 &&
            searchTerm !== "" &&
            item.cid != searchTerm &&
            item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) < 0) ||
          !categories.has(item.cid) ||
          !(showAllStencils || storageFileSet.has(item.sid))
        ) {
          return false;
        }
        return true;
      });
    }
  }, [data, searchTerm, categoryData, showAllStencils, storageData]);

  useEffect(() => {
    if (data) {
      const newCategoryData = structuredClone(categoryData);
      for (const cat of newCategoryData) {
        cat.selectedCount = 0;
        cat.totalCount = 0;
      }
      let newWeek1Total = 0;
      let newWeek2Total = 0;
      let newUniqueTotal = 0;
      for (const stencil of data) {
        const idx = newCategoryData.findIndex((el) => el.cid === stencil.cid);
        if (idx != -1) {
          if (stencil.selectionWeek !== 0) {
            newCategoryData[idx].selectedCount += 1;
          }
          newCategoryData[idx].totalCount += 1;
        }
        if (stencil.selectionWeek === 3 || stencil.selectionWeek === 1) {
          newWeek1Total += 1;
        }
        if (stencil.selectionWeek === 3 || stencil.selectionWeek === 2) {
          newWeek2Total += 1;
        }
        // if(stencil.selectionWeek > 0) { //for unique stencils
        //   newUniqueTotal += 1;
        // }

        if (stencil.selectionWeek === 3) {
          //for unique stencils
          newUniqueTotal += 1;
        }
      }
      console.log(newCategoryData);
      updateCategoryData(newCategoryData);
      updateWeek1Total(newWeek1Total);
      updateWeek2Total(newWeek2Total);
      updateUniqueTotal(newUniqueTotal);
    }
  }, [data]);

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
        showAllStencils={showAllStencils}
        updateShowAllStencils={updateShowAllStencils}
        printStencils={printStencils}
        mergedPdfUrl={mergedPdfUrl}
        markAsPrinted={markAsPrinted}
        markAsNotPrinted={markAsNotPrinted}
      />

      {/* <div className="ml-8">
        <button onClick={() => printStencils()}>Print All Stencils</button>
      </div> */}
      {/* {mergedPdfUrl && (
      <div>
        <iframe src={mergedPdfUrl} width="100%" height="500px" />
        <button onClick={() => window.open(mergedPdfUrl, '_blank').print()}>
          Print Merged PDF
        </button>
      </div>
    )} */}
      <div className={styles.stencilGrid}>
        {paginatedData.map((item, rowIndex) => (
          <StencilCard
            item={item}
            rowIndex={rowIndex}
            key={`stencil_card_${item.sid}`}
            year={year}
          />
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
