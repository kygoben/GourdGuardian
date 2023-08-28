import React from "react";
import { useRouter } from "next/router";
import styles from "@/styles/landingPage.module.css";
import SignInPrompt from "@/components/VolunteerSignInPrompt";
import { useState, useEffect } from "react";

export default function landingPage() {
  const router = useRouter();
  const email = "volunteer@gmail.com";
  const [name, setName] = useState(null);
  console.log(name);

  useEffect(() => {
    // Fetch data from cookie when the component mounts
    const cookieValue = getCookieValue('name');
    setName(cookieValue);
  }, []);

  const getCookieValue = (name) => {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      const [cookieName, cookieValue] = cookie.trim().split('=');
      if (cookieName === name) {
        return decodeURIComponent(cookieValue);
      }
    }
    return null;
  };

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
            {name
              ? `Welcome, ${name}! Thank you for volunteering at Reiman Gardens!`
              : "Thank you for volunteering at Reiman Gardens!"}
          </h1>
          <button onClick={handleEnterID} className={styles.button}>
            Log a pumpkin!
          </button>
        </div>
    </SignInPrompt>
  );
}
