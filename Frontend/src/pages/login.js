"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/components/AuthContext";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const supabase = createClientComponentClient();
  const { authToken, setAuthToken } = useAuth();

  const handleSignUp = async () => {
    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    router.refresh();
  };

  const handleSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (data.session) {
      setAuthToken(data.session.access_token);
      console.log(data);
      console.log(authToken);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <>
    <div className="flex flex-col justify-center items-center h-screen">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold mb-4">Sign In</h1>
          <div className="flex flex-col justify-center items-center">
            <input
              className="border-2 border-black rounded-md w-72 p-2 mb-2"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <input
              className="border-2 border-black rounded-md w-72 p-2 mb-2"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
          <div className="flex flex-row justify-center items-center">
            <button
              className="border-2 border-black rounded-md w-32 p-2 m-2"
              onClick={handleSignIn}
            >
              Sign In
            </button>
            <button
              className="border-2 border-black rounded-md w-32 p-2 m-2"
              onClick={handleSignUp}
            >
              Sign Up
            </button>
            <button
              className="border-2 border-black rounded-md w-32 p-2 m-2"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
