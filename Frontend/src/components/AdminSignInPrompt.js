"use client";

import { useRouter } from "next/navigation";
import styles from "@/styles/volunteerLogin.module.css";
import { supabase } from "./../../supabaseConnection.js";
import React, { useEffect, useState } from "react"; // Import useEffect and useState

const AdminSignInPrompt = ({ children }) => {
  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const router = useRouter();
  const [isSignedIn, setIsSignedIn] = useState(false);


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

  const handleSignIn = async () => {
    setPasswordError("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    console.log(data, error);

    if (error) {
      setPasswordError("Incorrect Password");
      return;
    }
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
      {!isSignedIn ? (
        <div>
        <div className={styles.container}>
          <h1 className={styles.title}>
            Admin Login
          </h1>
          <div>Email:</div>
          <input
            className="border-2 border-black rounded-md w-72 p-2 mb-2"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <div>Password:</div>
          <input
            className="border-2 border-black rounded-md w-72 p-2 mb-2"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          {passwordError && <p className="text-red-500">{passwordError}</p>}{" "}
        </div>
        <div className="flex flex-row justify-center items-center">
          <button
            className="border-2 border-black rounded-md w-32 p-2 m-2"
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
export default AdminSignInPrompt;
