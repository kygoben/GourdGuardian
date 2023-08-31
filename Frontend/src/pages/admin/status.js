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

  const updateYear = (newValue) => {
    setYear(newValue);
  };

  const updateWeek = (newValue) => {
    setWeek(newValue);
  };

  const updateStage = (newValue) => {
    setStage(newValue);
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
          updateYear={updateYear}
          updateWeek={updateWeek}
          updateStage={updateStage}
        />
        <div className={styles.data}>
          <SearchBar />
          <ProgressBar />
          <StatusData
            className={styles.dataRow}
            year={year}
            week={week}
            stage={stage}
          />
        </div>
      </div>
    </>
  );
}
