import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/data.module.css";
import PumpkinData from "@/components/Pumpkin";
import { supabase } from "supabaseConnection";
import SignInPrompt from "@/components/VolunteerSignInPrompt";
import { parse } from "cookie";

const pumpkinData = () => {
  const router = useRouter();
  const [nextStage, setNextStage] = useState(); //button to show
  const [status, setStatus] = useState(); //status of pumpkin
  // const stage = router.query.stage.charAt(0).toUpperCase() + router.query.stage.slice(1);
  const [name, setName] = useState("");

  const stage = router.query.stage;

  useEffect(() => {

    if (typeof document !== 'undefined') {
      const parsedName = parse(document.cookie).name?.toLowerCase();
      setName(parsedName);
    }

    const startKey = `${stage}_start`;
    const endKey = `${stage}_end`;

    if (!router.query[startKey]) {
      console.log(router.query[startKey]);
      setNextStage("Start");
      setStatus("Not Started");
    } else if (!router.query[endKey]) {
      setNextStage("Finish");
      setStatus("In Progress");
    } else {
      setNextStage("Completed");
      setStatus("Completed");
    }
  }, [router.query]);


  const endScreen = async () => {
    router.push({
      pathname: "/volunteer/end",
      query: router.query,
    });
  };

  function getCurrentFormattedTime() {
    const now = new Date();

    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const day = now.getDate().toString().padStart(2, "0");

    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");

    const formattedTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    return formattedTime;
  }

  const updateStatus = async () => {
    const time = getCurrentFormattedTime();
    const startKey = `${stage}_start`;
    const endKey = `${stage}_end`;
        if (!router.query[startKey]) {
          const { data, error } = await supabase
            .from("sstatus")
            .update({ tracing_start: time, tracing_by: router.query.name })
            .eq("sid", router.query.sid)
            .eq("year", router.query.year)
            .eq("week", router.query.week)
            .select();

            setNextStage("Finish");
            setStatus("In Progress");

          // console.log(data, error);
        } else if (!router.query[endKey]) {
          const { data, error } = await supabase
            .from("sstatus")
            .update({ tracing_end: time, tracing_by: name })
            .eq("sid", router.query.sid)
            .eq("year", router.query.year)
            .eq("week", router.query.week)
            .select();

            router.push({
              pathname: "/volunteer/end",
              query: router.query,
            });

            setNextStage("Completed");
            setStatus("Completed");
          // console.log(data, error);
    }
  };

  

  return (
    <SignInPrompt>
      <div className={styles.section}>
        <PumpkinData
          sid={router.query.sid}
          title={router.query.title}
          category={router.query.category}
          extras={router.query.extras}
        />
      </div>
      <div className={styles.section}>
        <span>Status</span>
        <span className="font-bold text-4xl">{stage ? stage.charAt(0).toUpperCase() + stage.slice(1) : ""}</span>
        <span className="font-grey">{status}</span>
      </div>
      <div>
      <button onClick={updateStatus}>{nextStage}</button>
      <button>Exit</button>
      </div>
    </SignInPrompt>
  );
  
};


export default pumpkinData;
