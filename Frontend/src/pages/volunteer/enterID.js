import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "@/styles/home.module.css";
import { supabase } from "../../../supabaseConnection.js";

export default function Home() {
  const router = useRouter();

  const handleGetStencil = async () => {
    const sid = document.getElementById("pid").value;

    const { data: stencils, error } = await supabase
      .from("stencils")
      .select("*")
      .eq("sid", sid);

    if (error) {
      // Handle the error appropriately
      console.error("Error fetching stencil:", error);
      return;
    }

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

  const renderErrorMessage = () => {
    if (router.query.error) {
      return (
        <p className="text-red-500 text-3xl">Invalid ID</p>
      );
    }
    return null;
  };

  return (
    <div className={styles.pidForm}>
      <div className={styles.instructions}>Enter Stencil ID</div>
      <div>
        <input type="text" id="pid" name="pid" className={styles.input} />
      </div>
      {renderErrorMessage()}
      <div>
        <button onClick={handleGetStencil} className={styles.button}>
          Confirm
        </button>
      </div>
      <Link href="/volunteer/thankYou" passHref>
        <div className={styles.back}>Back to Home Page</div>
      </Link>

    </div>
  );
}
