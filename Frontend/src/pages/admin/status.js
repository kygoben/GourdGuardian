import React from "react";
import Navbar from "@/components/AdminNav";
import LeftPane from "@/components/LeftPane";
import StatusData from "@/components/StatusData";
import SearchBar from "@/components/SearchBar";
import styles from "@/styles/status.module.css";
import { useState } from "react";

export default function Status() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [week, setWeek] = useState(1);
  const [stage, setStage] = useState(3);
  const [isConfirmed, setIsConfirmed] = useState(true);
  const [notConfirmed, setNotConfirmed] = useState(true);
  const [notStarted, setNotStarted] = useState(true);
  const [inProgress, setInProgress] = useState(true);
  const [completed, setCompleted] = useState(true);
  //state for search bar
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
    setStage(newValue);
  };

  const updateIsConfirmed = (newValue) => {
    setIsConfirmed(newValue);
    console.log(isConfirmed);
  };

  const updateNotConfirmed = (newValue) => {
    setNotConfirmed(newValue);
    console.log(notConfirmed);
  };

  return (
    <>
      <Navbar />
      <div className="display: flex">
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
          <SearchBar 
            searchTerm={searchTerm}
            updateSearchTerm={updateSearchTerm}
            />
          <StatusData
            className={styles.dataRow}
            year={year}
            week={week}
            stage={stage}
            isConfirmed={isConfirmed}
            notConfirmed={notConfirmed}
            notStarted={notStarted}
            inProgress={inProgress}
            completed={completed}
          />
        </div>
      </div>
    </>
  );
}
