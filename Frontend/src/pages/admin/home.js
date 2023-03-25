import React from "react";
import { useRouter } from "next/router";
import styles from "@/styles/admin.module.css";
import Link from "next/link";

export default function Home() {
  const router = useRouter();

  return (
    <div className={styles.layout}>
      <div className={styles.title}>Jack-O-Lantern Tracker</div>
      <button className={styles.button}>Dashboard</button>
    </div>
  );
}
