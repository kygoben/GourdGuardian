import React from "react";
import { useRouter } from "next/router";
import styles from "@/styles/home.module.css";
import Link from "next/link";

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://clxlobjerfduuexkucih.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export default function Home() {
  const router = useRouter();
  let error = 0;
  let message;

  const getStencil = async () => {
    const sid = document.getElementById("pid").value;


      const response = await fetch("/api/stencil/" + sid);

      let { data: stencils, error } = await supabase
        .from('stencils')
        .select('*')
        .eq('sid', '1-1')

      console.log(stencils[0]);
      

      console.log(response.status);
      if(stencils.length < 1){

        console.log("test");
        error = 1;
        console.log(error);
        router.push({
          pathname: "/volunteer/enterID",
          query: {'error' : '400'}
        });
      }else{
        console.log(response);
      const query = stencils[0];

      router.push({
        pathname: "/volunteer/confirm",
        query: query,
      });}    
  };
console.log(router.query)
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
