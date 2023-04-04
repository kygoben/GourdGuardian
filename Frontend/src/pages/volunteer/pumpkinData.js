import React from "react";
import { useRouter } from "next/router";
import styles from "@/styles/data.module.css";
import PumpkinData from "@/components/Pumpkin";

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
      method: "POST",
    });
  };

  let stage = "Error"
  let status = "Error"
  if(router.query.stage==1){
    stage = "Printing"
  }
  else if(router.query.stage==2){
    stage = "Cutting"
  }else if(router.query.stage==3){
    stage = "Tracing"
  }else if(router.query.stage==4){
    stage = "Carving"
  }

  if(router.query.status==1){
    status = "Not Started"
  }
  else if(router.query.status==2){
    status = "In progress"
  }else if(router.query.status==3){
    status = "Completed"
  }

  console.log(router.query)

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
        <div>Stage:</div>
        <div>{stage}</div>
        <div>Status:</div>
        <div>{status}</div>
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
