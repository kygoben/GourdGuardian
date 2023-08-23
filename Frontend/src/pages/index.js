import React from "react";
import Link from "next/link";
import styles from "@/styles/home.module.css";

export default function index() {

  return (
    <div className={styles.pidForm}>
      <p>
      <Link className={styles.back} href="/volunteer/landingPage">
        Click here to go to volunteer page
      </Link></p>
      <Link className={styles.back} href="/admin/home">
        Click here to go to admin page
      </Link>
    </div>
  );
}
