import React from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/AdminNav";
import LeftPane from "@/components/LeftPane";
import StatusData from "@/components/StatusData";
import SearchBar from "@/components/SearchBar";
import styles from "@/styles/status.module.css";
import { useState } from "react";
import ProgressBar from "@/components/ProgressBar";

export default function Status() {
  const router = useRouter();
  const [year, setYear] = useState(new Date().getFullYear());
  const [week, setWeek] = useState(1);
  const [stage, setStage] = useState(3);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [notStarted, setNotStarted] = useState(true);
  const [inProgress, setInProgress] = useState(false);
  const [completed, setCompleted] = useState(false);


  const updateYear = (newValue) => {
    setYear(newValue);
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
          notStarted={notStarted}
          inProgress={inProgress}
          completed={completed}
          updateYear={updateYear}
          updateWeek={updateWeek}
          updateStage={updateStage}
          updateIsConfirmed={updateIsConfirmed}
          updateFilterStatus={updateFilterStatus}
          updateNotStarted={updateNotStarted}
          updateInProgress={updateInProgress}
          updateCompleted={updateCompleted}
        />
        <div className={styles.data}>
          <SearchBar />
          <StatusData
            className={styles.dataRow}
            year={year}
            week={week}
            stage={stage}
            isConfirmed={isConfirmed}
            notStarted={notStarted}
            inProgress={inProgress}
            completed={completed}
          />
        </div>
      </div>
    </>
  );
}
