import { useRouter } from "next/router";
import React from "react";
import styles from "@/styles/confirm.module.css";
import PumpkinData from "@/components/Pumpkin";
import axios from "axios";
import withRouter from "next/router";

const confirm = () => {
  const router = useRouter();

  const callAPI = async () => {
    axios.get("/api/stencil/1").then((response) => {
      console.log(router.query);
      router.push({
        pathname: "/volunteer/pumpkinData",
        query: router.query,
      });
    });
  };

  return (
    <div className={styles.pidForm}>
      <div className={styles.popup}>
        <PumpkinData
          title={router.query.title}
          sid={router.query.sid}
          category={router.query.cname}
        ></PumpkinData>
        <div className={styles.instructions}>Is this your stencil?</div>
        <div className={styles.buttons}>
          <button className={styles.button} onClick={callAPI}>
            Confirm
          </button>
        </div>
        <div className={styles.buttons}>
          <a href="/volunteer/enterID">
            <button className={styles.buttonNo}>Go Back</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default confirm;
