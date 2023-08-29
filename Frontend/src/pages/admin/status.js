import React from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/AdminNav";
import LeftPane from "@/components/LeftPane";
import StatusData from "@/components/StatusData";
import SearchBar from "@/components/SearchBar";
import  styles  from "@/styles/status.module.css"

export default function Status() {
  const router = useRouter();

  return (
    <>
      <Navbar />
      <div className="display: flex">
        <LeftPane className={styles.leftPane}/>
        <div className={styles.data}>
          <SearchBar />
          <StatusData className={styles.dataRow}/>
        </div>
      </div>
    </>
  );
}
