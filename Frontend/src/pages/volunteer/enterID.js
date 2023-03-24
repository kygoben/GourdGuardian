import React from "react";
import { useRouter } from "next/router";
import styles from "@/styles/home.module.css";
import Link from "next/link";

export default function Home() {
  const router = useRouter();

  const getStencil = async () => {
    const sid = document.getElementById("pid").value;
    const response = await fetch("/api/stencil/" + sid);

    //errors if invalid id
    const query = await response.json();

    console.log(query);

    router.push({
      pathname: "/volunteer/confirm",
      query: query,
    });
  };

  return (
    <div className={styles.pidForm}>
      <div className={styles.instructions}>Enter Stencil ID</div>
      <div>
        <input type="text" id="pid" name="pid" className={styles.input} />
      </div>
      <div>
        <button onClick={getStencil} className={styles.button}>
          Confirm
        </button>
      </div>
      <Link className={styles.back} href="/">
        Back to Home Page
      </Link>
    </div>
  );
}
