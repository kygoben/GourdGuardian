import React from "react";
import { useRouter } from "next/router";
import styles from "@/styles/enterID.module.css";
import Link from "next/link";
import { supabase } from "../../../supabaseConnection.js";
import { parse } from 'cookie';
import SignInPrompt from "@/components/VolunteerSignInPrompt.js";

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

    let{data: admin_data, error: adminError} = await supabase
            .from("admin_data")
            .select('*');
            console.log(admin_data[0]);
    const year = admin_data[0].year;
    const week = admin_data[0].week;
    const stage = admin_data[0].stage;



    let { data: stencils, error } = await supabase
      .from("sstatus")
      .select("*, stencils(title, category(cname))")
      .eq("sid", sid)
      .eq("year", year)
      .eq("week", week);

     

    if (stencils.length < 1) {
      router.push({
        pathname: "/volunteer/enterID",
        query: { error: "400" },
      });
    } else {

      stencils[0].category=stencils[0].stencils.category.cname;
      stencils[0].title=stencils[0].stencils.title;
      stencils[0].week=week;
      stencils[0].year=year;
      stencils[0].stage=stage;
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
