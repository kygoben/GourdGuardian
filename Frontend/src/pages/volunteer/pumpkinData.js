import React from "react";
import { useRouter } from "next/router";
import styles from "@/styles/data.module.css";
import PumpkinData from "@/components/Pumpkin";
import ReactPlayer from "react-player";

const pumpkinData = () => {
  const router = useRouter();

  const callAPI = async () => {
    router.push("/volunteer/end");
  };

  const updateStatus = async () => {
    fetch("/api/stencil/" + router.query.sid, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objectWithData),
    });
  };

  return (
    <div>
      <div className={styles.section}>
        <PumpkinData
          className={styles.section}
          sid={router.query.sid}
          title={router.query.title}
          category={"Hunger Games"}
        ></PumpkinData>
      </div>
      <div className={styles.section}>
        <div>Status:</div>
        <div>Tracing</div>
        <div>In Progress</div>
      </div>

      <div className={styles.section}>
        <div>Embedded video here</div>
        <ReactPlayer url="https://youtu.be/eK8nUfCZeGs" />
      </div>

      <div className={styles.section}>
        <div>Are you done tracing?</div>
        <button className={styles.button} onClick={callAPI}>
          Yes
        </button>
        <button className={styles.button} onClick={callAPI}>
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
