import React from "react";
import { useRouter } from "next/router";
import styles from "@/styles/home.module.css";

export default function Home() {
  const router = useRouter();

  const enterID = async () => {
      router.push({
        pathname: "/volunteer/enterID",
      });
    };

  return (
    <div className={styles.pidForm}>
        <div className={styles.instructions}>Thank you</div>
      <div className={styles.instructions}>for volunteering at Reiman Gardens</div>
      <div>
        <button onClick={enterID} className={styles.button}>
          Log a pumpkin
        </button>
      </div>
    </div>
  );
}
