import { useRouter } from "next/router";
import React from "react";
import styles from "@/styles/confirm.module.css";
import PumpkinData from "@/components/Pumpkin";

export function confirm() {
  const router = useRouter();

  const callAPI = async () => {
    router.push({
      pathname: "/volunteer/pumpkinData",
      query: router.query,
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.popup}>
        <PumpkinData
          title={router.query.title}
          sid={router.query.sid}
          category={router.query.category}
        ></PumpkinData>
        <div className={styles.instructions}>Is this your stencil?</div>
        <button className={styles.button} onClick={callAPI}>
          Confirm
        </button>
        <a href="/volunteer/enterID">
          <button className={styles.buttonNo}>Go Back</button>
        </a>
      </div>
    </div>
  );
}

export default confirm;
