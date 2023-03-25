import React from "react";
import Image from "next/image";
import PumpkinData from "@/components/Pumpkin";
import styles from "@/styles/end.module.css";
import { useRouter } from "next/router";

function end() {
  const router = useRouter();

  const callAPI = async () => {
    router.push("/volunteer/enterID");
  };

  return (
    <div className={styles.center}>
      <h1>Please make sure the stencil code is written on the back</h1>
      <div className={styles.container}>
        <PumpkinData
          sid={router.query.sid}
          title={router.query.title}
          category={router.query.cname}
        ></PumpkinData>
      </div>
      {/* <Image src={'/pumpkin2.jpg'} alt="sucks" width='400' height='400' /> */}
      <div className={styles.buttons}>
        <button className={styles.button} onClick={callAPI} >Enter new stencil ID</button>
        <button className={styles.buttonNo}>
          Take a picture with your pumpkin!
        </button>
        <button className={styles.button} onClick={callAPI}>Go back to home screen</button>
      </div>
    </div>
  );
}

export default end;
