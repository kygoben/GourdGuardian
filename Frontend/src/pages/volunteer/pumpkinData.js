import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
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
  const [stopwatchTime, setStopwatchTime] = useState(0);

  const stage = router.query.stage;

  useEffect(() => {
    let intervalId;
    console.log("testing");

    if (status === "In Progress...") {
      const startTime = new Date(router.query[`${stage}_start`]).getTime();
      intervalId = setInterval(() => {
        setStopwatchTime(new Date().getTime() - startTime);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [status, stage, router.query]);

  useEffect(() => {
    if (typeof document !== "undefined") {
      const parsedName = parse(document.cookie).name?.toLowerCase();
      setName(parsedName);
    }

    const startKey = `${stage}_start`;
    const endKey = `${stage}_end`;

    if (!router.query[startKey]) {
      console.log(router.query[startKey]);
      setNextStage(`Start ${stage}`);
      setStatus("Not Started");
    } else if (!router.query[endKey]) {
      setNextStage("I'm Finished!");
      setStatus("In Progress...");
    } else {
      setNextStage("Continue");
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
      router.query[startKey] = time;

      setNextStage("I'm Finished!");
      setStatus("In Progress...");

      // console.log(data, error);
    } else if (!router.query[endKey]) {
      console.log("it worked");
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

      setNextStage("Continue");
      setStatus("Completed");
      // console.log(data, error);
    } else {
      router.push({
        pathname: "/volunteer/end",
        query: router.query,
      });
    }
  };

  return (
    <SignInPrompt>
      <div className="bg-orange-400 w-full min-h-screen flex flex-col items-center justify-center p-4 md:p-10">
        <div className="border-2 border-brown-700 rounded-lg p-5 md:p-10 shadow-md bg-white mb-5 w-full max-w-md text-center">
          <PumpkinData
            sid={router.query.sid}
            title={router.query.title}
            category={router.query.category}
            extras={router.query.extras}
          />
        </div>
        <div className="border-2 border-brown-700 rounded-lg p-5 md:p-10 shadow-md bg-white mb-5 w-full max-w-md">
          <div className="flex flex-col items-center justify-center text-brown-700">
            {/* <div className="text-2xl font-semibold text-black">Status</div> */}
            <div className="text-xl text-black">
              {stage ? stage.charAt(0).toUpperCase() + stage.slice(1) : ""}
            </div>
            <div className="text-lg text-black">{status}</div>
            <div className="text-lg text-black">
              {status === "In Progress..." && (
                <div className="text-sm text-gray-600">
                  Time elapsed:{" "}
                  {new Date(stopwatchTime).toISOString().substr(11, 8)}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="border-2 border-brown-700 rounded-lg p-5 md:p-10 shadow-md bg-white w-full max-w-md">
          <div className="flex flex-col items-center w-full">
            <div className="w-full mb-2 max-w-xs">
              <button
                onClick={updateStatus}
                className="text-lg bg-orange-500 rounded-full cursor-pointer w-full py-2 "
              >
                {nextStage}
              </button>
            </div>
            <div className="w-full max-w-xs">
              <button
                onClick={endScreen}
                className="text-lg border-2 border-brown-700 bg-white rounded-full cursor-pointer w-full py-2 "
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      </div>
    </SignInPrompt>
  );
};

export default pumpkinData;
