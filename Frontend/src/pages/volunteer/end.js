import React from "react";
import PumpkinData from "@/components/Pumpkin";
import styles from "@/styles/end.module.css";
import { useRouter } from "next/router";
import SignInPrompt from "@/components/VolunteerSignInPrompt";

function end() {
  const router = useRouter();

  const callAPI = async () => {
    router.push("/volunteer/enterID");
  };

  return (
    <SignInPrompt>
      <div className="bg-orange-400 w-full min-h-screen flex flex-col items-center justify-center p-4 md:p-10">
        <div className="border-2 border-brown-700 rounded-lg shadow-md bg-white w-full max-w-md mb-5 p-4 md:p-10 text-center">
          <h1 className="text-center text-3xl mb-5">
            Please make sure the stencil code is written on the back
          </h1>
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
                sid={router.query.sid}
                title={router.query.title}
                category={router.query.category}
                extras={router.query.extras}
              />
            </div>
          </div>
        </div>

        <div className="border-2 border-brown-700 rounded-lg shadow-md bg-white w-full max-w-md mb-5 p-4 md:p-10 text-center">
          <button
            onClick={callAPI}
            className="text-lg bg-orange-500 rounded-full cursor-pointer w-full max-w-xs py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50"
          >
            Log another pumpkin
          </button>
          {router.query.stage == "tracing" && (
            <div className="text-center text-brown-700">
              Please Bring your stencil with you to an event staff member
            </div>
          )}
        </div>
      </div>
    </SignInPrompt>
  );
}

export default end;
