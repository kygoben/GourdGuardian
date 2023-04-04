import React from "react";
import { useRouter } from "next/router";
import styles from "@/styles/home.module.css";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  let error = 0;
  let message;

  const getStencil = async () => {
    const sid = document.getElementById("pid").value;


      const response = await fetch("/api/stencil/" + sid);
      console.log(response.status);
      if(response.status==404 || response.status==400){

        console.log("test");
        error = 1;
        console.log(error);
        router.push({
          pathname: "/volunteer/enterID",
          query: {'error' : '400'}
        });
      }else{
        console.log(response);
      const query = await response.json();

      router.push({
        pathname: "/volunteer/confirm",
        query: query,
      });}    
  };
console.log(router.query)
  if (router.query.error) {
    message = <text style='color:red;'>Invalid ID</text>;
  } else {
    message = <text></text>;
  }

  return (
    <div className={styles.pidForm}>
      <div className={styles.instructions}>Enter Stencil ID</div>
      <div>
        <input type="text" id="pid" name="pid" className={styles.input} />
      </div>
      {message}
      <div>
        <button onClick={getStencil} className={styles.button}>
          Confirm
        </button>
      </div>
      <Link className={styles.back} href="/volunteer/thankYou">
        Back to Home Page
      </Link>
    </div>
  );
}
