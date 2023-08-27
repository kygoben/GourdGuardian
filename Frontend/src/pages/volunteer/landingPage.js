import React from "react";
import { useRouter } from "next/router";
import styles from "@/styles/landingPage.module.css";
import { useState } from "react";
import SignInPrompt from "@/components/VolunteerSignInPrompt";

export default function landingPage() {
  const router = useRouter();
  const email = "volunteer@gmail.com";

  // Handles the action to navigate to the enterID page
  const handleEnterID = async () => {
    router.push({
      pathname: "/volunteer/enterID",
    });
  };

  return (
    <SignInPrompt>
      <div className={styles.container}>
        <h1 className={styles.title}>
          Thank you for volunteering at Reiman Gardens!
        </h1>

        <button onClick={handleEnterID} className={styles.button}>
          Log a pumpkin!
        </button>
      </div>
    </SignInPrompt>
  );
}
