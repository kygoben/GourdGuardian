import React from "react";
import ProgressBar from "./ProgressBar";
import { supabase } from "./../../supabaseConnection.js";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error("SignOut Error: ", error);
    else router.reload();
  };

  return (
    <div className="bg-gray-900 text-gray-200 p-2 flex justify-between items-center border-b border-gray-700">
      <div className="flex items-center">
        <div className="text-blue-500 font-bold text-2xl">GourdGuardian</div>
        <ProgressBar />
      </div>
      <div className="flex">
        <a href="/admin/volunteerControls" className="ml-2 p-1 rounded transition-colors hover:bg-gray-700">VolunteerLocks</a>
        <a href="/admin/status" className="ml-2 p-1 rounded transition-colors hover:bg-gray-700">Status</a>
        <a onClick={handleSignOut} href="/" className="ml-2 p-1 rounded transition-colors hover:bg-gray-700">Logout</a>
      </div>
    </div>
  );
};

export default Navbar;
