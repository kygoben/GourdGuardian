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
    <div className="flex flex-col justify-center">
      <h1 className="text-center text-3xl">
        Please make sure the stencil code is written on the back
      </h1>
      <div className={styles.container}>
        <PumpkinData
          sid={router.query.sid}
          title={router.query.title}
          category={router.query.cname}
        ></PumpkinData>
      </div>
      <button className={styles.button} onClick={callAPI}>
        Enter new stencil ID
      </button>
      <button className={styles.buttonNo}>
        Take a picture with your pumpkin!
      </button>
      <button className={styles.button} onClick={callAPI}>
        Go back to home screen
      </button>
    </div>
  );
}

export default end;
