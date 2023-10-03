import React from "react";
import Navbar from "@/components/AdminNav";
import LeftPane from "@/components/LeftPane";
import StatusData from "@/components/StatusData";
import styles from "@/styles/status.module.css";
import { useState } from "react";
import AdminSignInPrompt from "@/components/AdminSignInPrompt";
import QuickAdd from "@/components/QuickAdd";

export default function Status() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [week, setWeek] = useState(1);
  const [stage, setStage] = useState(1);
  const [isConfirmed, setIsConfirmed] = useState(true);
  const [notConfirmed, setNotConfirmed] = useState(true);
  const [notStarted, setNotStarted] = useState(true);
  const [inProgress, setInProgress] = useState(true);
  const [completed, setCompleted] = useState(true);
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

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

  return (
    <AdminSignInPrompt>
      <Navbar />
      <div style={{ display: "flex" }}>
        <LeftPane
          className={styles.leftPane}
          year={year}
          week={week}
          stage={stage}
          isConfirmed={isConfirmed}
          notConfirmed={notConfirmed}
          notStarted={notStarted}
          inProgress={inProgress}
          completed={completed}
          updateYear={updateYear}
          updateWeek={updateWeek}
          updateStage={updateStage}
          updateIsConfirmed={updateIsConfirmed}
          updateNotConfirmed={updateNotConfirmed}
          updateFilterStatus={updateFilterStatus}
          updateNotStarted={updateNotStarted}
          updateInProgress={updateInProgress}
          updateCompleted={updateCompleted}
        />
        <div className={styles.data}>
          {showQuickAdd && (
            <QuickAdd
              stage={stage}
              week={week}
              year={year}
              updateShowQuickAdd={updateShowQuickAdd}
            />
          )}
          <StatusData
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
            updateShowQuickAdd={updateShowQuickAdd}
            showQuickAdd={showQuickAdd}
          />
        </div>
      </div>
    </AdminSignInPrompt>
  );
}
