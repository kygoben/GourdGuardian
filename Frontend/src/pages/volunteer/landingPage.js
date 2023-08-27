import React from "react";
import { useRouter } from "next/router";
import styles from "@/styles/landingPage.module.css";
import { useState } from "react";

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

    if(error){

    }
    
    if (data.session) {
      setAuthToken(data.session.access_token);
      
      console.log(authToken);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Thank you for volunteering at Reiman Gardens!
      </h1>
      <h2>Please Enter your name below</h2>
      <input
        className="border-2 border-black rounded-md w-72 p-2 mb-2 text-center"
        type="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <h2>Enter Todays Code:</h2>
      <input
        className="border-2 border-black rounded-md w-72 p-2 mb-2 text-center"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Passcode"
      />
      <button onClick={handleSignIn} className={styles.button}>
        Log a pumpkin!
      </button>
    </div>
  );
}
