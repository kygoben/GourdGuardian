import React from "react";
import Image from "next/image";
import PumpkinData from "@/components/Pumpkin";
import styles from "@/styles/end.module.css";
import { useRouter } from "next/router";
import SignInPrompt from "@/components/VolunteerSignInPrompt";
import { supabase } from "./../../../supabaseConnection.js";

function end() {
  const router = useRouter();

  const callAPI = async () => {
    router.push("/volunteer/enterID");
  };

  const callAPI2 = async () => {
    let { data: stencils, error } = await supabase
      .from("sstatus")
      .select("*, stencils(title, category(cname))")
      .eq("sid", router.query.sid)
      .eq("year", router.query.year)
      .eq("week", router.query.week);

      stencils[0].category=stencils[0].stencils.category.cname;
      stencils[0].title=stencils[0].stencils.title;
      stencils[0].week=router.query.week;
      stencils[0].year=router.query.year;
      stencils[0].stage=router.query.stage;


    router.push({
      pathname: "/volunteer/pumpkinData",
      query: stencils[0],
    });
  };

  return (
    <SignInPrompt>
    <div className="flex flex-col justify-center">
      <h1 className="text-center text-3xl">
        Please make sure the stencil code is written on the back
      </h1>
      <div className={styles.container}>
        <PumpkinData
          sid={router.query.sid}
          title={router.query.title}
          category={router.query.cname}
        ></PumpkinData>
      </div>
      <button className={styles.button} onClick={callAPI2}>
        View Pumpkin Details Again
      </button>
      <button className={styles.buttonNo} conClick={callAPI}>
        Log another pumpkin
      </button>
      <button className={styles.button} onClick={callAPI}>
        Go back to home screen
      </button>
    </div>
    </SignInPrompt>
  );
}

export default end;
