import React from "react";
import styles from "@/styles/admin.module.css";
import Navbar from "@/components/AdminNav";
import QuickAdd from "@/components/QuickAdd";

export default function Home() {

  return (
    <>
    <Navbar />
    <QuickAdd />
    {/* <div className={styles.container}>
      <header className={styles.header}>
        <h1>Jack-O-Lantern Tracker</h1>
      </header>

      <table className={styles.table}>
        <tr>
          <td><button className={styles.libraryButton}>Stencil Library</button></td>
          <td rowSpan="3" className="merged-row"><button className={styles.eventDashboardButton}>Event Dashboard</button></td>
        </tr>
        <tr>
          <td>
            <div>
              <button className={styles.button}>Printing</button>
              <button className={styles.button}>Cutting</button>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div>
              <button className={styles.button}>Tracing</button>
              <button className={styles.button}>Carving</button>
            </div>
          </td>
        </tr>
      </table>

      <div className={styles.quickActionsText}>------------ Stencil Quick Actions ------------</div>
      <div className={styles.quickActionsContainer}>
        <button className={styles.quickActionButton}>Add</button>
        <button className={styles.quickActionButton}>Search</button>
        <button className={styles.quickActionButton}>Print</button>
        <button className={styles.quickActionButton}>Change Status</button>
      </div> */}
    {/* </div> */}
    </>
  );
}
