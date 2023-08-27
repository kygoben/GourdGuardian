import React from "react";
import { useRouter } from "next/router";
import styles from "@/styles/landingPage.module.css";
import { useState } from "react";
import SignInPrompt from "@/components/VolunteerSignInPrompt";

export default function landingPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const email = "volunteer@gmail.com";

  // Handles the action to navigate to the enterID page
  const handleEnterID = async () => {
    router.push({
      pathname: "/volunteer/enterID",
    });
  };

  const handleSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
    }

    if (data.session) {
      setAuthToken(data.session.access_token);

      console.log(authToken);
    }
  };

  return (
    <SignInPrompt>
      <div className={styles.container}>
        <h1 className={styles.title}>
          Thank you for volunteering at Reiman Gardens!
        </h1>

        <button onClick={handleSignIn} className={styles.button}>
          Log a pumpkin!
        </button>
      </div>
    </SignInPrompt>
  );
}
