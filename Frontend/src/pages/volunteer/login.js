"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/components/AuthContext";
import styles from "@/styles/volunteerLogin.module.css";

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState(""); // Add state for error messages
  const [passwordError, setPasswordError] = useState("");
  const router = useRouter();
  const supabase = createClientComponentClient();
  const { authToken, setAuthToken } = useAuth();
  const email = "volunteer@gmail.com";

  const handleSignIn = async () => {
    setNameError(""); // Reset error messages
    setPasswordError("");

    if (!name) {
      setNameError("Please enter your name.");
      return;
    }

    if (!password) {
      setPasswordError("Please enter the password.");
      return;
    }

    document.cookie="name=" + name;
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if(error){
      setPasswordError("Incorrect Password");
      return;
    }

    console.log(error);

    if (data.session) {
      setAuthToken(data.session.access_token);

      console.log(authToken);
    }
  };

  return (
    <>
        <div className={styles.container}>
          <h1 className={styles.title}>Thank you for volunteering at Reiman Gardens!</h1>
            <div>Your Name:</div>
            <input
              className="border-2 border-black rounded-md w-72 p-2 mb-2"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />
            {nameError && <p className="text-red-500">{nameError}</p>} {/* Display error message */}
            <div>Password:</div>
            <input
              className="border-2 border-black rounded-md w-72 p-2 mb-2"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            {passwordError && <p className="text-red-500">{passwordError}</p>} {/* Display error message */}
          </div>
          <div className="flex flex-row justify-center items-center">
            <button
              className="border-2 border-black rounded-md w-32 p-2 m-2"
              onClick={handleSignIn}
            >
              Submit
            </button>
          </div>
    </>
  );
}
