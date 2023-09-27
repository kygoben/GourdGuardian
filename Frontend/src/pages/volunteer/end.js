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
      <div className="flex flex-col justify-center">
        <h1 className="text-center text-3xl">
          Please make sure the stencil code is written on the back
        </h1>
        <div className={styles.container}>
          <PumpkinData
            sid={router.query.sid}
            title={router.query.title}
            category={router.query.cname}
            extras={router.query.extras}
          ></PumpkinData>
        </div>
        <button className={styles.button} conClick={callAPI}>
          Log another pumpkin
        </button>
        {router.query.stage == "tracing" && <div>Please Bring this stencil with you back to an event staff member</div>}
      </div>
    </SignInPrompt>
  );
}

export default end;
