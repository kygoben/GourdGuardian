import React from "react";
import { useRouter } from "next/router";
import styles from "@/styles/data.module.css";
import PumpkinData from "@/components/Pumpkin";
import ReactPlayer from "react-player";

const pumpkinData = () => {
  const router = useRouter();

  const callAPI = async () => {
    router.push({
      pathname: "/volunteer/end",
      query: router.query,
    });
  };

  const updateStatus = async () => {
    fetch("/api/stencil/" + router.query.sid, {
      method: "POST"
    });
  };

  return (
    <div>
      <div className={styles.section}>
        <PumpkinData
          className={styles.section}
          sid={router.query.sid}
          title={router.query.title}
          category={router.query.cname}
        ></PumpkinData>
      </div>
      <div className={styles.section}>
        <div>Status:</div>
        <div>Tracing</div>
        <div>In Progress</div>
      </div>

      <div className={styles.section}>
        <div>Embedded video here</div>
        {/* <ReactPlayer url="https://youtu.be/eK8nUfCZeGs" /> */}
      </div>

      <div className={styles.section}>
        <div>Are you done tracing?</div>
        <button className={styles.button} onClick={callAPI}>
          Yes
        </button>
        <button className={styles.button} onClick={updateStatus}>
          I didn't finish
        </button>
        <button className={styles.buttonNo} onClick={callAPI}>
          No
        </button>
      </div>
    </div>
  );
};
export default pumpkinData;
