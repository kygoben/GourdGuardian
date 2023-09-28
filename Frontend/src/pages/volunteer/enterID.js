import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/enterID.module.css";
import { supabase } from "../../../supabaseConnection.js";
import SignInPrompt from "@/components/VolunteerSignInPrompt.js";
import { parse } from "cookie"; // Adjusted import
import Image from "next/image";
import PumpkinData from "@/components/Pumpkin";

export default function Home() {
  const router = useRouter();
  const [message, setMessage] = useState(""); // Add state for error messages
  const [year, setYear] = useState(null);
  const [week, setWeek] = useState(null);
  const [stage, setStage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      let { data: admin_data, error: adminError } = await supabase
        .from("admin_data")
        .select("*");

      console.log(admin_data);
      console.log(adminError);
      setYear(admin_data[0].year);
      setWeek(admin_data[0].week);
      let currentStage = admin_data[0].stage;

      if (currentStage == 1) {
        setStage("printing");
      } else if (currentStage == 2) {
        setStage("cutting");
      } else if (currentStage == 3) {
        setStage("tracing");
      } else if (currentStage == 4) {
        setStage("carving");
      }
    };
    fetchData();
    console.log(year);
    console.log(week);
    console.log(stage);
  }, []);

  const getStencil = async () => {
    const sid = document.getElementById("pid").value;
    console.log(sid);
    console.log(year);
    console.log(week);
    console.log(stage);

    let { data: stencils, error } = await supabase
      .from("sstatus")
      .select("*, stencils(title, extras, category(cname))")
      .eq("sid", sid.toUpperCase())
      .eq("year", year);
    if (week < 3) {
      stencils = stencils.filter((stencil) => stencil.week == week);
    }

    let max = stencils.length;
    let i = 0;

    while (i < max) {
      console.log(stencils[i]);
      if (
        !stencils[i][`${stage}start`] ||
        stencils[i][`${stage}_by`]?.toLowerCase() ===
          parse(document.cookie).name.toLowerCase()
      ) {
        stencils[i].category = stencils[i].stencils.category.cname;
        stencils[i].title = stencils[i].stencils.title;
        stencils[i].week = stencils[i].week;
        stencils[i].year = stencils[i].year;
        stencils[i].extras = stencils[i].stencils.extras;
        stencils[i].stage = stage;
        stencils[i].name = parse(document.cookie).name;
        const query = stencils[i];
        console.log(query);
        console.log("test");
        router.push({
          pathname: "/volunteer/confirm",
          query: query,
        });
        break;
      }
      i++;
    }
    if (stencils.length == 0) {
      setMessage(
        "Sorry, this stencil seems to have an issue. Please return it to the event staff."
      );
    } else if (i > 0) {
      setMessage(
        "Sorry, this stencil has already been started by another volunteer. Please return it to the event staff."
      );
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      getStencil();
    }
  };

  return (
    <SignInPrompt>
      <div className="flex items-center flex-col justify-center min-h-screen bg-orange-500 p-4">
        <div className="bg-white p-8 items-center rounded-lg shadow-md w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3 mb-5">
          {stage === "tracing" && (
            <>
              <div className="text-brown-700 text-center mt-4">
                You can find the stencil ID in the box stencil paper
              </div>
              <Image src="/ID_BOX.jpg" width={300} height={75}></Image>
            </>
          )}
          {stage === "carving" && (
            <div className="text-brown-700 text-center mt-4">
              You can find the stencil ID on the back of the pumpkin
              <div
            style={{
              backgroundImage: `url(/pumpkin.jpg)`,
              backgroundSize: "contain",
              backgroundPosition: "center",
              paddingBottom: `80%`,
              position: "relative",
            }}
            className="text-center bg-no-repeat w-full mb-5"
          >
            <div
              style={{
                position: "absolute",
                top: "60%",
                left: 0,
                right: 0,
                transform: "translateY(-50%)",
                width: "100%",
              }}
            >
              <PumpkinData 
                sid={"11-19-B"}
                title={"Frank"}
                category={"Movies"}
                extras={"Donnie Darko"}
                instruction={true}
              />
            </div>
          </div>
            </div>
          )}
        </div>
        <div className="bg-white p-8 items-center rounded-lg shadow-md w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3">
          <h1 className="text-2xl text-center font-semibold mb-6 text-brown-900">
            Enter Stencil ID
          </h1>
          <input
            type="text"
            id="pid"
            name="pid"
            autoComplete="off"
            className="w-full border-2 border-gray-300 rounded-md p-2 mb-2 focus:outline-none focus:border-orange-400"
            onKeyDown={handleKeyPress}
          />
          <div className="text-brown-700 mb-4">{message}</div>
          <div className="flex justify-center">
            <button
              onClick={getStencil}
              className="w-full sm:w-auto bg-orange-700 text-center text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </SignInPrompt>
  );
}
