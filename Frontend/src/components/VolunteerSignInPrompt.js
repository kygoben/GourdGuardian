"use client";

import { useRouter } from "next/navigation";
import styles from "@/styles/volunteerLogin.module.css";
import { supabase } from "./../../supabaseConnection.js";
import { parse } from "cookie";
import React, { useEffect, useState } from "react"; // Import useEffect and useState

const SignInPrompt = ({ children }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState(""); // Add state for error messages
  const [passwordError, setPasswordError] = useState("");
  const router = useRouter();
  const email = "volunteer@gmail.com";
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isName, setIsName] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then((data) => {
      if (data.data.session && data.data.session.expires_at) {
        const sessionExpirationTime = new Date(data.data.session.expires_at).getTime();
        const currentTime = Date.now() / 1000;
        
        setIsSignedIn(sessionExpirationTime > currentTime);
      } else {
        setIsSignedIn(false); // No session or expires_at, so not signed in
      }
    });
  }, []);

  useEffect(() => {
    const parsedCookies = parse(document.cookie); // Parse cookies using the 'parse' method
    setName(parsedCookies.name); // Access the 'name' cookie
    setIsName(parsedCookies.name !== undefined);
  }, []);

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

    document.cookie = `name=${name}`;
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    console.log(data, error);

    if (error) {
      setPasswordError("Incorrect Password");
      return;
    }
    setPassword(password);
    supabase.auth.getSession().then((data) => {
      console.log(data);
    });
    router.refresh();
  };
  const handleSignOut = async () => {
    const { data, error } = await supabase.auth.signOut();
    console.log(data);
    router.refresh();
  };
  return (
    <>
      <div>
        {isSignedIn && (
          <button className={styles.signOutButton} onClick={handleSignOut}>
            Sign Out
          </button>
        )}
      </div>
      {!isSignedIn || !isName ? (
        <div>
        <div className={styles.container}>
          <h1 className={styles.title}>
            Thank you for volunteering at Reiman Gardens!
          </h1>
          <div>Your Name:</div>
          <input
  className="border-2 border-black rounded-md w-72 p-2 mb-2 inputField"
  type="text"
  value={name}
  onChange={(e) => setName(e.target.value)}
  placeholder="Name"
/>
          {nameError && <p className="text-red-500">{nameError}</p>}{" "}
          <div>Event Code:</div>
          <input
            className="border-2 border-black rounded-md w-72 p-2 mb-2"
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Event Code"
          />
          {passwordError && <p className="text-red-500">{passwordError}</p>}{" "}
        </div>
        <div className="flex flex-row justify-center items-center">
        <button
  className="border-2 border-black rounded-md w-32 p-2 m-2 submitButton"
  onClick={handleSignIn}
>
  Submit
</button>
        </div>
        </div>
      ) : (
        children
      )}
    </>
  );
};
export default SignInPrompt;
