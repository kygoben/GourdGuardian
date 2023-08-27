import React from "react";
import { useRouter } from "next/router";
import styles from "@/styles/enterID.module.css";
import Link from "next/link";
import { supabase } from "../../../supabaseConnection.js";
import { parse } from 'cookie';

export default function Home() {
  const router = useRouter();
  let message;

  const getStencil = async () => {
    const sid = document.getElementById("pid").value;
    
    console.log(document.cookie);

    const cookieHeader = document.cookie;
    const parsedCookies = parse(cookieHeader); // Parse cookies using the 'parse' method

    console.log(parsedCookies.name); // Access the 'name' cookie

    // console.log(cookies().get('name'));

    let { data: stencils, error } = await supabase
      .from("stencils")
      .select("*")
      .eq("sid", sid);

    if (stencils.length < 1) {
      router.push({
        pathname: "/volunteer/enterID",
        query: { error: "400" },
      });
    } else {
      const query = stencils[0];
      router.push({
        pathname: "/volunteer/confirm",
        query: query,
      });
    }
  };

  if (router.query.error) {
    message = <text className="text-red-500 text-3xl">Invalid ID</text>;
  } else {
    message = <div></div>;
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      getStencil();
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Enter Stencil ID</h1>
      <input
        type="text"
        id="pid"
        name="pid"
        className={styles.input}
        onKeyDown={handleKeyPress}
      />
      {message}
      <button onClick={getStencil} className={styles.button}>
        Confirm
      </button>
      <Link className={styles.back} href="/volunteer/thankYou">
        Go Back
      </Link>
    </div>
  );
}
