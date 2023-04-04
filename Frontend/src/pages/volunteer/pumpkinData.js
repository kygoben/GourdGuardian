import React from "react";
import { useRouter } from "next/router";
import styles from "@/styles/data.module.css";
import PumpkinData from "@/components/Pumpkin";

const pumpkinData = () => {
  const router = useRouter();

  

  const endScreen = async () => {
    router.push({
      pathname: "/volunteer/end",
      query: router.query,
    });
  };

  const newStencil = async () => {
    router.push({
      pathname: "/volunteer/enterID",
    });
  };

  const updateStatus = async () => {
    fetch("/api/status/" + router.query.sid, {
      method: "POST",
    });
  };

  let buttons

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
    status = "In progress..."
  }else if(router.query.status==3){
    status = "Completed"
  }
let nextTask
  if(router.query.status==1){
    nextTask = "Start"

    buttons = <div className={styles.section}>
      <button className={styles.button} onClick={endScreen}>
          {nextTask} {stage}
        </button>
        <button className={styles.button} onClick={newStencil}>
          Exit
        </button>
    </div>
  }
  else if(router.query.status==2){
    nextTask = "Finish"

    buttons = <div className={styles.section}>
      <button className={styles.button} onClick={endScreen}>
          {nextTask} {stage}
        </button>
        <button className={styles.button} onClick={updateStatus}>
          I would like to stop early
        </button>
        <button className={styles.button} onClick={newStencil}>
          Exit
        </button>
    </div>
  }else if(router.query.status==3){
    nextTask = "none to do, already finsihed"
    
    buttons = <div className={styles.section}><button className={styles.button} onClick={newStencil}>
          Exit
        </button></div>
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
        <text>Status</text>
        <text className="font-bold text-4xl">{stage}</text>
        <text className="font-grey">{status}</text>
      </div>
      {buttons}
    </div>
  );
};
export default pumpkinData;