import React from "react";
import { useRouter } from "next/router";
import styles from "@/styles/home.module.css";
import Link from "next/link";
import { supabase } from '../../../supabaseConnection.js';

export default function Home() {
  const router = useRouter();
  let message;

  const getStencil = async () => {
    const sid = document.getElementById("pid").value;

    let { data: stencils, error } = await supabase
      .from('stencils')
      .select('*')
      .eq('sid', sid)

    if(stencils.length < 1){
      router.push({
        pathname: "/volunteer/enterID",
        query: {'error' : '400'}
      });
    }else{
      const query = stencils[0];
      router.push({
        pathname: "/volunteer/confirm",
        query: query,
    });}    
  };

  if (router.query.error) {
    message = <text className="text-red-500 text-3xl">Invalid ID</text>;
  } else {
    message = <div></div>;
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
