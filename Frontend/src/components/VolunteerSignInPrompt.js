"use client";

import { useRouter } from "next/navigation";
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
      setPasswordError("Please enter the event code.");
      return;
    }

    document.cookie = `name=${name}`;
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setPasswordError("Incorrect event code.");
      return;
    }
    setPassword(password);
    supabase.auth.getSession().then((data) => {
      console.log(data);
    });
    router.refresh();
  };

  if(!isSignedIn || !isName) {
    return (
    <div className="flex items-center justify-center min-h-screen bg-orange-400">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold mb-6 text-brown-900">
              Thank you for volunteering at Reiman Gardens!
            </h1>
            <label className="block text-sm font-medium mb-2 text-brown-700">Your Name:</label>
            <input
              className="w-full border-2 border-gray-300 rounded-md p-2 mb-2 focus:outline-none focus:border-orange-400"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />
            {nameError && <p className="text-red-500 text-sm">{nameError}</p>}
            <label className="block text-sm font-medium mb-2 text-brown-700">Event Code:</label>
            <input
              className="w-full border-2 border-gray-300 rounded-md p-2 mb-2 focus:outline-none focus:border-orange-400"
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Event Code"
            />
            {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
            <div className="flex justify-center mt-4">
              <button
                className="w-1/2 sm:w-auto bg-orange-700 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50"
                onClick={handleSignIn}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
    );
  }



  return (
        children
  );
  
  
};
export default SignInPrompt;
