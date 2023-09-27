import React from "react";
import { useRouter } from "next/router";
import styles from "@/styles/enterID.module.css";
import Link from "next/link";
import { supabase } from "../../../supabaseConnection.js";
import SignInPrompt from "@/components/VolunteerSignInPrompt.js";

export default function Home() {
  const router = useRouter();
  let message;

  const getStencil = async () => {
    const sid = document.getElementById("pid").value;

    let { data: admin_data, error: adminError } = await supabase
      .from("admin_data")
      .select("*");
    console.log(admin_data[0]);
    const year = admin_data[0].year;
    const week = admin_data[0].week;
    const stage = admin_data[0].stage;

    let { data: stencils, error } = await supabase
      .from("sstatus")
      .select("*, stencils(title, category(cname))")
      .eq("sid", sid)
      .eq("year", year);
    if (week < 3) {
      stencils = stencils.filter((stencil) => stencil.week == week);
    }

    let max = stencils.length;
    let i = 0;

    while (i < max) {
      console.log(stencils[i]);
      if (!stencils[i].tracing_start) {
        stencils[i].category = stencils[i].stencils.category.cname;
        stencils[i].title = stencils[i].stencils.title;
        stencils[i].week = stencils[i].week;
        stencils[i].year = stencils[i].year;
        stencils[i].stage = stencils[i].stage;
        const query = stencils[i];
        console.log("test");
        router.push({
          pathname: "/volunteer/confirm",
          query: query,
        });
        break;
      }
      i++;
    }
    router.push({
      pathname: "/volunteer/enterID",
      query: { error: "400" },
    });
  };
    if (router.query.error) {
      message = <text className="text-red-500 text-1xl">Sorry, it looks like this stencil has already been completed. Please return this stencil to event staff.</text>;
    } else {
      message = <div></div>;
    }


  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      getStencil();
    }
  };

  return (
    <SignInPrompt>
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
    </SignInPrompt>
  );
}
