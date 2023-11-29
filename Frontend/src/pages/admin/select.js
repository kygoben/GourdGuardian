import React, { useEffect } from "react";
import Navbar from "@/components/AdminNav";
import LeftPaneSelect from "@/components/LeftPaneSelect";
import SelectData from "@/components/SelectData";
import styles from "@/styles/status.module.css";
import { useState } from "react";
import AdminSignInPrompt from "@/components/AdminSignInPrompt";
import QuickAdd from "@/components/QuickAdd";
import { supabase } from "../../../supabaseConnection.js";
import StatusAdd from "@/components/StatusAdd";

export default function Select() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [week, setWeek] = useState(1);
  const [stage, setStage] = useState(1);
  const [isConfirmed, setIsConfirmed] = useState(true);
  const [notConfirmed, setNotConfirmed] = useState(true);
  const [notStarted, setNotStarted] = useState(true);
  const [inProgress, setInProgress] = useState(true);
  const [completed, setCompleted] = useState(true);
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [showStatusAdd, setShowStatusAdd] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [finished, setFinished] = useState(0);
  const [total, setTotal] = useState(0);
  const [categoryData, setCategoryData] = useState([]);
  const [week1Total, setWeek1Total] = useState(0);
  const [week2Total, setWeek2Total] = useState(0);
  const [uniqueTotal, setUniqueTotal] = useState(0);

  useEffect(() => {
    getInitialCategoryData();
  }, []);

  const getInitialCategoryData = async () => {
    try {
      const { data: cdata, error } = await supabase
        .from("category")
        .select("*");

      if (error) {
        console.error("Error fetching data:", error);
        return;
      }

      for (const category of cdata) {
        category.isSelected = false;
        category.selectedCount = 0;
        category.totalCount = 0;
      }

      setCategoryData(cdata);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const updateTotal = (newValue) => {
    // console.log(newValue);
    setTotal(newValue);
  };

  const updateWeek1Total = (newValue) => {
    console.log("New week1Total:", newValue);
    setWeek1Total(newValue);
  };

  const updateWeek2Total = (newValue) => {
    console.log("New week2Total:", newValue);
    setWeek2Total(newValue);
  };

  const updateUniqueTotal = (newValue) => {
    setUniqueTotal(newValue);
  };

  const updateCategoryData = (newValue) => {
    setCategoryData(newValue);
  };

  const handleToggleSelectionCategory = (index) => {
    console.log(categoryData);
    console.log(index);
  
    setCategoryData((prevCategoryData) => {
      const newCategoryData = structuredClone(prevCategoryData);
  
      for (let i = 0; i < newCategoryData.length; i++) {
        if(index<0){
          newCategoryData[i].isSelected = true;
        }else if (i === index) {
          newCategoryData[i].isSelected = true;
        } else {
          newCategoryData[i].isSelected = false;
        }
      }
      return newCategoryData;
    });
  };
  

    // if (0 <= index && index < categoryData.length) {
    //   setCategoryData((prevCategoryData) => {
    //     const newCategoryData = structuredClone(prevCategoryData);
    //     newCategoryData[index].isSelected = !newCategoryData[index].isSelected;
    //     return newCategoryData;
    //   });
    // }
  // };

  // async function getAdminData() {
  //   console.log("getAdminData");
  //   console.log(year, week, stage);
  //   let { data, error } = await supabase.from("admin_data").select("*");

  //   console.log(data);

  //   if (data.length > 0) {
  //     updateYear(data[0].year);
  //     updateWeek(data[0].week);
  //     updateStage(data[0].stage);
  //     // console.log(data);
  //   }
  // }

  const updateFinished = (newValue) => {
    // console.log(newValue);
    setFinished(newValue);
  };

  const updateYear = (newValue) => {
    setYear(newValue);
  };

  const updateSearchTerm = (newValue) => {
    setSearchTerm(newValue);
  };

  const updateFilterStatus = (newValue) => {
    setFilterStatus(newValue);
  };

  const updateNotStarted = (newValue) => {
    setNotStarted(newValue);
  };

  const updateInProgress = (newValue) => {
    setInProgress(newValue);
  };

  const updateCompleted = (newValue) => {
    setCompleted(newValue);
  };

  const updateWeek = (newValue) => {
    setWeek(newValue);
  };

  const updateStage = (newValue) => {
    if (newValue === "Printing") setStage(1);
    else if (newValue === "Cutting") setStage(2);
    else if (newValue === "Tracing") setStage(3);
    else if (newValue === "Carving") setStage(4);
    // setStage(newValue);
  };

  const updateIsConfirmed = (newValue) => {
    setIsConfirmed(newValue);
    console.log(isConfirmed);
  };

  const updateNotConfirmed = (newValue) => {
    setNotConfirmed(newValue);
    console.log(notConfirmed);
  };

  const updateShowQuickAdd = (newValue) => {
    setShowQuickAdd(newValue);
  };

  const updateShowStatusAdd = (newValue) => {
    setShowStatusAdd(newValue);
  };

  const numba = 2;

  return (
    <AdminSignInPrompt>
      <Navbar total={total} finished={finished} stage={stage} />
      <div style={{ display: "flex", height: "92%", overflow: "auto" }}>
        <LeftPaneSelect
          className={styles.leftPane}
          year={year}
          week={week}
          stage={stage}
          isConfirmed={isConfirmed}
          notConfirmed={notConfirmed}
          notStarted={notStarted}
          inProgress={inProgress}
          completed={completed}
          categoryData={categoryData}
          week1Total={week1Total}
          week2Total={week2Total}
          uniqueTotal={uniqueTotal}
          updateYear={updateYear}
          updateWeek={updateWeek}
          updateStage={updateStage}
          updateIsConfirmed={updateIsConfirmed}
          updateNotConfirmed={updateNotConfirmed}
          updateFilterStatus={updateFilterStatus}
          updateNotStarted={updateNotStarted}
          updateInProgress={updateInProgress}
          updateCompleted={updateCompleted}
          updateCategoryData={updateCategoryData}
          handleToggleSelectionCategory={handleToggleSelectionCategory}
          updateWeek1Total={updateWeek1Total}
          updateWeek2Total={updateWeek2Total}
          updateUniqueTotal={updateUniqueTotal}
        />
        <div className={styles.data}>
          {showStatusAdd && (
            <StatusAdd
              year={year}
              updateShowStatusAdd={updateShowStatusAdd}
            ></StatusAdd>
          )}
          {showQuickAdd && (
            <QuickAdd
              stage={stage}
              week={week}
              year={year}
              updateShowQuickAdd={updateShowQuickAdd}
            />
          )}
          <SelectData
            updateSearchTerm={updateSearchTerm}
            className={styles.dataRow}
            year={year}
            week={week}
            stage={stage}
            isConfirmed={isConfirmed}
            notConfirmed={notConfirmed}
            notStarted={notStarted}
            inProgress={inProgress}
            completed={completed}
            searchTerm={searchTerm}
            categoryData={categoryData}
            week1Total={week1Total}
            week2Total={week2Total}
            uniqueTotal={uniqueTotal}
            updateShowQuickAdd={updateShowQuickAdd}
            updateShowStatusAdd={updateShowStatusAdd}
            showQuickAdd={showQuickAdd}
            updateFinished={updateFinished}
            updateTotal={updateTotal}
            handleToggleSelectionCategory={handleToggleSelectionCategory}
            showStatusAdd={showStatusAdd}
            updateCategoryData={updateCategoryData}
            updateWeek1Total={updateWeek1Total}
            updateWeek2Total={updateWeek2Total}
            updateUniqueTotal={updateUniqueTotal}
          />
        </div>
      </div>
    </AdminSignInPrompt>
  );
}
